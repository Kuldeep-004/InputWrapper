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

  currency: (value, config) => {
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
    const min=config.min ?? 0;
    const max=config.max ?? 100;

    if (config.required && !value) {
      errors.push("This field is required");
    }

    const num = parseFloat(value);
    if (value && (isNaN(num) || num < min || num > max)) {
      errors.push(`Must be between ${min} and ${max}`);
    }
    return errors[0] || null;
  },

  gst: (value,config) => {
    const errors = [];
    if (config.required && !value?.trim()) {
      errors.push("GST number is required");
    }
    if(value){
      const gstRegex= /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1}$/;
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

  tan: (value, config) => {
    const errors = [];
    console.log(value)
    if (config.required && !value?.trim()) {
      errors.push("TAN number is required");
    }

    if (value) {
      const tanRegex = /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/;
      if (!tanRegex.test(value)) {
        errors.push("Invalid TAN number format");
      }
    }
    return errors[0] || null;
  },

  llp: (value, config) => {
    const errors = [];

    if (config.required && !value?.trim()) {
      errors.push("LLP number is required");
    }

    if (value) {
      const llpRegex = /^[A-Z]{3}-[0-9]{4}$/;
      if (!llpRegex.test(value)) {
        errors.push("Invalid LLP number format");
      }
    }
    return errors[0] || null;
  },

  cin: (value, config) => {
    const errors = [];

    if (config.required && !value?.trim()) {
      errors.push("CIN number is required");
    }

    if (value) {
      const cinRegex = /^[UL][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/;
      if (!cinRegex.test(value)) {
        errors.push("Invalid CIN number format");
      }
    }
    return errors[0] || null;
  },

  msme: (value, config) => {
    const errors = [];

    if (config.required && !value?.trim()) {
      errors.push("MSME number is required");
    }

    if (value) {
      const msmeRegex = /^[A-Z]{5}-[0-9]{2}-[0-9]{4}-[0-9]{5}$/;
      if (!msmeRegex.test(value)) {
        errors.push("Invalid MSME number format");
      }
    }
    return errors[0] || null;
  },

  aadhaar: (value, config) => {
    const errors = [];

    if (config.required && !value?.trim()) {
      errors.push("Aadhaar number is required");
    }

    if (value) {
      const aadhaarRegex = /^[0-9]{12}$/;
      if (!aadhaarRegex.test(value)) {
        errors.push("Invalid Aadhaar number format");
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
      const hasAt = value.includes("@");
      const hasDot = value.includes(".");
      const startsWithInvalid = value.startsWith("@") || value.startsWith(".");

      if (!hasAt || !hasDot || startsWithInvalid) {
        errors.push("Invalid email address");
      }
    }
    return errors[0] || null;
  },
};
