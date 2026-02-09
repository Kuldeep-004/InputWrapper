import React from "react";
import { createForm, FormRenderer } from "./components/form";

const basicInfoSchema = [
  {
    element: (
      <div className="col-span-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 mt-4">
          Basic Information
        </h2>
      </div>
    ),
  },
  {
    id: "name",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your name",
    required: { error: "Name is required" },
    minLength: 3,
    casing: "title",
    labelPosition: "top",
    autofocus: true,
  },
  {
    id: "email",
    type: "email",
    label: "Email Address",
    placeholder: "your@email.com",
    required: "Please enter your email",
    regex: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      error: "Please enter a valid email address",
    },
  },
  {
    id: "phone",
    type: "phone",
    label: "Phone Number",
    placeholder: "Enter phone number",
    required: true,
  },
];

const businessSchema = [
  {
    element: (
      <div className="col-span-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          Business Details
        </h2>
      </div>
    ),
  },
  {
    id: "gst",
    type: "gst",
    label: "GST Number",
    placeholder: "22AAAAA0000A1Z5",
    required: true,
    css: {
      input: "border-2 border-blue-300 focus:border-blue-500",
    },
  },
  {
    id: "pan",
    type: "pan",
    label: "PAN Number",
    placeholder: "ABCDE1234F",
    required: true,
    next: "revenue",
  },
];

const financialSchema = [
  {
    element: (
      <div className="col-span-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          Financial Information
        </h2>
      </div>
    ),
  },
  {
    id: "revenue",
    type: "currency",
    label: "Annual Revenue",
    placeholder: "0.00",
    required: true,
    min: 0,
    prev: "pan",
  },
  {
    id: "profitMargin",
    type: "percentage",
    label: "Profit Margin",
    placeholder: "0.00",
    required: false,
  },
  {
    id: "employees",
    type: "number",
    label: "Number of Employees",
    placeholder: "0",
    required: true,
    min: 1,
    max: 10000,
    positiveOnly: true,
  },
];

const additionalSchema = [
  {
    element: (
      <div className="col-span-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          Additional Information
        </h2>
      </div>
    ),
  },
  {
    id: "website",
    type: "text",
    label: "Website",
    placeholder: "https://example.com",
    required: false,
  },
  {
    id: "notes",
    type: "text",
    label: "Notes",
    placeholder: "Any additional notes...",
    required: false,
  },
];

const App = () => {
  const [submittedData, setSubmittedData] = React.useState(null);

  const formMethods = createForm({
    schema: [
      ...basicInfoSchema,
      ...businessSchema,
      ...financialSchema,
      ...additionalSchema,
      {
        id: "birthdate",
        type: "text",
        required: true,
      },
    ],
    theme: {},
    initialValues: {
      name: "",
      birthdate: "",
    },
  });
console.log(formMethods)
  const handleSubmit = (e) => {
    e.preventDefault();
    formMethods.handleSubmit((values) => {
      setSubmittedData(values);
    });
  };

  const handleReset = () => {
    formMethods.reset();
    setSubmittedData(null);
  };

  const handleFillSample = () => {
    formMethods.setValue({
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "9876543210",
    });
  };

  const handleResetWithDefaults = () => {
    formMethods.reset({
      name: "Default User",
      email: "default@example.com",
    });
    setSubmittedData(null);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Form Management System
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-6"
        >
          <FormRenderer formMethods={formMethods} schema={basicInfoSchema} />

          <div className="my-6 p-5 bg-slate-50 border border-slate-200 rounded-lg">
            <h3 className="text-base font-semibold text-slate-700 mb-3">
              Custom Date Input
            </h3>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Birth Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formMethods.watch("birthdate") || ""}
                onChange={(e) => {
                  formMethods.setValue("birthdate", e.target.value);
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              
            </div>
          </div>

          <FormRenderer formMethods={formMethods} schema={businessSchema} />
          <FormRenderer formMethods={formMethods} schema={financialSchema} />
          <FormRenderer formMethods={formMethods} schema={additionalSchema} />

          <div className="flex gap-3 justify-end pt-6 border-t border-slate-200 mt-8">
            <button
              type="button"
              onClick={handleFillSample}
              className="px-6 py-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors font-medium"
            >
              Fill Sample Data
            </button>
            <button
              type="button"
              onClick={handleResetWithDefaults}
              className="px-6 py-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors font-medium"
            >
              Reset with Defaults
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors font-medium"
            >
              Reset Form
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
            >
              Submit
            </button>
          </div>
        </form>

        {submittedData && (
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Form Submitted Successfully
            </h3>
            <pre className="bg-slate-50 p-4 rounded border border-slate-200 overflow-auto text-sm text-slate-700">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
