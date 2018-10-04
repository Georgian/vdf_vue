<template>
  <GmapMap
    :center="{lat: 45.919849, lng: 25.0203875}"
    :zoom="7"
    map-type-id="terrain"
    style="width: 100%; height: 600px"
  >
   <GmapInfoWindow :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen">
      {{infoContent}}
    </GmapInfoWindow>

    <GmapMarker
      :key="markerIdx"
      v-for="(m, markerIdx) in vdfEvents"
      :position="coordinateStringToObject(m.locationCoordinates)"
      :clickable="true"
      :draggable="false"
      @click="toggleInfoWindow(coordinateStringToObject(m.locationCoordinates), markerIdx)"
    />
  </GmapMap>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'
export default {
  name: 'vdf-map',
  components: [
    VueGoogleMaps
  ],
  data () {
    return {
      infoContent: 'testasdasda',
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {}
      // icon: {
      //   path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
      //   fillColor: '#8860D0',
      //   fillOpacity: 1,
      //   strokeColor: '',
      //   strokeWeight: 0
      // }
    }
  },
  props: ['vdfEvents'],
  methods: {
    toggleInfoWindow: function (newPosition, idx) {
      this.infoWindowPos = newPosition
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    },
    labelFromEvent: function (event) {
      return {
        text: event.discipline,
        fontSize: '14px',
        fontWeight: 'bold'
      }
    },
    coordinateStringToObject: function (coordinateString) {
      let split = coordinateString.split(',')
      return {lat: parseFloat(split[0]), lng: parseFloat(split[1])}
    }
  }
}
</script>

<style scoped>

</style>
