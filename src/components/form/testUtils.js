
export function validateSchema(schema) {
  const errors = [];
  const warnings = [];
  const ids = new Set();

  schema.forEach((item, index) => {
    if (item.element) {
      return;
    }

    if (!item.id) {
      errors.push(`Field at index ${index}: Missing 'id' property`);
      return;
    }

    if (!item.type) {
      errors.push(`Field '${item.id}': Missing 'type' property`);
    }

    if (ids.has(item.id)) {
      errors.push(`Duplicate field ID: '${item.id}'`);
    }
    ids.add(item.id);

    if (item.next && !schema.find((f) => f.id === item.next)) {
      warnings.push(
        `Field '${item.id}': 'next' references non-existent field '${item.next}'`,
      );
    }

    if (item.prev && !schema.find((f) => f.id === item.prev)) {
      warnings.push(
        `Field '${item.id}': 'prev' references non-existent field '${item.prev}'`,
      );
    }

    const validTypes = [
      "text",
      "number",
      "percentage",
      "gst",
      "pan",
      "email",
      "phone",
      "currency",
      "alphanumeric",
    ];
    if (item.type && !validTypes.includes(item.type)) {
      warnings.push(`Field '${item.id}': Unknown type '${item.type}'`);
    }

    if (item.type === "number" || item.type === "percentage") {
      if (
        item.min !== undefined &&
        item.max !== undefined &&
        item.min > item.max
      ) {
        errors.push(
          `Field '${item.id}': 'min' (${item.min}) is greater than 'max' (${item.max})`,
        );
      }
    }

      if (
        item.minLength !== undefined &&
        item.maxLength !== undefined &&
        item.minLength > item.maxLength
      ) {
        errors.push(
          `Field '${item.id}': 'minLength' is greater than 'maxLength'`,
        );
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    summary: {
      totalFields: ids.size,
      totalElements: schema.filter((s) => s.element).length,
      totalItems: schema.length,
    },
  };
}

export function generateNavigationMap(schema) {
  const map = {};
  const fieldIds = schema.filter((f) => f.id && f.type).map((f) => f.id);

  fieldIds.forEach((id, index) => {
    const field = schema.find((f) => f.id === id);

    map[id] = {
      index,
      next: field.next || fieldIds[index + 1] || null,
      prev: field.prev || fieldIds[index - 1] || null,
      hasManualNav: !!(field.next || field.prev),
    };
  });

  return map;
}

export function debugFormState(form, label = "Form State") {
  console.group(`🔍 ${label}`);

  console.log("📊 Values:", form.values);
  console.log("❌ Errors:", form.errors);
  console.log("👆 Touched:", form.touched);
  console.log("🔑 Field IDs:", form.fieldIds);

  console.groupEnd();
}

export function testNavigationFlow(schema) {
  const navMap = generateNavigationMap(schema);

  console.group("⌨️ Navigation Flow Test");

  Object.keys(navMap).forEach((id) => {
    const nav = navMap[id];
    console.log(
      `${id} → Enter: ${nav.next || "END"} | Shift+Tab: ${nav.prev || "START"}`,
      nav.hasManualNav ? "(Manual)" : "(Auto)",
    );
  });

  console.groupEnd();

  return navMap;
}

export function getSchemaStats(schema) {
  const stats = {
    totalItems: schema.length,
    totalFields: 0,
    totalElements: 0,
    fieldsByType: {},
    requiredFields: 0,
    fieldsWithManualNav: 0,
    fieldsWithCustomCSS: 0,
  };

  schema.forEach((item) => {
    if (item.element) {
      stats.totalElements++;
    } else if (item.id) {
      stats.totalFields++;

      if (item.type) {
        stats.fieldsByType[item.type] =
          (stats.fieldsByType[item.type] || 0) + 1;
      }

      if (item.required) {
        stats.requiredFields++;
      }

      if (item.next || item.prev) {
        stats.fieldsWithManualNav++;
      }

      if (item.css || item.className) {
        stats.fieldsWithCustomCSS++;
      }
    }
  });

  return stats;
}

export function testValidations(schema) {
  console.group("✅ Validation Test");

  const results = [];

  schema.forEach((field) => {
    if (!field.id || !field.type) return;

    const testCases = {
      empty: "",
      valid: getValidSampleValue(field),
      invalid: getInvalidSampleValue(field),
    };

    console.log(`\nTesting field: ${field.id} (${field.type})`);
    console.log("Test cases:", testCases);

    results.push({
      fieldId: field.id,
      type: field.type,
      testCases,
    });
  });

  console.groupEnd();

  return results;
}

function getValidSampleValue(field) {
  const samples = {
    text: "Valid Text",
    number: "123",
    percentage: "50",
    gst: "22AAAAA0000A1Z5",
    pan: "ABCDE1234F",
    email: "test@example.com",
    phone: "9876543210",
    currency: "1000.00",
    alphanumeric: "ABC123",
  };

  return samples[field.type] || "value";
}

function getInvalidSampleValue(field) {
  const samples = {
    text: field.maxLength ? "x".repeat(field.maxLength + 1) : "ab",
    number: "not-a-number",
    percentage: "150",
    gst: "INVALID",
    pan: "INVALID",
    email: "invalid-email",
    phone: "abc",
    currency: "not-money",
    alphanumeric: "ABC@123",
  };

  return samples[field.type] || "";
}

export function exportFormData(values, filename = "form-data.json") {
  const dataStr = JSON.stringify(values, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}

export function printFormSummary(schema, form) {
  console.group("📋 Form Summary");

  const stats = getSchemaStats(schema);
  console.log("Statistics:", stats);

  const validation = validateSchema(schema);
  if (!validation.isValid) {
    console.error("Schema Errors:", validation.errors);
  }
  if (validation.warnings.length > 0) {
    console.warn("Schema Warnings:", validation.warnings);
  }

  if (form) {
    console.log("\nCurrent State:");
    console.log(
      "- Filled fields:",
      Object.keys(form.values).filter((k) => form.values[k]).length,
    );
    console.log(
      "- Fields with errors:",
      Object.keys(form.errors).filter((k) => form.errors[k]).length,
    );
    console.log(
      "- Touched fields:",
      Object.keys(form.touched).filter((k) => form.touched[k]).length,
    );
  }

  console.groupEnd();
}

export function simulateEnterKey(fieldId) {
  const element = document.getElementById(fieldId);
  if (element) {
    const event = new KeyboardEvent("keydown", { key: "Enter", bubbles: true });
    element.dispatchEvent(event);
    console.log(`✅ Simulated Enter on: ${fieldId}`);
  } else {
    console.error(`❌ Field not found: ${fieldId}`);
  }
}

export function autoFillForm(schema, form) {
  const values = {};

  schema.forEach((field) => {
    if (field.id && field.type) {
      values[field.id] = getValidSampleValue(field);
    }
  });

  // Set all values
  Object.keys(values).forEach((id) => {
    form.setValue(id, values[id]);
  });

  console.log("✅ Form auto-filled with sample data");

  return values;
}
