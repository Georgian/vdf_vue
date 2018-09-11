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
    />
  </GmapMap>
</template>

<script>
export default {
  name: 'vdf-map',
  props: ['vdfEvents'],
  methods: {
    coordinateStringToObject: function (coordinateString) {
      let split = coordinateString.split(',')
      return {lat: parseFloat(split[0]), lng: parseFloat(split[1])}
    }
  }
}
</script>

<style scoped>

</style>
