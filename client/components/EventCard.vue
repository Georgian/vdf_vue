<template>
  <v-card hover height="430px" class="flexcard">

    <!--<v-img
      :src="vdfEvent.photoLink"
      height="200px"
      max-height="200px"
      :style="vdfEvent.isPastEvent() ? 'filter: grayscale(100%);' : ''"
    ></v-img>-->

    <img
      v-lazy="vdfEvent.photoLink"
      height="200px"
      :style="vdfEvent.isPastEvent() ? 'filter: grayscale(100%);' : ''"
    />

    <v-flex pb-0>
      <h3>{{vdfEvent.name}}</h3>

      <h4>
        <font-awesome-icon icon="calendar-alt"></font-awesome-icon>
        {{this.formatDate(vdfEvent.dateStart, null)}}
      </h4>
      <h4>
        <font-awesome-icon icon="location-arrow"></font-awesome-icon>
        {{vdfEvent.locationName}}
      </h4>
    </v-flex>

    <!--
          <a v-bind:href="'http://google.com/maps/place/' + vdfEvent.locationCoordinates" target="_blank" >
    -->

    <!-- Grow the text card so that the v-card-actions get pushed to the bottom of the card -->
    <!--<v-card-text class="grow">
      {{vdfEvent.description | truncate(100, '...')}}
    </v-card-text>-->

      <v-layout row wrap align-start justify-start>
        <v-flex>
          <v-chip v-for="tag in vdfEvent.tags" :key="tag.name" label>{{tag.name}}</v-chip>
        </v-flex>
      </v-layout>

    <v-card-actions>
      <v-btn flat outline color="accent" :to="{path: 'event/' + vdfEvent.id}" target="_blank">Detalii</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    vdfEvent: { type: Object, required: true }
  }
}
</script>

<style scoped>
  .flexcard {
    display: flex;
    flex-direction: column;
  }
</style>
