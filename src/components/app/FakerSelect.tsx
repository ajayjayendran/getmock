"use client";

import { FC, useEffect, useState } from "react";
import SearchableSelect, { Option } from "../ui/Select";
import { faker } from "@faker-js/faker";

interface IFakerSelect {
  value: string;
  onFakerSelect: (value: string) => void;
}

const FakerSelect: FC<IFakerSelect> = ({ ...props }) => {
  const [fakerOptions, setFakerOptions] = useState<Option[]>([]);

  const [selectedValue, setSelectedValue] = useState("");

  const fetchFakerOptions = () => {
    const fakerMethods: Option[] = [];

    Object.keys(faker).forEach((category) => {
      const subCategory = faker[category as keyof typeof faker];

      if (typeof subCategory === "object") {
        Object.keys(subCategory).forEach((method) => {
          if (
            typeof subCategory[method as keyof typeof subCategory] ===
            "function"
          ) {
            fakerMethods.push({
              value: `${category}.${method}`,
              label: `${category}.${method}`,
            });
          }
        });
      }
    });
    setFakerOptions(fakerMethods);
  };

  useEffect(() => {
    fetchFakerOptions();
  }, []);

  return (
    <SearchableSelect
      placeholder="Mock Input Field Type"
      value={props.value}
      options={fakerOptions}
      onChange={(value) => {
        props.onFakerSelect(value);
      }}
    />
  );
};

export default FakerSelect;
