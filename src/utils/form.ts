type Rows = { id: string; name: string; type: string };

export const scrollToLastRow = (rows: Rows[]) => {
  if (rows.length > 0) {
    const lastRowId = rows[rows.length - 1].id;
    document
      .getElementById(lastRowId)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

export const scrollToFirstRow = (rows: Rows[]) => {
  if (rows.length > 0) {
    const firstRow = rows[0].id;
    document
      .getElementById(firstRow)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};
