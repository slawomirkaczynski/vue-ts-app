<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="160"
        @load="fetchData"
      />
      <AddTask />
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AddTask from "@/components/AddTask.vue";
import { namespace } from "vuex-class";

const posts = namespace("posts");

@Component({
  components: {
    AddTask,
  },
})
export default class NavBar extends Vue {
  @posts.Action
  public fetchData: () => void;
}
</script>
