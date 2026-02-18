import React from "react";
import { fieldTypeMetadata } from "./fieldTypes";

export const CheckboxInput = React.forwardRef(
  (
    {
      id,
      value,
      onChange,
      onKeyDown,
      className = "",
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const metadata = fieldTypeMetadata.checkbox;
    const isChecked = Boolean(value);

    const handleKeyDown = (e) => {
      if (e.key === " ") {
        e.preventDefault();
        if (!disabled) {
          onChange(id, !isChecked);
        }
      }
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    const handleChange = (e) => {
      if (!disabled) {
        onChange(id, e.target.checked);
      }
    };

    return (
      <input
        ref={ref}
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={className}
        disabled={disabled}
        {...metadata.defaultProps}
        {...props}
      />
    );
  },
);

export const NumberInput = React.forwardRef(
  ({ id, value, onChange, onBlur, className = "", ...props }, ref) => {
    const metadata = fieldTypeMetadata.number;

    return (
      <input
        ref={ref}
        id={id}
        value={value || ""}
        onChange={(e) => onChange(id, e.target.value)}
        onBlur={onBlur}
        className={className}
        {...metadata.defaultProps}
        {...props}
      />
    );
  },
);

export const PercentageInput = React.forwardRef(
  ({ id, value, onChange, onBlur, className = "", ...props }, ref) => {
    const metadata = fieldTypeMetadata.percentage;

    return (
      <div className="relative">
        <input
          ref={ref}
          id={id}
          value={value || ""}
          onChange={(e) => onChange(id, e.target.value)}
          onBlur={onBlur}
          className={`${className} pr-7`}
          {...metadata.defaultProps}
          {...props}
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
          %
        </span>
      </div>
    );
  },
);

export const GSTInput = React.forwardRef(
  ({ id, value, onChange, onBlur, className = "", ...props }, ref) => {
    const metadata = fieldTypeMetadata.gst;

    return (
      <input
        ref={ref}
        id={id}
        value={value || ""}
        onChange={(e) => onChange(id, e.target.value)}
        onBlur={onBlur}
        className={className}
        {...metadata.defaultProps}
        {...props}
      />
    );
  },
);

export const PANInput = React.forwardRef(
  ({ id, value, onChange, onBlur, className = "", ...props }, ref) => {
    const metadata = fieldTypeMetadata.pan;

    return (
      <input
        ref={ref}
        id={id}
        value={value || ""}
        onChange={(e) => onChange(id, e.target.value)}
        onBlur={onBlur}
        className={className}
        {...metadata.defaultProps}
        {...props}
      />
    );
  },
);

export const TANInput = React.forwardRef(
  ({ id, value, onChange, onBlur, className = "", ...props }, ref) => {
    const metadata = fieldTypeMetadata.tan;

    return (
      <input
        ref={ref}
        id={id}
        value={value || ""}
        onChange={(e) => onChange(id, e.target.value)}
        onBlur={onBlur}
        className={className}
        {...metadata.defaultProps}
        {...props}
      />
    );
  },
);

export const LLPInput = React.forwardRef(
  ({ id, value, onChange, onBlur, className = "", ...props }, ref) => {
    const metadata = fieldTypeMetadata.llp;

    return (
      <input
        ref={ref}
        id={id}
        value={value || ""}
        onChange={(e) => onChange(id, e.target.value)}
        onBlur={onBlur}
        className={className}
        {...metadata.defaultProps}
        {...props}
      />
    );
  },
);

export const CINInput = React.forwardRef(
  ({ id, value, onChange, onBlur, className = "", ...props }, ref) => {
    const metadata = fieldTypeMetadata.cin;

    return (
      <input
        ref={ref}
        id={id}
        value={value || ""}
        onChange={(e) => onChange(id, e.target.value)}
        onBlur={onBlur}
        className={className}
        {...metadata.defaultProps}
        {...props}
      />
    );
  },
);

export const MSMEInput = React.forwardRef(
  ({ id, value, onChange, onBlur, className = "", ...props }, ref) => {
    const metadata = fieldTypeMetadata.msme;

    return (
      <input
        ref={ref}
        id={id}
        value={value || ""}
        onChange={(e) => onChange(id, e.target.value)}
        onBlur={onBlur}
        className={className}
        {...metadata.defaultProps}
        {...props}
      />
    );
  },
);

export const AadhaarInput = React.forwardRef(
  ({ id, value, onChange, onBlur, className = "", ...props }, ref) => {
    const metadata = fieldTypeMetadata.aadhaar;

    return (
      <input
        ref={ref}
        id={id}
        value={value || ""}
        onChange={(e) => onChange(id, e.target.value)}
        onBlur={onBlur}
        className={className}
        {...metadata.defaultProps}
        {...props}
      />
    );
  },
);

export const EmailInput = React.forwardRef(
  (
    { id, value, onChange, onBlur, onKeyDown, className = "", ...props },
    ref,
  ) => {
    const metadata = fieldTypeMetadata.email;

    const handleKeyDown = (e) => {
      if (e.key === " ") {
        e.preventDefault();
      }
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    return (
      <input
        ref={ref}
        id={id}
        value={value || ""}
        onChange={(e) => onChange(id, e.target.value)}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        className={className}
        {...metadata.defaultProps}
        {...props}
      />
    );
  },
);

export const PhoneInput = React.forwardRef(
  ({ id, value, onChange, onBlur, className = "", ...props }, ref) => {
    const metadata = fieldTypeMetadata.phone;

    return (
      <input
        ref={ref}
        id={id}
        value={value || ""}
        onChange={(e) => onChange(id, e.target.value)}
        onBlur={onBlur}
        className={className}
        {...metadata.defaultProps}
        {...props}
      />
    );
  },
);

export const CurrencyInput = React.forwardRef(
  (
    { id, value, onChange, onBlur, className = "", config = {}, ...props },
    ref,
  ) => {
    const metadata = fieldTypeMetadata.currency;
    const prefix = config.prefix || metadata.prefix || "₹";

    return (
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
          {prefix}
        </span>
        <input
          ref={ref}
          id={id}
          value={value || ""}
          onChange={(e) => onChange(id, e.target.value)}
          onBlur={onBlur}
          className={`${className} pl-8`}
          {...metadata.defaultProps}
          {...props}
        />
      </div>
    );
  },
);

export function getInputComponent(type) {
  const components = {
    checkbox: CheckboxInput,
    number: NumberInput,
    percentage: PercentageInput,
    gst: GSTInput,
    pan: PANInput,
    tan: TANInput,
    llp: LLPInput,
    cin: CINInput,
    msme: MSMEInput,
    aadhaar: AadhaarInput,
    email: EmailInput,
    currency: CurrencyInput,
    phone: PhoneInput,
  };

  return components[type] || null;
}
