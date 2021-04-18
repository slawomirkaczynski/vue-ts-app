<template>
  <div class="intel">
    <div v-for="int in intel" :key="int.name">
      <img height="200px" :src="int.flag" />
      <ul class="column">
        <li>Continent: {{ int.subregion }}</li>
        <li>Country: {{ int.name }}</li>
        <li>Capital: {{ int.capital }}</li>
        <li>Currencies: {{ int.currencies[0].name }}</li>
        <li>Language: {{ int.languages[0].name }}</li>
        <li>Native name: {{ int.nativeName }}</li>
        <v-btn outlined rounded text color="orange" center>
          <router-link :to="{ name: 'Currencies' }">
            Check Currencies
          </router-link>
        </v-btn>
      </ul>
      <div class="column"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import Currencies from "./Currencies.vue";
const Posts = namespace("posts");

@Component({
  components: {
    Currencies,
  },
})
export default class Intel extends Vue {
  @Posts.Getter
  intel!: Record<string, unknown>;

  @Posts.Action
  public getIntel: (code: string) => void;

  @Posts.Action
  public getCurrency: (code: string) => void;

  @Posts.Action
  public resetIntel: () => void;

  mounted(): void {
    this.getIntel(this.$route.params.code);
  }

  beforeDestroy(): void {
    this.resetIntel();
  }
}
</script>
<style scoped>
.intel {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
