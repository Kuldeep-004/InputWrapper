import { fieldTypeMetadata } from "./fieldTypes";

export function CheckboxInput({
  id,
  value,
  onChange,
  onKeyDown,
  className = "",
  disabled = false,
  ...props
}) {
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
}

export function NumberInput({
  id,
  value,
  onChange,
  onBlur,
  className = "",
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

export function TANInput({
  id,
  value,
  onChange,
  onBlur,
  className = "",
  ...props
}) {
  const metadata = fieldTypeMetadata.tan;

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

export function LLPInput({
  id,
  value,
  onChange,
  onBlur,
  className = "",
  ...props
}) {
  const metadata = fieldTypeMetadata.llp;

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

export function CINInput({
  id,
  value,
  onChange,
  onBlur,
  className = "",
  ...props
}) {
  const metadata = fieldTypeMetadata.cin;

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

export function MSMEInput({
  id,
  value,
  onChange,
  onBlur,
  className = "",
  ...props
}) {
  const metadata = fieldTypeMetadata.msme;

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

export function AadhaarInput({
  id,
  value,
  onChange,
  onBlur,
  className = "",
  ...props
}) {
  const metadata = fieldTypeMetadata.aadhaar;

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

export function EmailInput({
  id,
  value,
  onChange,
  onBlur,
  onKeyDown,
  className = "",
  ...props
}) {
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
}

export function PhoneInput({
  id,
  value,
  onChange,
  onBlur,
  className = "",
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
