<template>
  <v-card min-width="90%" class="mx-auto post">
    <slot name="nr"></slot>
    <v-subheader class="head" v-if="displayButton">
      <v-btn outlined rounded text color="orange">
        <router-link to="/"> Back </router-link>
      </v-btn>
      <v-btn v-if="displayIntel" outlined rounded text color="orange">
        <router-link :to="{ name: 'Intel', params: { code: country } }">
          Intel
        </router-link>
      </v-btn>
    </v-subheader>
    <main class="container" v-if="post">
      <div v-if="post">{{ post.content }}</div>
      <div v-if="distance">Distance: {{ distance }} Km</div>
    </main>
    <div class="map">
      <Map @marker="click" v-if="displayButton" />
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
  country = "";
  displayIntel = false;
  distance = "";
  click(arg: string): void {
    arg === "marked" && (this.displayIntel = true);
    this.getPost(Number(this.$route.params.id));
    if (this.post) {
      this.geo();
      this.getCurrentLocation(this.post);
    }
  }

  geo(): void {
    // eslint-disable-next-line no-prototype-builtins
    if ("coord" in this.post) {
      const country = crg.get_country(
        this.post.coord["lat"],
        this.post.coord["lng"]
      ).name;
      this.country = country;
      this.displayIntel = true;
    }
  }
  mounted(): void {
    document.body.scrollTop = 0;
    this.resetPost();
    this.getPost(Number(this.$route.params.id));
    if (this.post) {
      this.getCurrentLocation(this.post);
    }
    if (this.post) {
      this.geo();
    }
  }

  getCurrentLocation(post: Record<string, unknown>): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // const self = this;
        if ("coord" in post) {
          var radlat1 = (Math.PI * position.coords.latitude) / 180;
          var radlat2 = (Math.PI * post.coord["lat"]) / 180;
          var theta = position.coords.longitude - post.coord["lng"];
          var radtheta = (Math.PI * theta) / 180;
          var dist =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
          dist = Math.acos(dist);
          dist = (dist * 180) / Math.PI;
          dist = dist * 60 * 1.1515;
          dist = dist * 1.609344;
          dist = Math.floor(dist);
          this.distance = String(dist);
        }
      });
    }
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
