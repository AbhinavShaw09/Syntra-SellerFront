export function generateCopyName(
  originalName: string,
  existingNames: string[]
): string {
  const baseName = originalName.replace(/\s+\(Copy(?:\s+\d+)?\)$/, "");
  let counter = 1;
  let newName = `${baseName} (Copy ${counter})`;

  while (existingNames.includes(newName)) {
    counter++;
    newName = `${baseName} (Copy ${counter})`;
  }

  return newName;
}