<template>
  <div id="map">
    <!--In the following div the HERE Map will render-->
    <div
      id="mapContainer"
      style="height: 300px; width: 100%"
      ref="hereMap"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Map",
  props: {
    center: Object,
  },
  data() {
    return {
      platform: null,
      apikey: "ZGNUtFh2JiunHkhPabyuqumegEyaIErRDZ_Ji7Ev3SA",
      // You can get the API KEY from developer.here.com
    };
  },
  async mounted() {
    // Initialize the platform object:
    const platform = new window.H.service.Platform({
      apikey: this.apikey,
    });
    this.platform = platform;
    this.initializeHereMap();
  },
  methods: {
    initializeHereMap() {
      // rendering map
      const mapContainer = this.$refs.hereMap;
      const H = window.H;
      // Obtain the default map types from the platform object
      var maptypes = this.platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      this.map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 3,
        center: this.center,
        // center object { lat: 40.730610, lng: -73.935242 }
      });

      addEventListener("resize", () => this.map.getViewPort().resize());

      this.map.addEventListener(
        "tap",
        function (evt) {
          var coord = this.screenToGeo(
            evt.currentPointer.viewportX,
            evt.currentPointer.viewportY
          );
          if (this.marker !== undefined) {
            this.removeObjects(this.getObjects());
          }
          console.log(typeof this.marker);
          this.marker = new H.map.Marker({ lat: coord.lat, lng: coord.lng });
          this.addObject(this.marker);
        },
        // add behavior control
        new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map))
      );

      // add UI
      H.ui.UI.createDefault(this.map, maptypes);
      // End rendering the initial map
    },
  },
};
</script>

<style scoped>
#map {
  width: 60vw;
  min-width: 320px;
  text-align: center;
  margin: 5% auto;
  background-color: #ccc;
}
</style>
