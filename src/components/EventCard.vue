<template>
  <v-card>
    <v-card-media
      :src="vdfEvent.photoLink"
      height="200px"
    ></v-card-media>

    <v-card-title primary-title>
      <v-flex xs12 py-10>
        <h2 class="headline mb-0">{{vdfEvent.name}}</h2>
      </v-flex>
      <v-flex xs6 py-1>
        <v-icon>fas fa-calendar-alt</v-icon> {{vdfEvent.date}}
      </v-flex>
      <v-flex xs6 py-1>
        <v-icon>fas fa-map-marker-alt</v-icon> {{vdfEvent.locationName}}
      </v-flex>
      <v-flex xs6 py-1>
        <v-icon>fas fa-bicycle</v-icon> {{vdfEvent.sport}}
      </v-flex>
      <v-flex xs6 py-1>
        <v-icon>fas fa-chevron-right</v-icon> {{vdfEvent.discipline}}
      </v-flex>
      <v-flex xs6 py-1>
        <v-icon>fas fa-dollar-sign</v-icon> {{vdfEvent.price}}
      </v-flex>
    </v-card-title>
    <v-card-text>
      <v-flex xs12 py-0>
        {{vdfEvent.description}}
      </v-flex>
    </v-card-text>

    <v-card-actions>
      <v-btn flat color="orange" :href="vdfEvent.registrationLink" target="_blank">Inscriere</v-btn>
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
