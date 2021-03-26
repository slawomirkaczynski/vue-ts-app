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

          <v-list-item-subtitle
            contenteditable="true"
            @blur="handleBlur({ post: $event.target.innerText, id: post.id })"
            >{{ post.content }}</v-list-item-subtitle
          >
        </v-list-item-content>
        <v-col cols="12" sm="3" md="3">
          <v-radio-group v-model="style" hide-details @change="setStyle(style)">
            <v-radio value="bold" label="B"></v-radio>
            <v-radio value="italic" label="I"></v-radio>
            <v-radio value="underline" label="U"></v-radio>
          </v-radio-group>
        </v-col>
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
  style = null;
  get posts(): void {
    return this.$store.state.posts;
  }

  handleBlur(data: Record<string, unknown>): void {
    this.$store.dispatch("updatePost", data);
  }

  removePost(id: number): void {
    this.$store.dispatch("removePost", id);
  }

  setStyle(value) {
    console.log(value);
  }
}
</script>

<style scoped>
.card {
  margin: 10px;
}
</style>
