import { string } from "zod";

export function generateRandomDecimal(min: number, max: number): number {
  if (min >= max) {
    throw new Error("Minimum value must be less than maximum value.");
  }

  const randomNumber = Math.random() * (max - min) + min;

  return Math.round(randomNumber * 10) / 10;
}

export function formatIdToLabel(id: string) {
  return id.replace(/[-_]/g, " ");
}
