<script setup lang="ts">
import type { Control } from "@/types";

defineProps<{
  value: string;
  control: Control;
  hasError: boolean;
}>();

const emit = defineEmits(["input"]);

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement | null;
  if (target) emit("input", target.value);
};
</script>
<template>
  <input
    :id="control.id"
    :value="value"
    :placeholder="control.caption"
    :required="!!control.required"
    :type="control.type"
    @input="handleInput"
    class="input"
    :class="{ error: hasError }"
  />
</template>

<style scoped>
.input {
  padding: 12px;
}

.error {
  border: 2px solid red;
  border-radius: 4px;
}
</style>
