export const API_STATUSES = {
  SUCCESS: 200,
  POST_SUCCESS: 201,
  UNAUTHENTICATED: 401,
  NOT_FOUND: 404,
  VALIDATE_FAILED: 422,
  TOO_MANY_ATTEMPTS: 429,
  INTERNAL_ERROR: 500,
} as const;

export const FORM_ERROR_CLASSNAME = 'form-error';
