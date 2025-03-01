"use client";

import { useState } from "react";
import FormRow from "./FormRow";
import Button from "../ui/Button";
import { Faker, faker } from "@faker-js/faker";

export type Row = {
  id: number;
  name: string;
  type: string;
};

const Form = () => {
  const [rows, setRows] = useState<Row[]>([{ id: 1, name: "", type: "" }]);

  const addRow = () => {
    setRows([...rows, { id: Date.now(), name: "", type: "" }]);
  };

  const removeRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const updateRow = (updatedRow: Row) => {
    setRows((prevRows) =>
      prevRows.map((row) => {
        return row.id === updatedRow.id ? updatedRow : row;
      })
    );
  };

  const getFakerValue = (path: string): unknown => {
    const value = path
      .split(".")
      .reduce(
        (obj: Record<string, any> | undefined, key: string) => obj?.[key],
        faker
      );
    return typeof value === "function" ? value() : value;
  };

  console.log(getFakerValue("person.firstName"));

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2 ">
        {rows.map((row) => (
          <FormRow
            key={row.id}
            row={row}
            updateRow={updateRow}
            removeRow={removeRow}
          />
        ))}
      </div>
      <Button
        className="w-max mt-2 bg-white text-blue-500 border border-blue-500 px-8"
        onClick={addRow}
      >
        + Add Row
      </Button>
    </div>
  );
};

export default Form;
