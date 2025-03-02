"use client";

import { FC, useEffect, useState } from "react";
import FormRow from "./FormRow";
import Button from "../ui/Button";
import { v4 as uuidv4 } from "uuid";
import TextField from "../ui/TextField";

export type Row = {
  id: string;
  name: string;
  type: string;
};

interface IForm {
  data: Row[];
  setData: (data: Row[]) => void;
}

const Form: FC<IForm> = ({ ...props }) => {
  const [rows, setRows] = useState<Row[]>([
    {
      id: uuidv4(),
      name: "",
      type: "",
    },
  ]);

  const onRowChange = (rows: Row[]) => {
    props.setData(rows);
  };

  const addRow = () => {
    if ((rows && rows?.length) || 0 > 1) {
      console.log(rows[rows.length - 1]);
      const latest = [
        ...rows,
        {
          id: uuidv4(),
          name: "",
          type: "",
        },
      ];
      onRowChange(latest);
      setRows(latest);
    }
  };

  const removeRow = (id: string) => {
    if (rows?.length || 0 > 1) {
      const latest = rows?.filter((row) => row.id !== id);
      onRowChange(latest);
      setRows(latest);
    }
  };

  const updateRow = (updatedRow: Row) => {
    if (rows) {
      const latest = rows.map((row) => {
        return row.id === updatedRow.id ? updatedRow : row;
      });
      onRowChange(latest);
      setRows(latest);
    }
  };

  useEffect(() => {
    setRows(props.data);
  }, [props.data]);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 gap-2">
        <div className="font-primary">
          Field Name
          <div className="font-primary text-font-primary-90">
            Column title (e.g., User Name, Email).
          </div>
        </div>
        <div className="font-primary">
          Field Type
          <div className="font-primary text-font-primary-90">
            Data type (e.g., City, Car, Person Name).
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {rows &&
          rows.map((row) => (
            <FormRow
              key={row.id}
              row={row}
              enableDelete={rows.length > 1}
              updateRow={updateRow}
              removeRow={removeRow}
            />
          ))}
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4">
        <Button
          className="bg-white text-blue-500 border border-blue-500 px-8 py-2"
          onClick={addRow}
        >
          + Add Row
        </Button>
      </div>
    </div>
  );
};

export default Form;
