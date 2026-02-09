import React, { useEffect, useRef } from "react";
import { defaultTheme } from "./defaultTheme";
import { getInputComponent } from "./SpecializedInputs";

export default function BaseInput({ formMethods, field, theme }) {
  const {
    id,
    type = "text",
    label,
    placeholder = "",
    disabled = false,
    className = "",
    css = {},
    labelPosition = "top",
    autofocus = false,
    ...rest
  } = field;

  const inputRef = useRef(null);
  const hasAutofocused = useRef(false);

  const value = formMethods.watch(id) || "";
  const errors = formMethods.getErrors();
  const error = errors[id];

  useEffect(() => {
    if (autofocus && !hasAutofocused.current) {
      hasAutofocused.current = true;
      setTimeout(() => {
        formMethods.focusField(id);
      }, 100);
    }
  }, []);

  const mergedCss = {
    wrapper: css.wrapper || theme.wrapper || defaultTheme.wrapper,
    label: css.label || theme.label || defaultTheme.label,
    input: css.input || theme.input || defaultTheme.input,
    error: css.error || theme.error || defaultTheme.error,
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      formMethods.validateAndNext(id);
    } else if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      formMethods.moveToPrevious(id);
    }
  };

  const handleBlur = (e) => {
    formMethods.validateFields([id]);
  };

  const SpecializedInput = getInputComponent(type);

  const renderInput = () => {
    if (SpecializedInput) {
      return (
        <SpecializedInput
          id={id}
          value={value}
          onChange={(id, val) => formMethods.setValues({ [id]: val })}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`${mergedCss.input} ${className} ${
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : ""
          }`}
          placeholder={placeholder}
          disabled={disabled}
          config={field}
          {...rest}
        />
      );
    }

    return (
      <input
        id={id}
        type={type === "text" || type === "alphanumeric" ? "text" : type}
        value={value}
        onChange={(e) => formMethods.setValues({ [id]: e.target.value })}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${mergedCss.input} ${className} ${
          error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""
        }`}
        placeholder={placeholder}
        disabled={disabled}
        {...rest}
      />
    );
  };

  const renderLabel = () => {
    if (!label) return null;
    return (
      <label htmlFor={id} className={mergedCss.label}>
        {label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
    );
  };

  if (labelPosition === "left") {
    return (
      <div className={`${mergedCss.wrapper} flex-row items-center gap-3`}>
        {renderLabel()}
        {renderInput()}
        <div className={mergedCss.error}>{error || "\u00A0"}</div>
      </div>
    );
  }

  return (
    <div className={mergedCss.wrapper}>
      {renderLabel()}
      {renderInput()}
      <div className={mergedCss.error}>{error || "\u00A0"}</div>
    </div>
  );
}
