export function validateCounter(input: string): boolean {
  if (!input || isNaN(parseInt(input))) {
    return false;
  }
  if (parseInt(input) < 1 || parseInt(input) > 100) {
    return false;
  }
  return true;
}
