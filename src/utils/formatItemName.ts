export function formatItemName(input: string, isMobile: boolean): string {
  const limitLength = isMobile ? 17 : 32;
  const keepingLength = isMobile ? 15 : 30;
  if (input.length > limitLength) {
    return input.substring(0, keepingLength) + '...';
  } else {
    return input;
  }
}
