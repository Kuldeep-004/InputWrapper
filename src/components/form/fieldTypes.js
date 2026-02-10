export const formatters = {
  text: (value, prevValue = "", field = {}) => {
    let formatted = value;

    if (field.casing === "upper") {
      formatted = formatted.toUpperCase();
    } else if (field.casing === "lower") {
      formatted = formatted.toLowerCase();
    } else if (field.casing === "title") {
      formatted = formatted.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
      );
    }

    return formatted;
  },

  number: (value, prevValue = "", field = {}) => {
    const precision = field.precision;

    if (precision === undefined) {
      let cleaned = value.replace(/[^\d-]/g, "");
      const hasMinus = cleaned.startsWith("-");
      cleaned = cleaned.replace(/-/g, "");
      if (hasMinus && !field.positiveOnly) {
        cleaned = "-" + cleaned;
      }
      return cleaned;
    }

    let cleaned = value.replace(/[^\d.-]/g, "");

    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = parts[0] + "." + parts.slice(1).join("");
    }

    const hasMinus = cleaned.startsWith("-");
    cleaned = cleaned.replace(/-/g, "");
    if (hasMinus && !field.positiveOnly) {
      cleaned = "-" + cleaned;
    }

    if (cleaned.includes(".")) {
      const [integer, decimal] = cleaned.split(".");
      cleaned = integer + "." + decimal.slice(0, precision);
    }

    return cleaned;
  },

  percentage: (value, prevValue = "", field = {}) => {
    const precision = field.precision;

    if (precision === undefined) {
      let cleaned = value.replace(/[^\d]/g, "");
      if (cleaned && parseInt(cleaned) > 100) {
        return "100";
      }
      return cleaned;
    }

    let cleaned = value.replace(/[^\d.]/g, "");

    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = parts[0] + "." + parts.slice(1).join("");
    }

    if (cleaned.includes(".")) {
      const [integer, decimal] = cleaned.split(".");
      if (integer && parseInt(integer) > 100) {
        return "100";
      }
      cleaned = integer + "." + decimal.slice(0, precision);
    } else if (cleaned && parseInt(cleaned) > 100) {
      return "100";
    }

    return cleaned;
  },

  pan: (value, prevValue = "", field = {}) => {
    let cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    if (cleaned.length > 10) return cleaned.slice(0, 10);

    let formatted = "";
    for (let i = 0; i < cleaned.length; i++) {
      if (i < 5) {
        if (/[A-Z]/.test(cleaned[i])) formatted += cleaned[i];
      } else if (i < 9) {
        if (/[0-9]/.test(cleaned[i])) formatted += cleaned[i];
      } else if (i === 9) {
        if (/[A-Z]/.test(cleaned[i])) formatted += cleaned[i];
      }
    }

    return formatted;
  },

  tan: (value, prevValue = "", field = {}) => {
    let cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    if (cleaned.length > 10) return cleaned.slice(0, 10);

    let formatted = "";
    for (let i = 0; i < cleaned.length; i++) {
      if (i < 4) {
        if (/[A-Z]/.test(cleaned[i])) formatted += cleaned[i];
      } else if (i < 9) {
        if (/[0-9]/.test(cleaned[i])) formatted += cleaned[i];
      } else if (i === 9) {
        if (/[A-Z]/.test(cleaned[i])) formatted += cleaned[i];
      }
    }

    return formatted;
  },

  gst: (value, prevValue = "", field = {}) => {
    let cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    if (cleaned.length > 15) return cleaned.slice(0, 15);

    let formatted = "";
    for (let i = 0; i < cleaned.length; i++) {
      if (i < 2) {
        if (/[0-9]/.test(cleaned[i])) formatted += cleaned[i];
      } else if (i < 7) {
        if (/[A-Z]/.test(cleaned[i])) formatted += cleaned[i];
      } else if (i < 11) {
        if (/[0-9]/.test(cleaned[i])) formatted += cleaned[i];
      } else if (i === 11) {
        if (/[A-Z]/.test(cleaned[i])) formatted += cleaned[i];
      } else if (i === 12) {
        if (/[1-9A-Z]/.test(cleaned[i])) formatted += cleaned[i];
      } else if (i === 13) {
        if (cleaned[i] === "Z") formatted += cleaned[i];
      } else if (i === 14) {
        if (/[0-9A-Z]/.test(cleaned[i])) formatted += cleaned[i];
      }
    }

    return formatted;
  },

  llp: (value, prevValue = "", field = {}) => {
    if (prevValue && value.length < prevValue.length) {
      const wasAtHyphen = prevValue.length === 4 && prevValue[3] === "-";
      if (wasAtHyphen && value === prevValue.slice(0, 4)) {
        return value.slice(0, 3);
      }
    }

    let cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    let letters = "";
    let digits = "";

    for (let i = 0; i < cleaned.length; i++) {
      if (letters.length < 3 && /[A-Z]/.test(cleaned[i])) {
        letters += cleaned[i];
      } else if (letters.length === 3 && /[0-9]/.test(cleaned[i])) {
        digits += cleaned[i];
        if (digits.length === 4) break;
      }
    }

    if (digits.length > 0) {
      return letters + "-" + digits;
    }
    return letters;
  },

  cin: (value, prevValue = "", field = {}) => {
    let cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    if (cleaned.length > 21) return cleaned.slice(0, 21);

    let formatted = "";
    for (let i = 0; i < cleaned.length; i++) {
      if (i === 0) {
        if (/[UL]/.test(cleaned[i])) formatted += cleaned[i];
      } else if (i < 6) {
        if (/[0-9]/.test(cleaned[i])) formatted += cleaned[i];
      } else if (i < 8) {
        if (/[A-Z]/.test(cleaned[i])) formatted += cleaned[i];
      } else if (i < 12) {
        if (/[0-9]/.test(cleaned[i])) formatted += cleaned[i];
      } else if (i < 15) {
        if (/[A-Z]/.test(cleaned[i])) formatted += cleaned[i];
      } else if (i < 21) {
        if (/[0-9]/.test(cleaned[i])) formatted += cleaned[i];
      }
    }

    return formatted;
  },

  msme: (value, prevValue = "", field = {}) => {
    if (prevValue && value.length < prevValue.length) {
      const wasAtFirstHyphen = prevValue.length === 6 && prevValue[5] === "-";
      const wasAtSecondHyphen = prevValue.length === 9 && prevValue[8] === "-";
      const wasAtThirdHyphen = prevValue.length === 14 && prevValue[13] === "-";

      if (wasAtFirstHyphen && value === prevValue.slice(0, 6)) {
        return value.slice(0, 5);
      }
      if (wasAtSecondHyphen && value === prevValue.slice(0, 9)) {
        return value.slice(0, 8);
      }
      if (wasAtThirdHyphen && value === prevValue.slice(0, 14)) {
        return value.slice(0, 13);
      }
    }

    let cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    let letters = "";
    let part1 = "";
    let part2 = "";
    let part3 = "";

    for (let i = 0; i < cleaned.length; i++) {
      if (letters.length < 5 && /[A-Z]/.test(cleaned[i])) {
        letters += cleaned[i];
      } else if (
        letters.length === 5 &&
        part1.length < 2 &&
        /[0-9]/.test(cleaned[i])
      ) {
        part1 += cleaned[i];
      } else if (
        part1.length === 2 &&
        part2.length < 4 &&
        /[0-9]/.test(cleaned[i])
      ) {
        part2 += cleaned[i];
      } else if (
        part2.length === 4 &&
        part3.length < 5 &&
        /[0-9]/.test(cleaned[i])
      ) {
        part3 += cleaned[i];
      }
    }

    let formatted = letters;
    if (part1.length > 0) {
      formatted += "-" + part1;
    }

    if (part2.length > 0) {
      formatted += "-" + part2;
    }

    if (part3.length > 0) {
      formatted += "-" + part3;
    }

    return formatted;
  },

  aadhaar: (value, prevValue = "", field = {}) => {
    let cleaned = value.replace(/[^0-9]/g, "");

    cleaned = cleaned.slice(0, 12);

    return cleaned;
  },

  email: (value, prevValue = "", field = {}) => {
    let cleaned = value.replace(/\s/g, "");

    if (cleaned.startsWith("@") || cleaned.startsWith(".")) {
      return "";
    }

    let formatted = "";
    let hasAt = false;

    for (let i = 0; i < cleaned.length; i++) {
      const char = cleaned[i];

      if (char === "@") {
        if (!hasAt && formatted.length > 0) {
          formatted += char;
          hasAt = true;
        }
      } else if (char === ".") {
        if (
          formatted.length > 0 &&
          formatted[formatted.length - 1] !== "." &&
          formatted[formatted.length - 1] !== "@"
        ) {
          formatted += char;
        }
      } else if (/[a-zA-Z0-9_\-]/.test(char)) {
        formatted += char;
      }
    }

    return formatted.toLowerCase();
  },

  phone: (value, prevValue = "", field = {}) => {
    let formatted = "";

    for (let i = 0; i < value.length; i++) {
      const char = value[i];

      if (char === "+" && i === 0 && formatted.length === 0) {
        formatted += char;
      } else if (/[0-9\-]/.test(char)) {
        formatted += char;
      }
    }

    return formatted;
  },

  currency: (value, prevValue = "", field = {}) => {
    let cleaned = value.replace(/[^\d.]/g, "");

    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = parts[0] + "." + parts.slice(1).join("");
    }

    const decimals = field.decimals !== undefined ? field.decimals : 2;
    if (cleaned.includes(".")) {
      const [integer, decimal] = cleaned.split(".");
      cleaned = integer + "." + decimal.slice(0, decimals);
    }

    return cleaned;
  },

  alphanumeric: (value, prevValue = "", field = {}) => {
    let cleaned = value.replace(/[^a-zA-Z0-9]/g, "");

    if (field.casing === "upper") {
      cleaned = cleaned.toUpperCase();
    } else if (field.casing === "lower") {
      cleaned = cleaned.toLowerCase();
    }

    return cleaned;
  },
};

