import React from "react";
import BaseInput from "./BaseInput";
import { defaultTheme } from "./defaultTheme";

export default function FormRenderer({ formMethods, schema, children }) {
  const internalSchema = formMethods._internal.schema;
  const activeSchema = schema || internalSchema;
  const { theme } = formMethods._internal;
  const mergedTheme = { ...defaultTheme, ...theme };

  return (
    <div className={mergedTheme.form || ""}>
      <div className={mergedTheme.grid}>
        {activeSchema.map((item, index) => {
          if (item.element) {
            return (
              <React.Fragment key={`element-${index}`}>
                {item.element}
              </React.Fragment>
            );
          }

          if (item.id && item.type) {
            return (
              <BaseInput
                key={item.id}
                formMethods={formMethods}
                field={item}
                theme={mergedTheme}
              />
            );
          }

          return null;
        })}
      </div>

      {children && (
        <div className={mergedTheme.actions || "mt-6"}>
          {typeof children === "function" ? children(formMethods) : children}
        </div>
      )}
    </div>
  );
}
