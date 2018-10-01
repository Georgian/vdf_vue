<template>
    <v-card hover height="500px" class="flexcard" @click.native="goToEvent">

      <v-img
        :src="vdfEvent.photoLink"
        height="200px"
        max-height="200px"
        :style="vdfEvent.isPastEvent() ? 'filter: grayscale(100%);' : ''"
      ></v-img>

      <v-flex ><h3>{{vdfEvent.name}}</h3></v-flex>

      <v-flex px-0 pb-0 pt-0 align-center justify-center>
        <v-flex py-0 text-wrap>
          <font-awesome-icon icon="bicycle"></font-awesome-icon>
            {{vdfEvent.tags.filter(t => t.category != 'Miscellaneous').map(t => t.name).join(', ')}}
        </v-flex>
        <v-flex py-0>
          <font-awesome-icon icon="calendar-alt"></font-awesome-icon>
          {{this.formatDate(vdfEvent.dateStart, null)}}
        </v-flex>
        <v-flex py-0>
          <font-awesome-icon icon="location-arrow"></font-awesome-icon>
          {{vdfEvent.locationName}}
        </v-flex>
      </v-flex>

      <!--
            <a v-bind:href="'http://google.com/maps/place/' + vdfEvent.locationCoordinates" target="_blank" >
      -->

      <!-- Grow the text card so that the v-card-actions get pushed to the bottom of the card -->
      <v-card-text class="grow">
        {{vdfEvent.description | truncate(100, '...')}}
      </v-card-text>

      <v-card-actions>
        <v-btn flat color="accent" :to="{path: 'event/' + vdfEvent.id}" target="_blank">Detalii</v-btn>
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
