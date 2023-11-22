<script setup>
import { ref, computed, onMounted,watch, defineProps, defineEmits } from "vue";
import { routeStore } from "@/stores/route";
import { useRoute, useRouter, RouterLink } from "vue-router";

const props = defineProps(['like']);
const emit = defineEmits();
const store = routeStore();
const route = useRoute();
const localLike = ref(props.like);

const clickDisLike = async() => {
    await store.disLike(route.params.id);
    localLike.value = false;
    emit('updateLike', localLike.value);
}

const clickLike = async() => {
    await store.like(route.params.id);
    localLike.value = true;
    emit('updateLike', localLike.value);
}

watch(() => props.like, (newLike) => {
  localLike.value = newLike;
});

</script>

<template>
    
    <div>
    <font-awesome-icon :icon="['fas', 'heart']" class="fas fa-camera fa-lg" v-if="localLike" @click="clickDisLike"/>
    <font-awesome-icon :icon="['far', 'heart']" class="fas fa-camera fa-lg" v-else @click="clickLike"/>
    </div>
</template>

<style scoped></style>

