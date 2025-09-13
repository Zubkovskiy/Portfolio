const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, '-');

export const getBaseId = (
  productId: string,
  currentColor: string,
  currentCapacity: string,
): string => {
  const parts = productId.split('-');
  const normalizedColorParts = normalize(currentColor).split('-');
  const normalizedCapacityParts = normalize(currentCapacity).split('-');

  const removeSequence = (arr: string[], sequence: string[]): string[] => {
    const result: string[] = [];

    for (let i = 0; i < arr.length; ) {
      const match = sequence.every((val, idx) => arr[i + idx] === val);

      if (match) {
        i += sequence.length;
      } else {
        result.push(arr[i]);
        i++;
      }
    }

    return result;
  };

  let cleaned = removeSequence(parts, normalizedColorParts);

  cleaned = removeSequence(cleaned, normalizedCapacityParts);

  return cleaned.join('-');
};
