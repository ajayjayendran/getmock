export const validateRows = (
  rows: { id: string; name: string; type: string }[]
): { id: string; name: string; type: string }[] => {
  return rows.filter((row) => row.type.trim() && !row.name.trim());
};
