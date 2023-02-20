

export function combineClasses(...classNames: ReadonlyArray<string | undefined>): string {
  return classNames.filter((v) => v).join(" ");
}
