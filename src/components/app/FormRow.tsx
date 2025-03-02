import React, { useEffect, useState } from "react";
import TextField from "../ui/TextField";
import FakerSelect from "./FakerSelect";
import { Row } from "./Form";
import Button from "../ui/Button";
import DeleteIcon from "../../../public/icons/delete.svg";
import Image from "next/image";

interface IFakerRow {
  row: Row;
  updateRow: (row: Row) => void;
  removeRow: (id: string) => void;
  enableDelete: boolean;
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
    <div className="grid grid-cols-3 gap-2">
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
      <Button
        disabled={!props.enableDelete}
        onClick={() => props.removeRow(row.id)}
        className={`flex gap-4 text-tertiary-100 bg-neutral-100 border border-border w-max px-10 py-2 font-bold ${
          props.enableDelete ? "hover:border-tertiary-100" : "hover:border-none"
        }"`}
      >
        <Image src={DeleteIcon} alt="" />
        Delete Row
      </Button>
    </div>
  );
};

export default FormRow;
