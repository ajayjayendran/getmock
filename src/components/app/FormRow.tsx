import React, { useEffect, useState } from "react";
import TextField from "../ui/TextField";
import FakerSelect from "./FakerSelect";
import { Row } from "./Form";
import Button from "../ui/Button";
import DeleteIcon from "../../../public/icons/delete.svg";
import Image from "next/image";
import { getFormErrorMsg } from "@/utils/validation";
import { Grid2x2X } from "lucide-react";

interface IFakerRow {
  row: Row;
  error: Row;
  updateRow: (row: Row) => void;
  removeRow: (id: string) => void;
  enableDelete: boolean;
}

const FormRow: React.FC<IFakerRow> = ({ ...props }) => {
  const [row, setRow] = useState<Row>(props.row);
  const [error, setError] = useState<Row>(props.error);

  const onChange = (key: string, value: string) => {
    const latest = {
      ...row,
      id: row?.id ?? 1,
      name: row?.name ?? "",
      type: row?.type ?? "",
      [key]: value,
    };
    setRow(latest);
    props.updateRow(latest);
  };

  useEffect(() => {
    setRow(props.row);
    setError(props.error);
  }, [props.row, props.error]);

  return (
    <div
      id={row.id}
      className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-2 border md:border-none p-4 md:p-0 rounded-lg"
    >
      <div className="col-span-2">
        <TextField
          placeholder="Mock Input Field Name"
          value={row?.name ?? ""}
          error={getFormErrorMsg("name", error?.name)}
          onChange={(event) => {
            onChange("name", event.target.value);
          }}
        />
      </div>
      <div className="col-span-2 py-3 md:py-0">
        <FakerSelect
          value={row?.type as string}
          onFakerSelect={(value) => {
            onChange("type", value);
          }}
        />
      </div>
      <Button
        disabled={!props.enableDelete}
        onClick={() => props.removeRow(row.id)}
        className={`cursor-pointer col-span-1 flex items-center justify-center gap-2 text-tertiary-100 bg-neutral-100 border border-border w-full md:w-max h-max px-8 py-2 font-bold ${
          props.enableDelete ? "hover:border-tertiary-100" : "hover:border-none"
        }"`}
      >
        <Grid2x2X size={20} className="cursor-pointer" />
        Delete Row
      </Button>
    </div>
  );
};

export default FormRow;
