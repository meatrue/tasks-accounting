import { SelectOption } from "../types";

export function getOptionItemsFromObject(optionsObject: {
  [key: string]: string;
}): SelectOption[] {
  return Object.entries(optionsObject).map(([value, label]) => ({
    value,
    label,
  }));
}

export function getSelectedOption(
  options: SelectOption[],
  selectedValue: string
): SelectOption | undefined {
  return options.find(({ value }) => value === selectedValue);
}

export function getSelectedOptions(
  options: SelectOption[],
  selectedValues: string[]
): SelectOption[] | undefined {
  return options.filter(({ value }) =>
    selectedValues.some((selectedValue) => value === selectedValue)
  );
}
