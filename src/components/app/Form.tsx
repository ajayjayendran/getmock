"use client";

import { FC, useEffect, useMemo, useState } from "react";
import FormRow from "./FormRow";
import Button from "../ui/Button";

export type Row = {
  id: string;
  name: string;
  type: string;
};

interface IForm {
  data: Row[];
  invalidRow: Row[];
  setData: (data: Row[]) => void;
}

const Form: FC<IForm> = ({ ...props }) => {
  const [rows, setRows] = useState<Row[]>([]);

  const onRowChange = (rows: Row[]) => {
    props.setData(rows);
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
      <div className="hidden md:grid grid-cols-5 gap-2">
        <div className="font-primary col-span-2 text-font-primary-100">
          Field Name
          <div className="font-primary text-font-primary-90">
            Column title (e.g., User Name, Email).
          </div>
        </div>
        <div className="font-primary col-span-2 text-font-primary-100">
          Field Type
          <div className="font-primary text-font-primary-90">
            Data type (e.g., City, Car, Person Name).
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {rows &&
          rows.map((row) => {
            const error = props?.invalidRow?.find((item) => item.id === row.id);
            return (
              <FormRow
                key={row.id}
                row={row}
                error={error as Row}
                enableDelete={rows.length > 1}
                updateRow={updateRow}
                removeRow={removeRow}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Form;
