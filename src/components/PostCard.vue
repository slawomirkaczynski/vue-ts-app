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
            spellcheck="false"
            @blur="handleBlur({ post: $event.target.innerText, id: post.id })"
            :class="post.id === id ? style : post.savedStyle"
            >{{ post.content }}</v-list-item-subtitle
          >
        </v-list-item-content>
        <ButtonsRadio @value-change="changeStyle" />
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
import ButtonsRadio from "./ButtonsRadio.vue";

@Component({
  components: {
    ButtonsRadio,
  },
})
export default class HelloWorld extends Vue {
  id = 0;
  style = "";
  get posts(): void {
    return this.$store.state.posts;
  }

  handleBlur(data: Record<string, unknown>): void {
    this.$store.dispatch("updatePost", data);
  }

  removePost(id: number): void {
    this.$store.dispatch("removePost", id);
  }
  changeStyle(value: string, id: string): void {
    this.style = value;
    this.id = Number(id);

    this.$store.dispatch("setStyles", { id, value });
  }
}
</script>

<style scoped>
.card {
  margin: 10px;
}

.bold {
  font-weight: bold;
}

.italic {
  font-style: italic;
}

.underline {
  text-decoration: underline;
}
</style>
