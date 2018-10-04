<template>
  <div class="container">
    test
  </div>
</template>

<script>
  import VdfSportFilter from '../components/SportFilter'
  import VdfMap from '../components/Map'
  import VdfMiscFilter from '../components/MiscFilter'

  export default {
    components: {
      VdfMiscFilter,
      VdfMap,
      VdfSportFilter
    },
    data: () => ({
      drawer: null
    }),
    methods: {
      getMarkerLocation: function (locationCoordinates) {
        let split = locationCoordinates.split(',')
        return {lat: parseFloat(split[0]), lng: parseFloat(split[1])}
      }
    }
  }
</script>

<style>
  .v-label {
    font-size: 14px;
  }
  .badge {
    float: right;
    min-width: 10px;
    padding: 3px 7px;
    font-size: 10px;
    font-weight: 600;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    background-color: #777;
    border-radius: 8px;
  }
</style>
