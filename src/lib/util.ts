

export function assertNever(x: never): never {
  throw new Error(`Expected never: ${x}`);
}
