import { faker } from "@faker-js/faker";

export const getFakerValue = (path: string): unknown => {
  const value = path
    .split(".")
    .reduce(
      (obj: Record<string, any> | undefined, key: string) => obj?.[key],
      faker
    );
  return typeof value === "function" ? value() : value;
};
