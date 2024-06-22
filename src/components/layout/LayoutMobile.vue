<template>
  <div layout-mobile class="w-full">
    <div v-if="!deviceOrientationDenied && !geolocationDenied && !isNext">
      You need to enable device orientation and location tracking to continue.
      Do so pressing the buttons beneath

      <BasicButton
        :class="[deviceOrientationPermission ? 'bg-primary' : 'bg-tertiary']"
        @click="requestDeviceOrientationPermission"
        text="Enable Device Orientation"
      />
      <p v-if="deviceOrientationDenied">
        error: device orientation permission denied
      </p>

      <BasicButton
        :class="[geolocationPermission ? 'bg-primary' : 'bg-tertiary']"
        @click="requestGeolocationPermission"
        text="Enable Geolocation"
      />
    </div>

    <div v-else-if="geolocationDenied || deviceOrientationDenied">
      You need to enable device orientation and location tracking to continue.
      Refesh the page and provide permission
    </div>

    <div v-if="deviceOrientationPermission && geolocationPermission && !isNext">
      <BasicButton class="bg-tertiary" @click="isNext = true" text="Enter" />
    </div>

    <template
      v-if="deviceOrientationPermission && geolocationPermission && isNext"
    >
      <UtilityPosition />
      <router-view class="w-full"> </router-view>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const deviceOrientationPermission = ref(false);
const geolocationPermission = ref(false);
const deviceOrientationDenied = ref(false);
const geolocationDenied = ref(false);
const isNext = ref(false);

const requestDeviceOrientationPermission = () => {
  if (
    'DeviceOrientationEvent' in window &&
    typeof DeviceOrientationEvent.requestPermission === 'function'
  ) {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === 'granted') {
          deviceOrientationPermission.value = true;
        } else {
          deviceOrientationDenied.value = true;
        }
      })
      .catch(() => {
        deviceOrientationDenied.value = true;
      });
  } else {
    deviceOrientationDenied.value = true;
  }
};

const requestGeolocationPermission = () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      () => {
        geolocationPermission.value = true;
      },
      () => {
        geolocationDenied.value = true;
      }
    );
  } else {
    geolocationDenied.value = true;
  }
};

onMounted(() => {
  // Check device orientation permission on mount
  if (
    'DeviceOrientationEvent' in window &&
    typeof DeviceOrientationEvent.requestPermission === 'function'
  ) {
    DeviceOrientationEvent.requestPermission().then((permissionState) => {
      if (permissionState === 'granted') {
        deviceOrientationPermission.value = true;
      }
    });
  }

  // Check geolocation permission on mount
  if ('geolocation' in navigator) {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then((permissionStatus) => {
        if (permissionStatus.state === 'granted') {
          geolocationPermission.value = true;
        }
      });
  }
});
</script>
