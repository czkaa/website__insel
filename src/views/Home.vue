<template>
  <div class="w-full h-full bg-[blue]">
    <template v-for="(menu, index) in formattedData">
      <Menu
        v-if="menu.date === currentDay"
        :menu="menu"
        :previousMenu="index === 0 ? null : formattedData[index - 1]"
        :currentHour="currentHour"
      />
    </template>
  </div>
</template>

<script setup>
import { fetchData } from '@/composables/fetchData';
import { useFormatData } from '@/composables/useFormatData';
import { ref } from 'vue';

const sheetID = '1194qVYLq4mTBw8aYpa1FVPcoOCEAITadvDj1AmJ9ymc';
const gids = [
  '624618560',
  '553970252',
  '172840257',
  '882135157',
  '1701955262',
  '808410311',
  '1210408695',
  '1940313614',
  '793552378',
  '2136425957',
];

const { data } = fetchData(sheetID, gids);
const { formattedData } = useFormatData(data);

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = String(date.getFullYear());

  return `${day}.${month}.${year}`;
};

const currentDay = ref(formatDate(new Date()));
const currentHour = ref(new Date().getHours());

setInterval(() => {
  currentDay.value = formatDate(new Date());
  currentHour.value = new Date().getHours();
}, 1000);
</script>

<style></style>
