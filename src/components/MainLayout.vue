<template>
  <v-main>
    <PostCard />
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Details from "@/components/DetailsView.vue";
import PostCard from "@/components/PostCard.vue";

@Component({
  components: {
    Details,
    PostCard,
  },
})
export default class MainLayout extends Vue {}
</script>
