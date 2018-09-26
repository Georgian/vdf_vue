<template>
  <GmapMap
    :center="{lat: 45.919849, lng: 25.0203875}"
    :zoom="7"
    map-type-id="terrain"
    style="width: 100%; height: 600px"
  >
    <GmapMarker
      :key="markerIdx"
      v-for="(m, markerIdx) in vdfEvents"
      :position="coordinateStringToObject(m.locationCoordinates)"
      :clickable="true"
      :draggable="false"
      :icon="icon"
      :label="labelFromEvent(m)"
    />
  </GmapMap>
</template>

<script>
export default {
  name: 'vdf-map',
  data () {
    return {
      icon: {
        path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
        fillColor: '#8860D0',
        fillOpacity: 1,
        strokeColor: '',
        strokeWeight: 0
      }
    }
  },
  props: ['vdfEvents'],
  methods: {
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
