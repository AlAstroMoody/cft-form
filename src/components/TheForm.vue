<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

import type { Form } from "@/types";
import TheInput from "@/components/TheInput.vue";
import TheButton from "@/components/TheButton.vue";

const props = defineProps<{
  data: Form;
}>();

const formControls = computed(() => {
  if (!props.data.controls) return [];
  const controls = props.data.controls.filter(
    (item) => item.control !== "FORM"
  );
  return controls.toSorted((a, b) => (a.position > b.position ? 1 : -1));
});

const inputControls = computed(() => {
  return formControls.value.filter((item) => item.control === "TEXT");
});

const form = computed(() =>
  props.data.controls.find((item) => item.control === "FORM")
);

function setLSData(key: string, value: string) {
  localStorage.setItem(key, value);
}

function submitForm() {
  if (validate()) {
    hasError.value = false;
    console.log("send data to: ", props.data.submitUrl, inputs.value);
  } else {
    hasError.value = true;
  }
}

function validate() {
  for (const key of Object.keys(inputs.value)) {
    if (
      !inputs.value[key] &&
      inputControls.value.find((item) => item.id === key)?.required
    )
      return false;
  }
  return true;
}

function resetForm() {
  for (const key of Object.keys(inputs.value)) {
    inputs.value[key] = "";
    localStorage.removeItem(key);
  }
}

const inputs = ref<Record<string, string>>({});
const hasError = ref(false);

function initForm() {
  inputs.value = inputControls.value.reduce(
    (acc: Record<string, string>, item) => {
      acc[item.id] = localStorage.getItem(item.id) || "";
      return acc;
    },
    {}
  );
}

onMounted(() => initForm());
onBeforeUnmount(() => resetForm());
</script>
<template>
  <div>
    <form @submit.prevent="submitForm" :tabindex="form?.tabIndex || 0">
      <div class="form-title">{{ data.title }}</div>
      <div v-for="item in formControls" :key="item.id" class="form-control">
        <label v-if="item.control === 'LABEL'" :for="item.parentID">
          {{ item.caption }}
        </label>

        <TheInput
          v-if="item.control === 'TEXT' && inputs[item.id] !== undefined"
          :control="item"
          v-model="inputs[item.id]"
          @input="setLSData(item.id, $event)"
          :hasError="hasError && !!item.required && !inputs[item.id]"
        />

        <TheButton
          v-if="item.control === 'BUTTON'"
          :control="item"
          @click.native="item.type === 'reset' ? resetForm() : submitForm()"
        />
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-title {
  text-align: center;
  margin-bottom: 16px;
  font-size: 24px;
}

.form-control {
  margin-bottom: 8px;
}
</style>
