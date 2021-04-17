<template>
  <v-card
    class="mx-auto text-center position"
    color="darkgray"
    dark
    min-width="100%"
    height="95vh"
  >
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="chartCoin"
          color="rgba(243, 156, 18)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
          auto-draw
        >
          <template v-slot:label="item"> {{ item.value }} </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="display-5">
        Last 10 days {{ this.$route.params.code }} average exchange rate
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <router-link to="/currencies">
        <v-btn block text> Go back </v-btn>
      </router-link>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const post = namespace("posts");

@Component
export default class Chart extends Vue {
  chartCoin = [];
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async mounted() {
    await this.fetchCoin(this.$route.params.code);
    this.transformData();
  }
  transformData(): void {
    for (const item of this.coin["rates"]) {
      this.chartCoin.push(item.mid);
    }
  }
  @post.Getter
  coin!: Record<string, unknown>[];
  @post.Action
  public fetchCoin: (code: string) => void;
}
</script>
<style scoped>
.position {
  padding-top: 15vh;
}
</style>
