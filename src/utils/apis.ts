import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { ApiResponse } from '@/types/common';
import i18n from '@/locales/i18n';

import env from './env';
import { API_STATUSES } from './constants/common';
import AuthStorage from './authStorage';
import { nonNull } from './helpers/common';

export const getApiPath = (
  endPoint: string,
  replacements: Record<string, string | number> = {},
) => {
  const replacedEndpoints = Object.entries(replacements).reduce(
    (result: string, [key, value]) =>
      result.replace(`:${key}`, value.toString()),
    endPoint,
  );

  return `${env.apiHost}:${env.apiPort}${env.apiPrefix}/${replacedEndpoints}`;
};

export const getServerError = (status: number, returnedError: any): string => {
  if (status === API_STATUSES.VALIDATE_FAILED && returnedError?.errors) {
    if (returnedError?.errors?.version) {
      return String(returnedError.errors.version);
    }

    return Object.values(returnedError.errors).flat().join(' ');
  }

  return String(returnedError?.message) || i18n.t('messages:unexpected_error');
};

export const handleDownloadFile = (
  response: AxiosResponse<any, any>,
  resFilename?: string,
) => {
  const url = window.URL.createObjectURL(response.data as any);
  const downloadEl = document.createElement('a');

  let filename = resFilename || '';
  const disposition = (response.headers as any).get?.('Content-Disposition');

  if (disposition && disposition.indexOf('attachment') !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);

    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, '');
    }
  }

  downloadEl.href = url;
  downloadEl.download = filename || 'file';

  document.body.appendChild(downloadEl);
  downloadEl.click();

  document.body.removeChild(downloadEl);
  window.URL.revokeObjectURL(url);
};

export const fetchApi = async (p: {
  method: 'get' | 'post' | 'delete' | 'put' | 'patch';
  endpoint: string;
  params?: object;
  config?: AxiosRequestConfig;
  withAuth?: boolean;
  replacements?: Record<string, string | number>;
  downloadConfig?: {
    filename?: string;
  };
}): Promise<ApiResponse> => {
  const {
    method,
    endpoint,
    params,
    config,
    withAuth,
    replacements,
    downloadConfig,
  } = p;

  const apiConfig: AxiosRequestConfig = {
    ...config,
    ...((withAuth ?? true) && {
      headers: {
        ...config?.headers,
        Authorization: `Bearer ${AuthStorage.accessToken}`,
      },
    }),
  };

  try {
    let response: AxiosResponse | null = null;
    const apiPath = getApiPath(endpoint, replacements);

    if (method === 'get' || method === 'delete') {
      response = await axios[method](apiPath, {
        ...apiConfig,
        params,
      });
    } else {
      response = await axios[method](apiPath, params, apiConfig);
    }

    if (apiConfig.responseType === 'blob') {
      handleDownloadFile(nonNull(response), downloadConfig?.filename);

      return {
        ok: true,
        status: nonNull(response).status,
        data: {},
      };
    }

    return {
      ok: true,
      status: nonNull(response).status,
      data: nonNull(response).data,
    };
  } catch (error: any) {
    return {
      ok: false,
      status: error?.response?.status,
      error: getServerError(error?.response?.status, error?.response?.data),
    };
  }
};
