<script setup></script>

<template>
  <div>
    <h2>PlanYourRoute</h2>
  </div>

  <div>
    <router-link :to="{ name: 'createNewRoute' }">Create New Route</router-link>
  </div>
  <div>
    <router-link :to="{ name: 'planWithAi' }"
      >Planning Route With AI</router-link
    >
  </div>
  <div>
    <router-link :to="{ name: 'findAnotherRoute' }"
      >Find Another Route</router-link
    >
  </div>
</template>

<style scoped></style>
