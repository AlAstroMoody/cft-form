<script setup lang="ts">
import { onMounted, ref } from "vue";

import { getForm } from "@/api/form";
import type { Form } from "@/types";
import TheForm from "@/components/TheForm.vue";

const data = ref<Form | null>(null);

onMounted(async () => {
  data.value = await getForm();
});
</script>

<template>
  <div id="app">
    <main>
      <TheForm :data="data" v-if="data" />
    </main>
  </div>
</template>
