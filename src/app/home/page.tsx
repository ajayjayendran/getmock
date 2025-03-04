"use client";

import DataConfig from "@/components/app/DataConfig";
import { Row } from "@/components/app/Form";
import MockData from "@/components/app/MockData";
import Button from "@/components/ui/Button";
import { getFakerValue } from "@/lib/faker";
import { scrollToFirstRow } from "@/utils/form";
import { allRowsEmpty, validateRows } from "@/utils/validation";
import { Undo2, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

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

  const [json, setJson] = useState([]);
  const [rowCount, setRowCount] = useState(10);
  const [invalidRows, setInvalidRows] = useState<Row[]>();

  const initialRows = useMemo(
    () => [
      {
        id: crypto.randomUUID(), // Stable ID before rendering
        name: "",
        type: "",
      },
    ],
    []
  );

  const [formData, setFormData] = useState<Row[]>(initialRows);

  const generateData = () => {
    const data: any = [];
    const errorRows = validateRows(formData);
    setInvalidRows(errorRows);
    console.log(errorRows);
    if (errorRows.length === 0 && !allRowsEmpty(formData)) {
      setInvalidRows([]);

      const count = rowCount < 100 ? (rowCount > 0 ? rowCount : 10) : 100;
      Array.from({ length: count }, (_, i) => {
        let obj = {};
        formData?.forEach((item) => {
          obj = {
            ...obj,
            [item.name]: getFakerValue(item.type),
          };
        });
        data.push(obj);
      });
      toast.success(
        <div className="font-primary text-sm">
          Data generated successfully! You can now proceed with the next step.
        </div>
      );
      setCurrentStep(1);
      setJson(data);
    } else if (errorRows.length > 0) {
      toast.error(
        <div className="font-primary text-sm">
          There are errors in your input. Please check the highlighted rows and
          correct them before proceeding.
        </div>
      );
      setTimeout(() => {
        scrollToFirstRow(errorRows);
      }, 100);
    } else if (allRowsEmpty(formData)) {
      toast.warning(
        <div className="font-primary text-sm">
          Please fill in at least one row before proceeding.
        </div>
      );
    }
  };

  return (
    <main className="h-max md:h-full bg-neutral-90">
      <div className="bg-primary-100 py-5 px-4">
        <div className="flex items-center justify-between flex-wrap md:flex-nowrap gap-2">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 font-primary bg-neutral-90 rounded-full text-font-primary-100 h-[32px] w-[32px] flex items-center justify-center text-center">
              {steps[currentStep].number}
            </div>
            <div className="flex flex-col">
              <div className="font-primary text-font-secondary-100 font-semibold">
                {steps[currentStep].title}
              </div>
              <div className="font-primary text-font-secondary-90 max-w-xl">
                {steps[currentStep].description}
              </div>
            </div>
          </div>

          {currentStep === 0 ? (
            <Button
              className="bg-neutral-90 text-font-primary-100 px-16 py-2 flex gap-2 items-center w-full md:w-max justify-center"
              onClick={generateData}
            >
              <Zap size={18} /> Generate Data
            </Button>
          ) : (
            <Button
              className="bg-neutral-90 text-font-primary-100 px-16 py-2 flex gap-2 items-center w-full md:w-max justify-center"
              onClick={() => {
                setCurrentStep(0);
              }}
            >
              <Undo2 size={18} />
              Go Back
            </Button>
          )}
        </div>
      </div>
      <div className="p-4">
        {currentStep === 0 && (
          <DataConfig
            setRowCount={(value: number) => {
              setRowCount(value);
            }}
            invalidRow={invalidRows as Row[]}
            rowCount={rowCount}
            formData={formData}
            setFormData={(data) => {
              setFormData(data);
            }}
          />
        )}
        {currentStep === 1 && <MockData json={json} />}
      </div>
    </main>
  );
}
