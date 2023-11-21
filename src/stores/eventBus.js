// src/store/eventBus.js
import { defineStore } from 'pinia';

export const useEventBusStore = defineStore({
  id: 'eventBus',
  state: () => ({
    locations: [],
  }),
  actions: {
    updateMap(locations) {
      this.locations = locations;
    },
  },
});
