import { useEffect, useState } from "react";
import TextField from "./TextField";

export interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: Option[] | [];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  maxWidth?: string;
  className?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  maxWidth = "w-full",
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setSearchTerm(value as string);
  }, [value]);

  return (
    <div className={`relative ${maxWidth}`}>
      {/* Search Input Field */}
      <TextField
        value={searchTerm}
        className={className}
        onChange={(e) => {
          if (e.target.value === "") {
            setIsOpen(false);
          } else {
            setIsOpen(true);
          }
          setSearchTerm(e.target.value);
        }}
        placeholder={placeholder}
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`rounded m-2 p-2 hover:bg-blue-100 text-gray-900 text-left font-primary cursor-pointer ${
                  value === option.value ? "bg-blue-200 font-bold" : ""
                }`}
                onClick={() => {
                  onChange && onChange(option.value);
                  setSearchTerm(option.label);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-900 text-left">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
