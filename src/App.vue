<template>
  <div>
    <v-app>
      <NavBar />
      <router-view>
        <MainLayout />
      </router-view>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";
import MainLayout from "@/components/PostCard.vue";

@Component({
  components: {
    NavBar,
    MainLayout,
  },
})
export default class Home extends Vue {}
</script>
