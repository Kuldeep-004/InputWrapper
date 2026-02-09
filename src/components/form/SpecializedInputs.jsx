import React from "react";
import { fieldTypeMetadata } from "./fieldTypes";

export function NumberInput({
  id,
  value,
  onChange,
  onBlur,
  className = "",
  config = {},
  ...props
}) {
  const metadata = fieldTypeMetadata.number;

  return (
    <input
      id={id}
      value={value || ""}
      onChange={(e) => onChange(id, e.target.value)}
      onBlur={onBlur}
      className={className}
      {...metadata.defaultProps}
      {...props}
    />
  );
}

export function PercentageInput({
  id,
  value,
  onChange,
  onBlur,
  className = "",
  config = {},
  ...props
}) {
  const metadata = fieldTypeMetadata.percentage;

  return (
    <div className="relative">
      <input
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
}

export function GSTInput({
  id,
  value,
  onChange,
  onBlur,
  className = "",
  config = {},
  ...props
}) {
  const metadata = fieldTypeMetadata.gst;

  return (
    <input
      id={id}
      value={value || ""}
      onChange={(e) => onChange(id, e.target.value)}
      onBlur={onBlur}
      className={className}
      {...metadata.defaultProps}
      {...props}
    />
  );
}

export function PANInput({
  id,
  value,
  onChange,
  onBlur,
  className = "",
  config = {},
  ...props
}) {
  const metadata = fieldTypeMetadata.pan;

  return (
    <input
      id={id}
      value={value || ""}
      onChange={(e) => onChange(id, e.target.value)}
      onBlur={onBlur}
      className={className}
      {...metadata.defaultProps}
      {...props}
    />
  );
}

export function CurrencyInput({
  id,
  value,
  onChange,
  onBlur,
  className = "",
  config = {},
  ...props
}) {
  const metadata = fieldTypeMetadata.currency;
  const prefix = config.prefix || metadata.prefix || "₹";

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
        {prefix}
      </span>
      <input
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
}

export function EmailInput({
  id,
  value,
  onChange,
  onBlur,
  className = "",
  config = {},
  ...props
}) {
  const metadata = fieldTypeMetadata.email;

  return (
    <input
      id={id}
      value={value || ""}
      onChange={(e) => onChange(id, e.target.value)}
      onBlur={onBlur}
      className={className}
      {...metadata.defaultProps}
      {...props}
    />
  );
}

export function PhoneInput({
  id,
  value,
  onChange,
  onBlur,
  className = "",
  config = {},
  ...props
}) {
  const metadata = fieldTypeMetadata.phone;

  return (
    <input
      id={id}
      value={value || ""}
      onChange={(e) => onChange(id, e.target.value)}
      onBlur={onBlur}
      className={className}
      {...metadata.defaultProps}
      {...props}
    />
  );
}

export function getInputComponent(type) {
  const components = {
    number: NumberInput,
    percentage: PercentageInput,
    gst: GSTInput,
    pan: PANInput,
    currency: CurrencyInput,
    email: EmailInput,
    phone: PhoneInput,
  };

  return components[type] || null;
}
