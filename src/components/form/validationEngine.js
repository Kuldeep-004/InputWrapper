const validationRules = {
  required: (value, message = "This field is required") => {
    if (!value || (typeof value === "string" && !value.trim())) {
      return message;
    }
    return null;
  },

  minLength: (value, min, message) => {
    if (value && value.length < min) {
      return message || `Minimum ${min} characters required`;
    }
    return null;
  },

  maxLength: (value, max, message) => {
    if (value && value.length > max) {
      return message || `Maximum ${max} characters allowed`;
    }
    return null;
  },

  min: (value, min, message) => {
    const num = parseFloat(value);
    if (!isNaN(num) && num < min) {
      return message || `Minimum value is ${min}`;
    }
    return null;
  },

  max: (value, max, message) => {
    const num = parseFloat(value);
    if (!isNaN(num) && num > max) {
      return message || `Maximum value is ${max}`;
    }
    return null;
  },

  pattern: (value, regex, message = "Invalid format") => {
    if (value && !regex.test(value)) {
      return message;
    }
    return null;
  },

  email: (value, message = "Invalid email address") => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      return message;
    }
    return null;
  },

  number: (value, message = "Must be a valid number") => {
    if (value && isNaN(parseFloat(value))) {
      return message;
    }
    return null;
  },

  percentage: (value, message = "Must be between 0 and 100") => {
    const num = parseFloat(value);
    if (value && (isNaN(num) || num < 0 || num > 100)) {
      return message;
    }
    return null;
  },

  gst: (value, message = "Invalid GST number") => {
    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (value && !gstRegex.test(value)) {
      return message;
    }
    return null;
  },

  pan: (value, message = "Invalid PAN number") => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (value && !panRegex.test(value)) {
      return message;
    }
    return null;
  },

  custom: (value, validatorFn, message = "Invalid value") => {
    if (value && validatorFn && !validatorFn(value)) {
      return message;
    }
    return null;
  },
};

export function validateField(fieldId, value, fieldConfig) {
  if (!fieldConfig || !fieldConfig.validations) {
    return null;
  }

  const validations = fieldConfig.validations;

  for (const validation of validations) {
    const { rule, params = [], message } = validation;

    if (!validationRules[rule]) {
      console.warn(`Unknown validation rule: ${rule}`);
      continue;
    }

    const error = validationRules[rule](value, ...params, message);
    if (error) {
      return error;
    }
  }

  return null;
}

export const typeValidators = {
  text: (value, config) => {
    const errors = [];

    if (config.required && !value?.trim()) {
      errors.push("This field is required");
    }

    if (config.minLength && value && value.length < config.minLength) {
      errors.push(`Minimum ${config.minLength} characters required`);
    }

    if (config.maxLength && value && value.length > config.maxLength) {
      errors.push(`Maximum ${config.maxLength} characters allowed`);
    }

    return errors[0] || null;
  },

  number: (value, config) => {
    const errors = [];

    if (config.required && !value) {
      errors.push("This field is required");
    }

    const num = parseFloat(value);
    if (value && isNaN(num)) {
      errors.push("Must be a valid number");
      return errors[0];
    }
    if (config.min !== undefined && num < config.min) {
      errors.push(`Minimum value is ${config.min}`);
    }
    if (config.max !== undefined && num > config.max) {
      errors.push(`Maximum value is ${config.max}`);
    }
    return errors[0] || null;
  },

  percentage: (value, config) => {
    const errors = [];

    if (config.required && !value) {
      errors.push("This field is required");
    }

    const num = parseFloat(value);
    if (value && (isNaN(num) || num < 0 || num > 100)) {
      errors.push("Must be between 0 and 100");
    }
    return errors[0] || null;
  },

  gst: (value, config) => {
    const errors = [];

    if (config.required && !value?.trim()) {
      errors.push("GST number is required");
    }

    if (value) {
      const gstRegex =
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstRegex.test(value)) {
        errors.push("Invalid GST number format");
      }
    }
    return errors[0] || null;
  },

  pan: (value, config) => {
    const errors = [];

    if (config.required && !value?.trim()) {
      errors.push("PAN number is required");
    }

    if (value) {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panRegex.test(value)) {
        errors.push("Invalid PAN number format");
      }
    }
    return errors[0] || null;
  },

  email: (value, config) => {
    const errors = [];

    if (config.required && !value?.trim()) {
      errors.push("Email is required");
    }

    if (value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors.push("Invalid email address");
      }
    }
    return errors[0] || null;
  },
};

export function validateForm(values, schema) {
  const errors = {};

  for (const field of schema) {
    if (!field.id || !field.type) continue;

    const value = values[field.id];
    const validator = typeValidators[field.type];

    if (validator) {
      const error = validator(value, field);
      if (error) {
        errors[field.id] = error;
      }
    }
  }

  return errors;
}
