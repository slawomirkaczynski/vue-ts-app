<template>
  <v-card min-width="90%" class="mx-auto post">
    <slot name="nr"></slot>
    <v-subheader class="head" v-if="displayButton">
      <v-btn outlined rounded text color="orange">
        <router-link to="/"> Back </router-link>
      </v-btn></v-subheader
    >
    <main class="container" v-if="post">
      <div v-if="post">post content:{{ post.content }}</div>
      <div v-if="post">post id: {{ post.id }}</div>
      <div v-if="post.content">post length: {{ post.content.length }}</div>
      <div v-if="post.savedStyle">post style: {{ post.savedStyle }}</div>
    </main>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const Posts = namespace("posts");

@Component({})
export default class DetailsView extends Vue {
  mounted(): void {
    this.resetPost();
    this.getPost(Number(this.$route.params.id));
  }

  get displayButton(): boolean {
    if (this.$route.name === "Post") {
      return true;
    }
    return false;
  }

  @Posts.Getter
  post!: Record<string, unknown>;

  @Posts.Action
  public getPost: (id: number) => void;

  @Posts.Action
  public resetPost: () => void;
}
</script>

<style scoped>
.post {
  margin-top: 70px;
}

.container {
  padding: 10px;
  text-align: center;
}

.head {
  display: flex;
  justify-content: space-around;
}
</style>
