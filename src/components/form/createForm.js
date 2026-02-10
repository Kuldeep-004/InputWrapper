import { useState, useCallback, useMemo, useEffect } from "react";
import { typeValidators } from "./validationEngine";
import { getFieldTypeConfig } from "./fieldTypes";

export function useCreateForm({ schema, theme = {}, initialValues = {} }) {
  const [formState] = useState(() => ({
    values: { ...initialValues },
    errors: {},
    touched: {},
    watchers: new Map(),
  }));

  const [, forceUpdate] = useState({});

  const fieldIds = useMemo(
    () => schema.filter((f) => f.id && f.type).map((f) => f.id),
    [schema],
  );

  const allIds = useMemo(
    () => schema.filter((f) => f.id).map((f) => f.id),
    [schema],
  );

  const fieldMap = useMemo(() => {
    const map = {};
    schema.forEach((field) => {
      if (field.id) map[field.id] = field;
    });
    return map;
  }, [schema]);

  const schemaIndexMap = useMemo(() => {
    const map = {};
    schema.forEach((item, index) => {
      if (item.id) map[item.id] = index;
    });
    return map;
  }, [schema]);

  const notifyWatchers = useCallback(
    (id) => {
      const watchers = formState.watchers.get(id);

      if (watchers) {
        watchers.forEach((setter) => setter(formState.values[id]));
      }
    },
    [formState],
  );

  const getNextFieldId = useCallback(
    (currentId) => {
      const field = fieldMap[currentId];
      if (field?.next) return field.next;
      const currentIndex = schemaIndexMap[currentId];
      if (currentIndex !== undefined) {
        for (let i = currentIndex + 1; i < schema.length; i++) {
          if (schema[i].id) return schema[i].id;
        }
      }
      return null;
    },
    [fieldMap, schemaIndexMap, schema],
  );

  const getPrevFieldId = useCallback(
    (currentId) => {
      const field = fieldMap[currentId];
      if (field?.prev) return field.prev;
      const currentIndex = schemaIndexMap[currentId];
      if (currentIndex !== undefined) {
        for (let i = currentIndex - 1; i >= 0; i--) {
          if (schema[i].id) return schema[i].id;
        }
      }
      return null;
    },
    [fieldMap, schemaIndexMap, schema],
  );

  const validateField = useCallback(
    (id, value) => {
      const field = fieldMap[id];
      if (!field || !field.type) return null;

      if (field.customValidation) {
        const error = field.customValidation(value);
        if (error) return error;
      }

      if (field.regex) {
        const regex = field.regex.regex || field.regex;
        const error = field.regex.error || "Invalid format";
        if (value && !regex.test(value)) return error;
      }

      if (field.required) {
        const error =
          field.required.error || field.required === true
            ? "This field is required"
            : field.required;
        if (!value || (typeof value === "string" && !value.trim())) {
          return typeof error === "string" ? error : "This field is required";
        }
      }

      const validator = typeValidators[field.type];
      return validator ? validator(value, field) : null;
    },
    [fieldMap],
  );

  const formMethods = useMemo(
    () => ({
      watch: (id) => {
        const [value, setValue] = useState(formState.values[id]);

        useEffect(() => {
          if (!formState.watchers.has(id)) {
            formState.watchers.set(id, new Set());
          }
          formState.watchers.get(id).add(setValue);

          return () => {
            const watchers = formState.watchers.get(id);
            if (watchers) {
              watchers.delete(setValue);
            }
          };
        }, [id]);

        return value;
      },

      getValues: (ids) => {
        if (Array.isArray(ids)) {
          const result = {};
          ids.forEach((id) => {
            result[id] = formState.values[id];
          });
          return result;
        }
        return { ...formState.values };
      },

      setValues: (values) => {
        if (!values || typeof values !== "object" || Array.isArray(values))
          return;
        Object.keys(values).forEach((id) => {
          const field = fieldMap[id];
          if (!field) return;

          const prevValue = formState.values[id] || "";
          let formattedValue = values[id];
          if (field.type) {
            const typeConfig = getFieldTypeConfig(field.type);
            if (typeConfig.formatter) {
              formattedValue = typeConfig.formatter(
                formattedValue,
                prevValue,
                field,
              );
            }
          }

          formState.values[id] = formattedValue;
          notifyWatchers(id);

          if (formState.errors[id] && formState.touched[id]) {
            formState.errors[id] = null;
          }
        });
      },

      validateFieldThenNext: (id, value) => {
        const field = fieldMap[id];
        const errors = [];
        if (!field || !field.type) return null;

        if (field.customValidation) {
          const error = field.customValidation(value);
          if (error){
            errors.push(errors);
          }
        }
        if (field.regex) {
          const regex = field.regex.regex || field.regex;
          const err = field.regex.error || "Invalid format";
          if (value && !regex.test(value)) {
            errors.push(err);
          }
        }

        const validator = typeValidators[field.type];
        const err = validator(value, field);
        if (err) {
          errors.push(err);
        }
        console.log(errors)
        if (errors.length == 0) {
          const nextId = getNextFieldId(id);
          if (nextId) {
            const element = document.getElementById(nextId);
            if (element) {
              element.focus();
              if (element.select) element.select();
            }
          }
        }
        formState.errors[id] = errors.length ? [...errors] : formState.errors[id];
        formState.touched[id] = true;
        forceUpdate({});
      },

      validateFields: (ids) => {
        const fieldsToValidate = ids && Array.isArray(ids) ? ids : fieldIds;
        const errors = {};
        let hasError = false;

        fieldsToValidate.forEach((id) => {
          const value = formState.values[id] || "";
          const error = validateField(id, value);
          if (error) {
            errors[id] = error;
            hasError = true;
          }
          formState.errors[id] = error;
          formState.touched[id] = true;
        });

        forceUpdate({});
        return { isValid: !hasError, errors };
      },

      validateAndNext: (id) => {
        const currentValue = formState.values[id] || "";
        const error = validateField(id, currentValue);
        formState.errors[id] = error;
        formState.touched[id] = true;

        const nextId = getNextFieldId(id);
        if (nextId) {
          const element = document.getElementById(nextId);
          if (element) {
            element.focus();
            if (element.select) element.select();
          }
        }
        return error;
      },

      moveToPrevious: (id) => {
        const prevId = getPrevFieldId(id);
        if (prevId) {
          const element = document.getElementById(prevId);
          if (element) {
            element.focus();
            if (element.select) element.select();
          }
        }
      },

      focusField: (id) => {
        const element = document.getElementById(id);
        if (element) {
          element.focus();
          if (element.select) element.select();
        }
      },

      reset: (newValues = {}) => {
        formState.values = { ...initialValues, ...newValues };
        formState.errors = {};
        formState.touched = {};

        allIds.forEach((id) => {
          notifyWatchers(id);
        });
        forceUpdate({});
      },

      getErrors: (ids) => {
        if (ids && Array.isArray(ids)) {
          const errors = {};
          ids.forEach((id) => {
            if (formState.errors[id]) {
              errors[id] = formState.errors[id];
            }
          });
          return errors;
        }
        return { ...formState.errors };
      },

      getTouched: () => {
        return { ...formState.touched };
      },
      handleSubmit: (onSubmit) => {
        const errors = {};
        let hasError = false;
        let firstErrorId = null;
        fieldIds.forEach((id) => {
          const value = formState.values[id] || "";
          const error = validateField(id, value);
          if (error) {
            errors[id] = error;
            hasError = true;
            if (!firstErrorId) {
              firstErrorId = id;
            }
          }
          formState.errors[id] = error;
          formState.touched[id] = true;
        });
        forceUpdate({});

        if (hasError && firstErrorId) {
          const element = document.getElementById(firstErrorId);
          if (element) {
            element.focus();
            if (element.select) element.select();
          }
        }

        const isValid = !hasError;

        if (isValid && onSubmit) {
          onSubmit(formState.values);
        }

        return { isValid, errors };
      },

      _internal: {
        formState,
        fieldIds,
        allIds,
        fieldMap,
        schema,
        theme,
      },
    }),
    [
      formState,
      fieldIds,
      allIds,
      fieldMap,
      schema,
      theme,
      notifyWatchers,
      getNextFieldId,
      getPrevFieldId,
      validateField,
      initialValues,
    ],
  );

  return formMethods;
}

export const createForm = useCreateForm;
