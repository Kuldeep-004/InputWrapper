import { useEffect, useState } from "react";
import { createForm, FormRenderer } from "./components/form";

const formSchema = [
  {
    element: (
      <div className="col-span-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 mt-4">
          Documents
        </h2>
      </div>
    ),
  },
  {
    id: "pan",
    type: "pan",
    label: "PAN Number",
    autoFocus: true,
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
    min: 10,
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
  {
    element: (
      <div className="col-span-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 mt-6">
          Terms & Conditions
        </h2>
      </div>
    ),
  },
  {
    id: "agreeToTerms",
    type: "checkbox",
    labelPosition: "left",
    label: "I agree to the terms and conditions",
    required: false,
  },
  {
    id: "subscribeNewsletter",
    type: "checkbox",
    label: "Subscribe to newsletter",
    required: false,
    next: "submitBtn",
  },
];

export default function App() {
  const [dynamicSchema, setDynamicSchema] = useState(formSchema);
  const formMethods = createForm({
    schema: dynamicSchema,
  });

  const pan=formMethods.watch("pan");

  useEffect(()=>{
    if(pan?.length>4){
      setDynamicSchema((prev)=>
        prev.map((p)=>({...p,required:false}))
      )
    }
  },[pan])

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = formMethods.handleSubmit(() => {
      alert("Form submitted successfully! Check console for values.");
    });

    if (!result.isValid) {
      console.log("Validation errors:", result.errors);
    }
  };

  return (
    <div className="min-h-screen bg-gray-600 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-500 rounded-lg shadow-lg p-8">
          <FormRenderer formMethods={formMethods} />
          <div className="mt-8 flex gap-4 flex-wrap">
            <button
              id="submitBtn"
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
            <button
              type="button"
              onClick={() =>
                formMethods.setErrors({
                  pan: "Custom error for PAN",
                  email: "Custom error for Email",
                  tan: "Custom Error For Tan",
                })
              }
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Set Errors
            </button>
            <button
              type="button"
              onClick={() => formMethods.clearErrors()}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Clear All Errors
            </button>
            <button
              type="button"
              onClick={() => formMethods.clearErrors(["pan"])}
              className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Clear PAN Error
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
