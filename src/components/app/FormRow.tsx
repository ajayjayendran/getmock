import React, { useEffect, useState } from "react";
import TextField from "../ui/TextField";
import FakerSelect from "./FakerSelect";
import { Row } from "./Form";

interface IFakerRow {
  key: number;
  row: Row;
  updateRow: (row: Row) => void;
  removeRow?: (id: number) => void;
}

const FormRow: React.FC<IFakerRow> = ({ ...props }) => {
  const [row, setRow] = useState<Row>(props.row);

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
  }, [props.row]);

  return (
    <div className="grid grid-cols-2 gap-2">
      <TextField
        placeholder="Mock Input Field Name"
        value={row?.name ?? ""}
        onChange={(event) => {
          onChange("name", event.target.value);
        }}
      />
      <FakerSelect
        value={row?.type as string}
        onFakerSelect={(value) => {
          onChange("type", value);
        }}
      />
    </div>
  );
};

export default FormRow;
