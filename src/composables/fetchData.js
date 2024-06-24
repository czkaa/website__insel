import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';

export function fetchData(sheetID, gids) {
  const data = ref([]);
  let intervalId = null;
  let interval = 30;

  // Fetch data from a single sheet using its GID
  const fetchGoogleSheetData = async (gid) => {
    const url = `https://spreadsheets.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&tq&gid=${gid}`;
    try {
      const res = await axios.get(url);
      const jsonData = JSON.parse(res.data.substring(47).slice(0, -2)); // Parsing the response
      const rows = jsonData.table.rows.map((row) =>
        row.c.map((cell) => (cell ? cell.v : null))
      );
      return rows;
    } catch (error) {
      console.error(`Error fetching data for gid ${gid}:`, error);
      return [];
    }
  };

  // Fetch data from all sheets
  const fetchDataFromAllTabs = async () => {
    console.log('FETCHING');
    try {
      const allData = await Promise.all(
        gids.map((gid) => fetchGoogleSheetData(gid))
      );
      data.value = allData;
      console.log('DATA', data.value);
    } catch (error) {
      console.error('Error fetching data from all tabs:', error);
    }
  };

  const startPolling = () => {
    intervalId = setInterval(async () => {
      await fetchDataFromAllTabs();
      // Here you can add logic to check if data has changed and react accordingly
    }, interval * 1000);
  };

  const stopPolling = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  onMounted(() => {
    fetchDataFromAllTabs();
    startPolling();
  });

  onUnmounted(() => {
    stopPolling();
  });

  return { data, fetchData: fetchDataFromAllTabs };
}
