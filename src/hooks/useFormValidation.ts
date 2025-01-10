import { useState, useCallback } from 'react';
import { FormErrors } from '../types';

interface ValidationRules {
  [key: string]: (value: string) => string | undefined;
}

export const useFormValidation = (initialValues: { [key: string]: string }, validationRules: ValidationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name: string, value: string) => {
    if (validationRules[name]) {
      const error = validationRules[name](value);
      setErrors(prev => ({
        ...prev,
        [name]: error || ''
      }));
      return !error;
    }
    return true;
  }, [validationRules]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
  }, [validateField]);

  const validateForm = useCallback(() => {
    let isValid = true;
    const newErrors: FormErrors = {};

    Object.keys(values).forEach(key => {
      if (validationRules[key]) {
        const error = validationRules[key](values[key]);
        if (error) {
          isValid = false;
          newErrors[key] = error;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules]);

  return {
    values,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    validateForm,
    setValues,
    setErrors
  };
};

