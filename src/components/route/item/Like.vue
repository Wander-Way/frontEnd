<script setup>
import { ref, computed, onMounted, watch, defineProps, defineEmits } from "vue";
import { routeStore } from "@/stores/route";
import { useRoute, useRouter, RouterLink } from "vue-router";

const props = defineProps(["like", "routeId"]);

const emit = defineEmits();
const store = routeStore();
const localLike = ref(props.like);
const id = ref(props.routeId);

const clickDisLike = async () => {
  console.log(localLike.value);
  console.log(id.value);
  await store.disLike(id.value);
  localLike.value = false;
  emit("updateLike", localLike.value);
};

const clickLike = async () => {
  console.log(id.value);
  await store.like(id.value);
  localLike.value = true;
  emit("updateLike", localLike.value);
};

watch(
  () => props.like,
  (newLike) => {
    localLike.value = newLike;
  }
);

watch(
  () => props.routeId,
  (newId) => {
    id.value = newId;
  }
);
</script>

<template>
  <div>
    <font-awesome-icon
      :icon="['fas', 'heart']"
      class="fas fa-camera fa-lg"
      style="color: #ff5c5c"
      v-if="localLike"
      @click="clickDisLike()"
    />
    <font-awesome-icon
      :icon="['far', 'heart']"
      class="fas fa-camera fa-lg"
      v-else
      @click="clickLike()"
    />
  </div>
</template>

<style scoped></style>
