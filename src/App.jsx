import React from "react";
import { createForm, FormRenderer } from "./components/form";

const formSchema = [
  {
    element: (
      <div className="col-span-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 mt-4">
          Indian Documents
        </h2>
      </div>
    ),
  },
  {
    id: "pan",
    type: "pan",
    label: "PAN Number",
    placeholder: "ABCDE1234F",
    required: true,
  },
  {
    id: "tan",
    type: "tan",
    label: "TAN Number",
    placeholder: "ABCD12345E",
    required: true,
  },
  {
    id: "gst",
    type: "gst",
    label: "GST Number",
    placeholder: "22AAAAA0000A1Z5",
    required: true,
  },
  {
    id: "llp",
    type: "llp",
    label: "LLP Number",
    placeholder: "AAA-1234",
    required: true,
  },
  {
    id: "cin",
    type: "cin",
    label: "CIN Number",
    placeholder: "U12345AB1234ABC123456",
    required: true,
  },
  {
    id: "msme",
    type: "msme",
    label: "MSME Number",
    placeholder: "UDYAM-AB-12-1234567",
    required: true,
  },
  {
    id: "aadhaar",
    type: "aadhaar",
    label: "Aadhaar Number",
    placeholder: "123456789012",
    required: true,
  },
  {
    element: (
      <div className="col-span-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          Contact Information
        </h2>
      </div>
    ),
  },
  {
    id: "email",
    type: "email",
    label: "Email Address",
    placeholder: "email@example.com",
    required: true,
  },
  {
    id: "phone",
    type: "phone",
    label: "Phone Number",
    placeholder: "+91-1234567890",
    required: true,
  },
  {
    element: (
      <div className="col-span-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          Financial Details
        </h2>
      </div>
    ),
  },
  {
    id: "revenue",
    type: "currency",
    label: "Annual Revenue",
    placeholder: "0.00",
    required: false,
  },
  {
    id: "profitMargin",
    type: "percentage",
    label: "Profit Margin",
    placeholder: "0.00",
    required: false,
    precision: 2,
  },
  {
    id: "employees",
    type: "number",
    label: "Number of Employees",
    placeholder: "0",
    required: false,
    precision: 2,
  },
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
    id: "companyName",
    type: "text",
    label: "Company Name",
    placeholder: "Enter company name",
    required: false,
    casing: "title",
  },
  {
    id: "website",
    type: "text",
    label: "Website",
    placeholder: "https://example.com",
    required: false,
  },
];

export default function App() {
  const formMethods = createForm({
    schema: formSchema,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = formMethods.handleSubmit((values) => {
      alert("Form submitted successfully! Check console for values.");
    });

    if (!result.isValid) {
      console.log("Validation errors:", result.errors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Comprehensive Form
          </h1>
          <form onSubmit={handleSubmit}>
            <FormRenderer formMethods={formMethods} />
            <div className="mt-8 flex gap-4">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => formMethods.reset()}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
