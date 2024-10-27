import data from "@/assets/data.json";
import type { Form } from "@/types";

async function getForm() {
  return data as Form;
}

export { getForm };
