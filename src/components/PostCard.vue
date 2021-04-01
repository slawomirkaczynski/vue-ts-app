<template>
  <v-main>
    <v-card
      class="mx-auto card"
      max-width="344"
      min-width="344"
      color="orange"
      v-for="post in posts"
      :key="post.id"
    >
      <router-link :to="{ name: 'Post', params: { id: post.id } }">
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">Post {{ post.id }}</div>
            <v-list-item-subtitle
              contenteditable="true"
              spellcheck="false"
              @blur="updatePost({ post: $event.target.innerText, id: post.id })"
              :class="post.id === id ? style : post.savedStyle"
              >{{ post.content }}</v-list-item-subtitle
            >
          </v-list-item-content>
          <ButtonsRadio @value-change="changeStyle" />
        </v-list-item>
      </router-link>
      <v-card-actions>
        <v-btn outlined rounded text @click="removePost(post.id)">
          Remove
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ButtonsRadio from "./ButtonsRadio.vue";
import { namespace } from "vuex-class";

const Posts = namespace("posts");

@Component({
  components: {
    ButtonsRadio,
  },
})
export default class PostCard extends Vue {
  id = 0;
  style = "";

  @Posts.Getter
  posts!: Record<string, unknown>[];

  @Posts.Action
  public updatePost: (data: Record<string, unknown>) => void;

  @Posts.Action
  public removePost: (id: number) => void;

  @Posts.Action
  public setStyles: (data: Record<string, unknown>) => void;

  changeStyle(value: string, id: number): void {
    this.style = value;
    this.id = id;
    this.setStyles({ value, id });
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
