<template>
  <v-card height="100%" hover>
    <v-card-media
      :src="vdfEvent.photoLink"
      height="200px"
    ></v-card-media>

    <v-card-text>
      <h3>{{vdfEvent.name}}</h3>
    </v-card-text>

    <v-card-text class='py-0'>
      <v-chip label outline color="secondary">{{vdfEvent.discipline}}</v-chip>
      <v-chip label outline color="secondary">{{vdfEvent.date}}</v-chip>
      <v-chip label outline color="secondary"><a v-bind:href="'http://google.com/maps/place/' + vdfEvent.locationCoordinates" target="_blank" >{{vdfEvent.locationName}}</a> </v-chip>
    </v-card-text>

    <v-card-text>
      {{vdfEvent.description.substring(0, 100)}}...
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
  }
}
</script>

<style scoped>

</style>
