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
  marker: any;
  center: any;
  map: any;
  platform: any;
  apikey = "ZGNUtFh2JiunHkhPabyuqumegEyaIErRDZ_Ji7Ev3SA";
  // You can get the API KEY from developer.here.com

  @post.Action
  public addLocation: (loca: Record<string, unknown>) => void;
  @post.Action
  public getPost: (id: number) => void;
  @post.Getter
  post!: Record<string, any>;

  mounted(): void {
    this.id = Number(this.$route.params.id);
    this.getPost(this.id);
    // Initialize the platform object:
    const platform = new window.H.service.Platform({
      apikey: this.apikey,
    });
    this.platform = platform;
    this.initializeHereMap(this.id, this.addLocation);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  initializeHereMap(id: number, addLocation: Function): void {
    // rendering map
    const mapContainer = this.$refs.hereMap;

    const H = window.H;
    // Obtain the default map types from the platform object
    var maptypes = this.platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    this.map = new H.Map(mapContainer, maptypes.vector.normal.map, {
      zoom: 0,
      center: this.post.coord ? this.post.coord : this.center,
      // center object { lat: 40.730610, lng: -73.935242 }
    });

    if (this.post.coord) {
      this.marker = new H.map.Marker({
        lat: this.post.coord.lat,
        lng: this.post.coord.lng,
      });
      this.map.addObject(this.marker);
    }
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    addEventListener("resize", () => this.map.getViewPort().resize());

    this.map.addEventListener(
      "tap",
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
