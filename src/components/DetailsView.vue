<template>
  <v-card min-width="90%" class="mx-auto post">
    <slot name="nr"></slot>
    <v-subheader class="head" v-if="displayButton">
      <v-btn outlined rounded text color="orange">
        <router-link to="/"> Back </router-link>
      </v-btn>
      <v-btn outlined rounded text color="orange">
        <router-link :to="{ name: 'Intel', params: { code: country } }">
          Intel
        </router-link>
      </v-btn>
    </v-subheader>
    <main class="container" v-if="post">
      <div v-if="post">{{ post.content }}</div>
    </main>
    <div class="map">
      <Map v-if="displayButton" />
    </div>
    <router-view> </router-view>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import Map from "./Map.vue";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const crg = require("country-reverse-geocoding").country_reverse_geocoding();

const Posts = namespace("posts");

@Component({
  components: {
    Map,
  },
})
export default class DetailsView extends Vue {
  country: string;
  geo() {
    const country = crg.get_country(this.post.coord.lat, this.post.coord.lng)
      .name;
    console.log(country);
    this.country = country;
  }

  mounted(): void {
    document.body.scrollTop = 0;
    this.resetPost();
    this.getPost(Number(this.$route.params.id));
    this.geo();
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

.map {
  font-family: "Ubuntu", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
