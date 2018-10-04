<template>
    <v-card hover height="430px" class="flexcard">

      <v-img
        :src="vdfEvent.photoLink"
        height="200px"
        max-height="200px"
        :style="vdfEvent.isPastEvent() ? 'filter: grayscale(100%);' : ''"
      ></v-img>

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

      <v-card-text>
        <v-layout row wrap align-start justify-start>
          <v-chip v-for="tag in vdfEvent.tags" :key="tag.name" color="accent" text-color="white">{{tag.name}}</v-chip>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-btn flat outline color="accent" :to="{path: 'event/' + vdfEvent.id}" target="_blank">Detalii</v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
export default {
  props: {
    vdfEvent: { type: Object, required: true }
  },
  methods: {
    goToEvent () {
      this.$router.push({path: '/event/' + this.vdfEvent.id})
    }
  }
}
</script>

<style scoped>
.flexcard {
  display: flex;
  flex-direction: column;
}
</style>
