import { computed } from 'vue';

export function useFormatData(data) {
  const formattedData = computed(() => {
    const result = {};

    data.value.forEach((sheetData) => {
      if (!sheetData || sheetData.length < 5) return; // Skip if not enough rows

      const date = sheetData[0][0]; // A1 contains the date
      if (!date) return; // Skip if date is not present

      const breakfast = {
        name: sheetData[2][1],
        course: 'frühstück!',
        allergies: sheetData[2][2],
      };

      const lunch = {
        name: sheetData[3][1],
        course: 'lunch',
        allergies: sheetData[3][2],
      };

      const dinner = {
        name: sheetData[4][1],
        course: 'abendessen',
        allergies: sheetData[4][2],
      };

      const supper = {
        name: sheetData[5][1],
        course: 'Nachtsuppe',
        allergies: sheetData[5][2],
      };

      result[date] = {
        date,
        breakfast,
        lunch,
        dinner,
        supper,
      };
    });

    return result;
  });

  return { formattedData };
}
