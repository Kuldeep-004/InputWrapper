export const formatters = {
  text: (value, field = {}) => {
    let formatted = value;

    if (field.casing === "upper") {
      formatted = formatted.toUpperCase();
    } else if (field.casing === "lower") {
      formatted = formatted.toLowerCase();
    } else if (field.casing === "title") {
      formatted = formatted.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1),
      );
    }
    return formatted;
  },

  number: (value, field = {}) => {
    const precision = field.precision ?? 2;
    const max = field.max;

    let cleaned = value.replace(/[^\d.-]/g, "");

    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = parts[0] + "." + parts[1];
    }

    if (cleaned.includes(".")) {
      const [int, dec] = cleaned.split(".");
      cleaned = int + "." + dec.slice(0, precision);
    }

    if (max && Number(cleaned) > max) {
      return String(max);
    }

    return cleaned;
  },

  percentage: (value, field = {}) => {
    const precision = field.precision ?? 2;
    const max = field.max ?? 100;

    let cleaned = value.replace(/[^\d.]/g, "");

    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = parts[0] + "." + parts[1];
    }

    if (cleaned.includes(".")) {
      const [int, dec] = cleaned.split(".");
      cleaned = int + "." + dec.slice(0, precision);
    }

    if (cleaned && Number(cleaned) > max) {
      return String(max);
    }

    return cleaned;
  },

  pan: (value) => {
    let cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    if (cleaned.length > 10) return cleaned.slice(0, 10);

    let formatted = "";

    for (let i = 0; i < cleaned.length; i++) {
      if (i < 5 && /[A-Z]/.test(cleaned[i])) {
        formatted += cleaned[i];
      } else if (i >= 5 && i < 9 && /[0-9]/.test(cleaned[i])) {
        formatted += cleaned[i];
      } else if (i === 9 && /[A-Z]/.test(cleaned[i])) {
        formatted += cleaned[i];
      } else break;
    }

    return formatted;
  },

  tan: (value) => {
    let cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    if (cleaned.length > 10) return cleaned.slice(0, 10);

    let formatted = "";

    for (let i = 0; i < cleaned.length; i++) {
      if (i < 4 && /[A-Z]/.test(cleaned[i])) {
        formatted += cleaned[i];
      } else if (i >= 4 && i < 9 && /[0-9]/.test(cleaned[i])) {
        formatted += cleaned[i];
      } else if (i === 9 && /[A-Z]/.test(cleaned[i])) {
        formatted += cleaned[i];
      } else break;
    }

    return formatted;
  },

  gst: (value) => {
    let cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    if (cleaned.length > 15) return cleaned.slice(0, 15);

    let formatted = "";

    for (let i = 0; i < cleaned.length; i++) {
      if (i < 2 && /[0-9]/.test(cleaned[i])) {
        formatted += cleaned[i];
      } else if (i >= 2 && i < 7 && /[A-Z]/.test(cleaned[i])) {
        formatted += cleaned[i];
      } else if (i >= 7 && i < 11 && /[0-9]/.test(cleaned[i])) {
        formatted += cleaned[i];
      } else if (i === 11 && /[A-Z]/.test(cleaned[i])) {
        formatted += cleaned[i];
      } else if (i === 12 && /[0-9A-Z]/.test(cleaned[i])) {
        formatted += cleaned[i];
      } else if (i === 13 && cleaned[i] === "Z") {
        formatted += cleaned[i];
      } else if (i === 14 && /[0-9A-Z]/.test(cleaned[i])) {
        formatted += cleaned[i];
      } else break;
    }

    return formatted;
  },

  llp: (value, field = {}, prevValue = "") => {
    let cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    if (prevValue?.length === 5 && prevValue[3] === "-" && value.length === 4) {
      return cleaned.slice(0, 3);
    }

    let letters = "";
    let digits = "";

    for (let i = 0; i < cleaned.length; i++) {
      if (letters.length < 3 && /[A-Z]/.test(cleaned[i])) {
        letters += cleaned[i];
      } else if (letters.length === 3 && /[0-9]/.test(cleaned[i])) {
        digits += cleaned[i];
        if (digits.length === 4) break;
      } else break;
    }

    return letters.length === 3 ? letters + "-" + digits : letters;
  },

  cin: (value, field = {}) => {
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

  msme: (value, field = {}, prevValue = "") => {
    let cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    if (prevValue?.length === 6 && prevValue[5] === "-" && value.length === 5) {
      return cleaned.slice(0, 5);
    }

    if (prevValue?.length === 9 && prevValue[8] === "-" && value.length === 8) {
      return cleaned.slice(0, 7);
    }

    if (
      prevValue?.length === 14 &&
      prevValue[13] === "-" &&
      value.length === 13
    ) {
      return cleaned.slice(0, 12);
    }

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
      } else break;
    }

    if (letters.length === 5 && !part1) return letters + "-";
    if (part1.length === 2 && !part2) return letters + "-" + part1 + "-";
    if (part2.length === 4 && !part3)
      return letters + "-" + part1 + "-" + part2 + "-";

    let formatted = letters;
    if (part1) formatted += "-" + part1;
    if (part2) formatted += "-" + part2;
    if (part3) formatted += "-" + part3;

    return formatted;
  },

  aadhaar: (value) => {
    let cleaned = value.replace(/[^0-9]/g, "");
    cleaned = cleaned.slice(0, 12);
    return cleaned;
  },

  email: (value) => {
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

  phone: (value, field = {}) => {
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

  currency: (value, field = {}) => {
    const precision = field.precision ?? 2;
    const max = field.max ?? 100;

    let cleaned = value.replace(/[^\d.-]/g, "");

    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = parts[0] + "." + parts[1];
    }

    if (cleaned.includes(".")) {
      const [int, dec] = cleaned.split(".");
      cleaned = int + "." + dec.slice(0, precision);
    }

    if (max && Number(cleaned) > max) {
      return String(max);
    }

    return cleaned;
  },

  alphanumeric: (value, field = {}) => {
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
  ``;
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
    const precision = field.precision ?? 2;
    const min = String(field.min);
    const max = String(field.max);
    if (precision === undefined || !value) return value;

    let cleaned=value;
    if(min && Number(value) < min){
      cleaned=min;
    } else if(max && Number(value) >max){
      cleaned=max;
    }

    cleaned = cleaned.replace(/[^\d.-]/g, "");
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

  currency: (value, field = {}) => {
    const precision = field.precision ?? 2;
    const min = String(field.min);
    const max = String(field.max);
    if (precision === undefined || !value) return value;

    let cleaned=value;
    if(min && Number(value) < min){
      cleaned=min;
    } else if(max && Number(value) >max){
      cleaned=max;
    }

    cleaned = cleaned.replace(/[^\d.-]/g, "");
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
    const precision = field.precision ?? 2;
    const min = String(field.min);
    const max = String(field.max);
    if (precision === undefined || !value) return value;

    let cleaned=value;
    if(min && Number(value) < min){
      cleaned=min;
    } else if(max && Number(value) >max){
      cleaned=max;
    }

    cleaned = cleaned.replace(/[^\d.]/g, "");
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
