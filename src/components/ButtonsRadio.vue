<template>
  <v-col cols="3" sm="3" md="3">
    <v-radio-group v-model="style" hide-details @change="setStyle()">
      <v-radio value="bold" label="B"></v-radio>
      <v-radio value="italic" label="I"></v-radio>
      <v-radio value="underline" label="U"></v-radio>
    </v-radio-group>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ButtonsRadio extends Vue {
  style = "null";
  setStyle(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const id = this.$el.parentElement?.firstChild?.firstChild
      ?.textContent!.split(" ")
      .slice(1)
      .join(" ");

    this.$emit("value-change", this.style, Number(id));
  }
}
</script>