export function getFieldTypeConfig(type) {
  return {
    formatter: formatters[type] || formatters.text,
    normalizer: normalizers[type] || null,
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
  tan: {
    defaultProps: {
      type: "text",
      autoComplete: "off",
      maxLength: 10,
      placeholder: "ABCD12345E",
    },
  },
  llp: {
    defaultProps: {
      type: "text",
      autoComplete: "off",
      maxLength: 8,
      placeholder: "AAA-1234",
    },
  },
  cin: {
    defaultProps: {
      type: "text",
      autoComplete: "off",
      maxLength: 21,
      placeholder: "U12345AB1234ABC123456",
    },
  },
  msme: {
    defaultProps: {
      type: "text",
      autoComplete: "off",
      maxLength: 19,
      placeholder: "UDYAM-AB-12-1234567",
    },
  },
  aadhaar: {
    defaultProps: {
      type: "text",
      autoComplete: "off",
      maxLength: 12,
      placeholder: "123456789012",
      inputMode: "numeric",
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

export const normalizers = {
  number: (value, field = {}) => {
    const precision = field.precision;
    if (precision === undefined || !value) return value;

    let cleaned = value.replace(/[^\d.-]/g, "");
    if (!cleaned || cleaned === "-" || cleaned === ".") {
      return precision > 0 ? "0." + "0".repeat(precision) : "0";
    }

    if (cleaned.startsWith(".")) {
      cleaned = "0" + cleaned;
    }

    if (cleaned.endsWith(".")) {
      cleaned = cleaned + "0".repeat(precision);
    } else if (cleaned.includes(".")) {
      const [integer, decimal] = cleaned.split(".");
      const paddedDecimal = (decimal || "").padEnd(precision, "0");
      cleaned = integer + "." + paddedDecimal;
    } else {
      cleaned = cleaned + "." + "0".repeat(precision);
    }

    return cleaned;
  },

  percentage: (value, field = {}) => {
    const precision = field.precision;
    if (precision === undefined || !value) return value;

    let cleaned = value.replace(/[^\d.]/g, "");
    if (!cleaned || cleaned === ".") {
      return "0." + "0".repeat(precision);
    }

    if (cleaned.startsWith(".")) {
      cleaned = "0" + cleaned;
    }

    if (cleaned.endsWith(".")) {
      cleaned = cleaned + "0".repeat(precision);
    } else if (cleaned.includes(".")) {
      const [integer, decimal] = cleaned.split(".");
      const paddedDecimal = (decimal || "").padEnd(precision, "0");
      cleaned = integer + "." + paddedDecimal;
    } else {
      cleaned = cleaned + "." + "0".repeat(precision);
    }

    const num = parseFloat(cleaned);
    if (!isNaN(num) && num > 100) {
      cleaned = "100." + "0".repeat(precision);
    }

    return cleaned;
  },
};
