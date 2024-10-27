<script setup lang="ts">
import { computed } from "vue";

import type { Control } from "@/types";

const props = defineProps<{
  control: Control;
}>();

const type = computed((): "button" | "submit" | "reset" => {
  if (props.control.type !== "submit" && props.control.type !== "reset")
    return "button";
  return props.control.type;
});
</script>
<template>
  <button :type="type" :id="control.id" class="button">
    {{ control.caption }}
  </button>
</template>

<style scoped>
.button {
  padding: 12px;
}
</style>
