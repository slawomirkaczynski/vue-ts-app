<template>
  <v-simple-table height="100vh">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Currency</th>
          <th class="text-center">Code</th>
          <th class="text-left">Rate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in allCurrencies" :key="item.name">
          <td>{{ item.currency }}</td>
          <td>
            <router-link :to="{ name: 'Chart', params: { code: item.code } }">{{
              item.code
            }}</router-link>
          </td>
          <td>{{ item.mid }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AddTask from "@/components/AddTask.vue";
import { namespace } from "vuex-class";

const posts = namespace("posts");

@Component({
  components: {
    AddTask,
  },
})
export default class Currencies extends Vue {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async mounted() {
    await this.fetchCurrencies();
  }

  @posts.Getter
  allCurrencies!: Record<string, unknown>[];

  @posts.Action
  public fetchCurrencies: () => void;
}
</script>
