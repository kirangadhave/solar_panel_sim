const unicodeSuperscriptNumbers = [
  "\u2070",
  "\u00B9",
  "\u00B2",
  "\u00B3",
  "\u2074",
  "\u2075",
  "\u2076",
  "\u2077",
  "\u2078",
  "\u2079",
];

export function superscriptNumber(number: number): string {
  return number
    .toString()
    .split("")
    .map((digit) => unicodeSuperscriptNumbers[parseInt(digit)])
    .join("");
}
