export const formatters = {
  text: (value, config) => {
    let formatted = value;

    if (config.casing === "upper") {
      formatted = formatted.toUpperCase();
    } else if (config.casing === "lower") {
      formatted = formatted.toLowerCase();
    } else if (config.casing === "title") {
      formatted = formatted.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
      );
    }

    return formatted;
  },

  number: (value, config) => {
    let cleaned = value.replace(/[^\d.-]/g, "");

    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = parts[0] + "." + parts.slice(1).join("");
    }

    const hasMinus = cleaned.startsWith("-");
    cleaned = cleaned.replace(/-/g, "");
    if (hasMinus && !config.positiveOnly) {
      cleaned = "-" + cleaned;
    }

    if (config.decimals !== undefined && cleaned.includes(".")) {
      const [integer, decimal] = cleaned.split(".");
      cleaned = integer + "." + decimal.slice(0, config.decimals);
    }

    return cleaned;
  },

  percentage: (value, config) => {
    let cleaned = value.replace(/[^\d.]/g, "");

    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = parts[0] + "." + parts.slice(1).join("");
    }

    const num = parseFloat(cleaned);
    if (!isNaN(num) && num > 100) {
      cleaned = "100";
    }

    const decimals = config.decimals !== undefined ? config.decimals : 2;
    if (cleaned.includes(".")) {
      const [integer, decimal] = cleaned.split(".");
      cleaned = integer + "." + decimal.slice(0, decimals);
    }

    return cleaned;
  },

  gst: (value, config) => {
    let cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    cleaned = cleaned.slice(0, 15);

    return cleaned;
  },

  pan: (value, config) => {
    let cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    cleaned = cleaned.slice(0, 10);

    return cleaned;
  },

  email: (value, config) => {
    return value.trim().toLowerCase();
  },

  phone: (value, config) => {
    let cleaned = value.replace(/\D/g, "");

    if (config.format === "india" && cleaned.length <= 10) {
      return cleaned;
    } else if (config.format === "us" && cleaned.length <= 10) {
      if (cleaned.length >= 6) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
      } else if (cleaned.length >= 3) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
      }
      return cleaned;
    }

    return cleaned;
  },

  currency: (value, config) => {
    let cleaned = value.replace(/[^\d.]/g, "");

    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = parts[0] + "." + parts.slice(1).join("");
    }

    const decimals = config.decimals !== undefined ? config.decimals : 2;
    if (cleaned.includes(".")) {
      const [integer, decimal] = cleaned.split(".");
      cleaned = integer + "." + decimal.slice(0, decimals);
    }

    return cleaned;
  },

  alphanumeric: (value, config) => {
    let cleaned = value.replace(/[^a-zA-Z0-9]/g, "");

    if (config.casing === "upper") {
      cleaned = cleaned.toUpperCase();
    } else if (config.casing === "lower") {
      cleaned = cleaned.toLowerCase();
    }

    return cleaned;
  },
};

export const sanitizers = {
  text: (value) => value?.trim() || "",
  number: (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? "" : num.toString();
  },
  percentage: (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "";
    return Math.min(100, Math.max(0, num)).toString();
  },
  gst: (value) => value?.toUpperCase().trim() || "",
  pan: (value) => value?.toUpperCase().trim() || "",
  email: (value) => value?.trim().toLowerCase() || "",
  phone: (value) => value?.replace(/\D/g, "") || "",
  currency: (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? "" : num.toFixed(2);
  },
  alphanumeric: (value) => value?.replace(/[^a-zA-Z0-9]/g, "") || "",
};

export function getFieldTypeConfig(type) {
  return {
    formatter: formatters[type] || formatters.text,
    sanitizer: sanitizers[type] || sanitizers.text,
  };
}

export const fieldTypeMetadata = {
  text: {
    defaultProps: {
      type: "text",
      autoComplete: "off",
    },
  },
  number: {
    defaultProps: {
      type: "text",
      inputMode: "decimal",
      autoComplete: "off",
    },
  },
  percentage: {
    defaultProps: {
      type: "text",
      inputMode: "decimal",
      autoComplete: "off",
    },
    suffix: "%",
  },
  gst: {
    defaultProps: {
      type: "text",
      autoComplete: "off",
      maxLength: 15,
      placeholder: "22AAAAA0000A1Z5",
    },
  },
  pan: {
    defaultProps: {
      type: "text",
      autoComplete: "off",
      maxLength: 10,
      placeholder: "ABCDE1234F",
    },
  },
  email: {
    defaultProps: {
      type: "email",
      inputMode: "email",
      autoComplete: "email",
    },
  },
  phone: {
    defaultProps: {
      type: "tel",
      inputMode: "tel",
      autoComplete: "tel",
    },
  },
  currency: {
    defaultProps: {
      type: "text",
      inputMode: "decimal",
      autoComplete: "off",
    },
    prefix: "₹",
  },
  alphanumeric: {
    defaultProps: {
      type: "text",
      autoComplete: "off",
    },
  },
};
