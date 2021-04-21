<template>
  <div id="map">
    <div id="mapContainer" style="height: 350px; width: 100%" ref="hereMap">
      <Loader v-if="isLoading" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Loader from "./Loader.vue";
import { namespace } from "vuex-class";

const post = namespace("posts");

@Component({
  components: {
    Loader,
  },
})
export default class Map extends Vue {
  isLoading = true;
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  marker: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  center: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  map: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  platform: any;
  apikey = "ZGNUtFh2JiunHkhPabyuqumegEyaIErRDZ_Ji7Ev3SA";
  // You can get the API KEY from developer.here.com

  @post.Action
  public addLocation: (loca: Record<string, unknown>) => void;
  @post.Action
  public getPost: (id: number) => void;
  @post.Getter
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post!: Record<string, any>;

  sendEmit(): void {
    this.$emit("marker", "marked");
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted(): void {
    setTimeout(() => {
      this.isLoading = !this.isLoading;
    }, 1000);
    this.id = Number(this.$route.params.id);
    this.getPost(this.id);
    // Initialize the platform object:
    if (this.post) {
      const platform = new window["H"].service.Platform({
        apikey: this.apikey,
      });
      this.platform = platform;
      this.initializeHereMap(this.id, this.addLocation, this.sendEmit);
    } else {
      this.$router.push({ name: "MainLayout" });
    }
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  // eslint-disable-next-line prettier/prettier
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async initializeHereMap(
    id: number,
    // eslint-disable-next-line @typescript-eslint/ban-types
    addLocation: Function,
    // eslint-disable-next-line @typescript-eslint/ban-types
    sendEmit: Function
  ) {
    // rendering map
    const mapContainer = this.$refs.hereMap;

    const H = await window["H"];
    // Obtain the default map types from the platform object
    var maptypes = await this.platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    this.map = await new H.Map(mapContainer, maptypes.vector.normal.map, {
      zoom: 0,
      center: this.post.coord ? this.post.coord : this.center,
    });

    if (this.post.coord) {
      this.marker = new H.map.Marker({
        lat: this.post.coord.lat,
        lng: this.post.coord.lng,
      });
      this.map.addObject(this.marker);
    }
    await addEventListener("resize", () => this.map.getViewPort().resize());
    this.map.addEventListener(
      "tap",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function (evt: any) {
        var coord = this.screenToGeo(
          evt.currentPointer.viewportX,
          evt.currentPointer.viewportY
        );
        if (this.marker || this.marker === undefined) {
          this.removeObjects(this.getObjects());
        }
        addLocation({ coord, id });
        this.marker = new H.map.Marker({ lat: coord.lat, lng: coord.lng });
        this.addObject(this.marker);
        sendEmit();
      },
      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map))
    );
    // add UI
    H.ui.UI.createDefault(this.map, maptypes);
  }
}
</script>

<style scoped>
#map {
  width: 60vw;
  min-width: 320px;
  text-align: center;
  margin: 5% auto;
  background-color: #fff;
}
</style>
