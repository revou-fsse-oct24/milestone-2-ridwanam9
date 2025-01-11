import { useState, useCallback } from 'react';
import { FormErrors } from '../types';

// Interface untuk aturan validasi
interface ValidationRules {
  [key: string]: (value: string) => string | undefined;
}

// Custom hook untuk validasi form
export const useFormValidation = (
  initialValues: { [key: string]: string }, // Nilai awal form
  validationRules: ValidationRules // Aturan validasi
) => {
  // State untuk nilai form, error, dan status submit
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fungsi untuk memvalidasi satu field
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

  // Handler untuk perubahan input
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
  }, [validateField]);

  // Validasi seluruh form
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

  // Mengembalikan nilai dan fungsi yang diperlukan
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

