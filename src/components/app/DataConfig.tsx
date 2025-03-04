import { FC, useEffect, useMemo, useState } from "react";
import Form, { Row } from "./Form";
import Button from "../ui/Button";
import TextField from "../ui/TextField";
import { scrollToLastRow } from "@/utils/form";
import { Grid2x2Plus } from "lucide-react";

interface IDataConfig {
  setFormData: (data: Row[]) => void;
  formData: Row[];
  invalidRow: Row[];
  rowCount: number;
  setRowCount: (count: number) => void;
}

const DataConfig: FC<IDataConfig> = ({ ...props }) => {
  const [rows, setRows] = useState<Row[]>([]);

  const addRow = () => {
    const latest = [
      ...rows,
      {
        id: crypto.randomUUID() as string,
        name: "",
        type: "",
      },
    ];
    setRows(latest);
    setTimeout(() => scrollToLastRow(latest), 100);
  };

  useEffect(() => {
    setRows(props.formData);
  }, [props.formData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-2 h-full md:h-[calc(100vh-200px)] overflow-hidden">
      <div className="col-span-3 rounded-lg border border-border p-4 bg-neutral-100 h-full overflow-hidden">
        <div className="h-full overflow-y-auto pb-4">
          <Form
            data={rows}
            invalidRow={props.invalidRow}
            setData={(data) => {
              setRows(data);
              props.setFormData(data);
            }}
          />
        </div>
      </div>
      <div className="mt-2 md:mt-0 col-span-1 sticky rounded-lg border border-border p-4 bg-neutral-100 h-max flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="font-primary text-font-primary-100">
            Rows to Generate
          </div>
          <div className="font-primary text-font-primary-90">
            Set the number of rows for your JSON output ( Max. 100, Default. 10
            rows)
          </div>
          <TextField
            placeholder="Enter row count…"
            className="mt-2"
            type="number"
            min={0}
            value={props.rowCount || ""}
            onKeyDown={(event) => {
              if (event.key === "-" || event.key === "e") {
                event.preventDefault(); // Block negative signs and 'e'
              }
            }}
            onChange={(event) => {
              const value = event.target.value;

              if (/^\d*$/.test(value)) {
                props.setRowCount(value ? parseInt(value, 10) : 0);
              }
            }}
          />
        </div>
        <Button
          className="bg-primary-100 text-font-secondary-100 px-8 py-2 w-full flex items-center justify-center gap-2"
          onClick={addRow}
        >
          <Grid2x2Plus size={18} /> Add New Row
        </Button>
      </div>
    </div>
  );
};

export default DataConfig;
