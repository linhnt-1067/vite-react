/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Schema } from 'yup';

import { FORM_ERROR_CLASSNAME } from '@/utils/constants/common';
import { uniqRandomNumber } from '@/utils/helpers/common';
import { validateWithSchema } from '@/utils/helpers/validations';

export const useCustomForm = <T>(params: {
  defaultValues: T;
  scrollToFirstError?: boolean;
  schema?: Schema<T>;
}) => {
  const { defaultValues, schema, scrollToFirstError } = params;

  const [form, setForm] = useState<T>({ ...defaultValues });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submitted = useRef<boolean>(false);
  const validateTrigger = useRef<number>(0);

  const turnOffValidateOnChange = () => (validateTrigger.current = 0);

  const resetForm = () => {
    setForm({ ...defaultValues });
    setErrors({});
    turnOffValidateOnChange();
  };

  useEffect(() => {
    const validate = async () => {
      if (submitted.current) {
        submitted.current = false;
      }

      if (validateTrigger.current && schema) {
        setErrors({});
        const validationResult = await validateWithSchema(schema, form);

        if (!validationResult.ok) {
          setErrors(validationResult.errors);
        }
      }
    };

    setTimeout(validate, 200);
  }, [form, schema]);

  useLayoutEffect(() => {
    if ((scrollToFirstError ?? true) && submitted.current) {
      document.querySelector(`.${FORM_ERROR_CLASSNAME}`)?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [errors, scrollToFirstError]);

  const triggerValidate = () => {
    validateTrigger.current = uniqRandomNumber();
  };

  const handleSubmitForm = async (callback: (value: T) => void) => {
    if (schema) {
      setErrors({});
      triggerValidate();
      submitted.current = true;

      const validationResult = await validateWithSchema(schema, form);

      if (!validationResult.ok) {
        setErrors(validationResult.errors);
      } else {
        callback(validationResult.validatedData);
      }
    } else {
      callback(form);
    }
  };

  const setValues = ({ value, name }: { value: any; name: any }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  return {
    setValues,
    setForm,
    formValues: form,
    errors,
    setErrors,
    triggerValidate,
    turnOffValidateOnChange,
    handleSubmitForm,
    resetForm,
  };
};
