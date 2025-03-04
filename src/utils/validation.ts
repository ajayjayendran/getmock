export const validateRows = (
  rows: { id: string; name: string; type: string }[]
): { id: string; name: string; type: string }[] => {
  return rows.filter((row) => row.type.trim() && !row.name.trim());
};

export const allRowsEmpty = (
  rows: { id: string; name: string; type: string }[]
) => {
  return rows.every((row) => !row.name && !row.type);
};

export const getFormErrorMsg = (type: string, value: string) => {
  switch (type) {
    case "name":
      if (value === "") {
        return `Field name shouldn't be empty.`;
      }
      break;
    case "type":

    default:
      break;
  }
};
