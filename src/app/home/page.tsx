"use client";

import Form, { Row } from "@/components/app/Form";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import { getFakerValue } from "@/lib/faker";
import { validateRows } from "@/utils/validation";
import { JsonEditor } from "json-edit-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const steps = [
  {
    number: 1,
    title: "Define Your Data Structure 🛠️",
    description:
      "Specify the columns, data types, and the number of rows you need. This step helps shape your dataset to match real-world scenarios.",
  },
  {
    number: 2,
    title: "Preview & Export 📊",
    description: `Review your mock data before exporting!
      You can download it in CSV or JSON format for easy use. 🚀`,
  },
];

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Row[]>([
    {
      id: uuidv4(),
      name: "",
      type: "",
    },
  ]);
  const [json, setJson] = useState([]);

  const generateData = () => {
    const data: any = [];
    const invalidRows = validateRows(formData);
    if (invalidRows.length === 0) {
      Array.from({ length: 1000 }, (_, i) => {
        let obj = {};
        formData?.forEach((item) => {
          obj = {
            ...obj,
            [item.name]: getFakerValue(item.type),
          };
        });
        data.push(obj);
      });
      setCurrentStep(1);
      setJson(data);
    }
  };

  return (
    <main className="h-full bg-neutral-90">
      <div className="bg-primary-100 py-8 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="font-primary bg-neutral-100 rounded-full text-font-primary-100 h-[32px] w-[32px] flex items-center justify-center text-center">
              {steps[currentStep].number}
            </div>
            <div className="flex flex-col">
              <div className="font-primary text-font-secondary-100">
                {steps[currentStep].title}
              </div>
              <div className="font-primary text-font-secondary-90 max-w-xl">
                {steps[currentStep].description}
              </div>
            </div>
          </div>
          <>
            {currentStep === 0 ? (
              <Button
                className="bg-neutral-90 text-font-primary-100 px-16 py-2"
                onClick={generateData}
              >
                Generate Data
              </Button>
            ) : (
              <Button
                className="bg-neutral-90 text-font-primary-100 px-16 py-2"
                onClick={() => {
                  setCurrentStep(0);
                }}
              >
                Go Back
              </Button>
            )}
          </>
        </div>
      </div>
      <div className="p-4">
        <div className="rounded-lg border border-border p-4 bg-neutral-100">
          {currentStep === 0 && (
            <Form
              data={formData}
              setData={(data) => {
                setFormData(data);
              }}
            />
          )}
          {currentStep === 1 && (
            <JsonEditor
              showArrayIndices
              data={json}
              rootName="data"
              collapse={2}
              collapseAnimationTime={300}
              indent={4}
              enableClipboard={false}
              restrictAdd
              restrictDrag
              restrictEdit
              restrictDelete
              theme={{
                styles: {
                  container: {
                    backgroundColor: "white",
                  },
                },
              }}
              rootFontSize={15}
            />
          )}
        </div>
      </div>
    </main>
  );
}
