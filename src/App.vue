<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="160"
        />
        <AddTask />
      </div>
    </v-app-bar>

    <v-main>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import AddTask from "@/components/AddTask.vue";

@Component({
  components: {
    HelloWorld,
    AddTask,
  },
})
export default class Home extends Vue {
  mounted(): void {
    this.$store.dispatch("fetchData");
  }
}
</script>
