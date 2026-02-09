import { useState, useMemo, useCallback } from "react";
import { typeValidators } from "./validationEngine";
import { getFieldTypeConfig } from "./fieldTypes";

export default function useForm(schema, options = {}) {
  const [values, setValues] = useState(options.initialValues || {});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const fieldIds = useMemo(() => {
    return schema.filter((f) => f.id && f.type).map((f) => f.id);
  }, [schema]);

  const allIds = useMemo(() => {
    return schema.filter((f) => f.id).map((f) => f.id);
  }, [schema]);

  const fieldMap = useMemo(() => {
    const map = {};
    schema.forEach((field) => {
      if (field.id) {
        map[field.id] = field;
      }
    });
    return map;
  }, [schema]);

  const schemaIndexMap = useMemo(() => {
    const map = {};
    schema.forEach((item, index) => {
      if (item.id) {
        map[item.id] = index;
      }
    });
    return map;
  }, [schema]);

  const setValue = useCallback(
    (id, value, shouldValidate = false) => {
      const field = fieldMap[id];

      if (!field) {
        console.warn(`Field ${id} not found in schema`);
        return;
      }

      // Apply formatting based on field type
      let formattedValue = value;
      if (field.type) {
        const typeConfig = getFieldTypeConfig(field.type);
        if (typeConfig.formatter) {
          formattedValue = typeConfig.formatter(value, field);
        }
      }

      setValues((prev) => ({ ...prev, [id]: formattedValue }));

      // Validate if requested (e.g., on blur)
      if (shouldValidate) {
        validateField(id, formattedValue);
      }

      // Clear error when user starts typing (if field was touched)
      if (errors[id] && touched[id]) {
        setErrors((prev) => ({ ...prev, [id]: null }));
      }
    },
    [fieldMap, errors, touched],
  );

  const validateField = useCallback(
    (id, value) => {
      const field = fieldMap[id];

      if (!field || !field.type) {
        return null;
      }

      const validator = typeValidators[field.type];
      const error = validator ? validator(value, field) : null;

      setErrors((prev) => ({ ...prev, [id]: error }));
      setTouched((prev) => ({ ...prev, [id]: true }));

      return error;
    },
    [fieldMap],
  );

  const getNextFieldId = useCallback(
    (currentId) => {
      const field = fieldMap[currentId];

      // Manual navigation: check if field has explicit "next" defined
      if (field?.next) {
        return field.next;
      }

      // Natural order: search forward in schema array for next item with id
      const currentIndex = schemaIndexMap[currentId];
      if (currentIndex !== undefined) {
        // Look for next item with an id
        for (let i = currentIndex + 1; i < schema.length; i++) {
          if (schema[i].id) {
            return schema[i].id;
          }
        }
      }

      return null;
    },
    [fieldMap, schema, schemaIndexMap],
  );

  const getPrevFieldId = useCallback(
    (currentId) => {
      const field = fieldMap[currentId];

      // Manual navigation: check if field has explicit "prev" defined
      if (field?.prev) {
        return field.prev;
      }

      // Natural order: search backward in schema array for previous item with id
      const currentIndex = schemaIndexMap[currentId];
      if (currentIndex !== undefined) {
        // Look for previous item with an id
        for (let i = currentIndex - 1; i >= 0; i--) {
          if (schema[i].id) {
            return schema[i].id;
          }
        }
      }

      return null;
    },
    [fieldMap, schema, schemaIndexMap],
  );

  const focusField = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.focus();
      // Also select text for better UX
      if (element.select) {
        element.select();
      }
    }
  }, []);

  const validateAndNext = useCallback(
    (id) => {
      const currentValue = values[id] || "";

      // Validate current field
      const error = validateField(id, currentValue);

      // ALWAYS move to next regardless of error
      const nextId = getNextFieldId(id);
      if (nextId) {
        focusField(nextId);
      }

      return error;
    },
    [values, validateField, getNextFieldId, focusField],
  );

  const moveToPrevious = useCallback(
    (id) => {
      const prevId = getPrevFieldId(id);
      if (prevId) {
        focusField(prevId);
      }
    },
    [getPrevFieldId, focusField],
  );

  const moveToNext = useCallback(
    (id) => {
      const nextId = getNextFieldId(id);
      if (nextId) {
        focusField(nextId);
      }
    },
    [getNextFieldId, focusField],
  );

  const validateAll = useCallback(() => {
    const newErrors = {};
    let hasError = false;

    fieldIds.forEach((id) => {
      const value = values[id] || "";
      const error = validateField(id, value);
      if (error) {
        newErrors[id] = error;
        hasError = true;
      }
    });

    return { isValid: !hasError, errors: newErrors };
  }, [fieldIds, values, validateField]);

  const handleSubmit = useCallback(
    (onSubmit) => {
      const validation = validateAll();

      if (validation.isValid) {
        onSubmit(values);
      } else {
        // Focus first error field
        const firstErrorId = fieldIds.find((id) => validation.errors[id]);
        if (firstErrorId) {
          focusField(firstErrorId);
        }
      }

      return validation;
    },
    [validateAll, values, fieldIds, focusField],
  );

  const reset = useCallback((newValues = {}) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
  }, []);

  const setMultipleValues = useCallback((newValues) => {
    setValues((prev) => ({ ...prev, ...newValues }));
  }, []);

  return {
    values,
    errors,
    touched,

    setValue,
    setMultipleValues,
    validateField,
    validateAndNext,
    moveToPrevious,
    moveToNext,
    focusField,

    validateAll,
    handleSubmit,
    reset,

    fieldIds, // Only fields with type (for validation)
    allIds, // All items with id (for navigation including custom elements)
    fieldMap,
  };
}
