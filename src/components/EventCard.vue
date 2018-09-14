<template>
    <v-card hover height="100%" class="flexcard" @click.native="goToEvent">

      <v-img
        :src="vdfEvent.photoLink"
        height="200px"
        max-height="200px"
      ></v-img>

      <v-card-text>
        <h3>{{vdfEvent.name}}</h3>
      </v-card-text>

      <v-card-text>
        <v-chip label outline color="secondary">{{vdfEvent.discipline}}</v-chip>
        <v-chip label outline color="secondary">{{vdfEvent.dateStart}}</v-chip>
        <v-chip label outline color="secondary"><a v-bind:href="'http://google.com/maps/place/' + vdfEvent.locationCoordinates" target="_blank" >{{vdfEvent.locationName}}</a> </v-chip>
      </v-card-text>

      <!-- Grow the text card so that the v-card-actions get pushed to the bottom of the card -->
      <v-card-text class="grow">
        {{vdfEvent.description | truncate(100, '...')}}
      </v-card-text>

      <v-card-actions>
        <v-btn flat color="accent" :href="vdfEvent.registrationLink" target="_blank">Inscriere</v-btn>
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
