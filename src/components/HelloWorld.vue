<template>
  <div>
    <v-card
      class="mx-auto card"
      max-width="344"
      min-width="344"
      color="orange"
      v-for="post in posts"
      :key="post.id"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">Post {{ post.id }}</div>

          <v-list-item-subtitle>{{ post.content }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined rounded text @click="removePost(post.id)">
          Remove
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  get posts() {
    return this.$store.state.posts;
  }

  removePost(id: number): void {
    this.$store.dispatch("removePost", id);
    this.$store.dispatch("fetchData");
  }

  updated(): void {
    this.$store.dispatch("fetchData");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  margin: 10px;
}
</style>
