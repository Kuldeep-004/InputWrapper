import { useEffect, useRef, useState } from "react";
import { defaultTheme } from "./defaultTheme";
import { getInputComponent } from "./SpecializedInputs";
import { getFieldTypeConfig } from "./fieldTypes";

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
  const wrapperRef = useRef(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const value = formMethods.watch(id) || "";
  const errors = formMethods.getErrors();
  const error = errors[id];

  useEffect(() => {
    if (autofocus && !hasAutofocused.current) {
      hasAutofocused.current = true;
      formMethods.focusField(id);
    }
  }, []);

  // useEffect(() => {
  //   if (isFocused && error && inputRef.current) {
  //     const inputRect = inputRef.current.getBoundingClientRect();
  //     const wrapperRect = wrapperRef.current?.getBoundingClientRect();

  //     if (wrapperRect) {
  //       setTooltipPosition({
  //         top: inputRect.bottom - wrapperRect.top + 4,
  //         left: inputRect.left - wrapperRect.left,
  //       });
  //     }
  //     setPosReady(true);
  //   }
  // }, [isFocused, error, value]);

  const mergedCss = {
    wrapper: css.wrapper || theme.wrapper || defaultTheme.wrapper,
    label: css.label || theme.label || defaultTheme.label,
    input: css.input || theme.input || defaultTheme.input,
    error: css.error || theme.error || defaultTheme.error,
  };

  const handleKeyDown = (e) => {
    const el = inputRef.current;
    if (e.key == "Escape") {
      e.preventDefault();
      e.target.blur();
    } else if (
      e.key === "Backspace" &&
      el &&
      el.selectionStart < value.length
    ) {
      if (
        el.selectionStart != el.selectionEnd &&
        el.selectionEnd == value.length
      )
        return;
      e.preventDefault();
      setTimeout(() => {
        el.setSelectionRange(value.length, value.length);
      }, 0);
      return;
    }
    if (e.key == "Enter") {
      e.preventDefault();
      formMethods.validateFieldThenNext(id, formMethods.getValues([id])[id]);
    } else if (e.key == "Tab" && !e.shiftKey) {
      e.preventDefault();
      formMethods.validateAndNext(id);
    } else if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      formMethods.moveToPrevious(id);
    }
  };

  const handleBlur = () => {
    const typeConfig = getFieldTypeConfig(type);
    if (typeConfig.normalizer) {
      const currentValue = formMethods.getValues([id])[id];
      const normalizedValue = typeConfig.normalizer(currentValue, field);
      if (normalizedValue !== currentValue) {
        formMethods.setValues({ [id]: normalizedValue });
      }
    }
    formMethods.validateFields([id]);
  };

  const handleFocus = () => {
    const inputRect = inputRef.current?.getBoundingClientRect();
    const wrapperRect = wrapperRef.current?.getBoundingClientRect();

    setTooltipPosition({
      top: inputRect.bottom - wrapperRect.top + 4,
      left: inputRect.left - wrapperRect.left,
    });
  };

  const SpecializedInput = getInputComponent(type);

  const renderInput = () => {
    if (SpecializedInput) {
      return (
        <SpecializedInput
          id={id}
          ref={inputRef}
          value={value}
          onChange={(id, val) => formMethods.setValues({ [id]: val })}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          className={`${
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : ""
          } ${mergedCss.input} ${className} `}
          placeholder={placeholder}
          disabled={disabled}
          config={field}
          spellCheck="false"
          {...rest}
        />
      );
    }

    return (
      <input
        id={id}
        ref={inputRef}
        type={type === "text" ? "text" : type}
        value={value}
        onChange={(e) => formMethods.setValues({ [id]: e.target.value })}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        className={`${
          error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""
        } ${mergedCss.input} ${className} `}
        placeholder={placeholder}
        disabled={disabled}
        spellCheck="false"
        {...rest}
      />
    );
  };

  const renderLabel = () => {
    if (!label || type == "checkbox") return null;
    return (
      <label htmlFor={id} className={mergedCss.label}>
        {label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
    );
  };

  const renderTooltip = () => {
    if (!error) return null;

    return (
      <div
        className="tooltip absolute z-50 px-3 py-2 text-sm bg-white rounded-md shadow-lg pointer-events-none"
        style={{
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`,
          maxWidth: "300px",
          wordWrap: "break-word",
        }}
      >
        <div className="relative">{error}</div>
      </div>
    );
  };

  if (labelPosition === "left") {
    return (
      <div
        ref={wrapperRef}
        className={`flex-row items-center gap-3 wrapper ${mergedCss.wrapper} relative`}
      >
        {renderLabel()}
        {renderInput()}
        {renderTooltip()}
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className={`${mergedCss.wrapper} wrapper relative`}>
      {renderLabel()}
      {renderInput()}
      {renderTooltip()}
    </div>
  );
}
