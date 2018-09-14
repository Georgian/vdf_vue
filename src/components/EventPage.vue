<template>
    <v-container>
      <v-layout column>
        <v-card v-if="loadingData">
          Se încarcă...
        </v-card>

        <v-card v-if="error">
          Eroare!
        </v-card>

        <v-flex>
          <v-img width="815px" :src="vdfEvent.photoLink"></v-img>
        </v-flex>

      </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EventPage',
  props: ['vdfEventId'],
  data: function () {
    return {
      loadingData: false,
      error: null,
      vdfEvent: null
    }
  },
  created () {
    this.fetchVdfEvent()
  },
  watch: {
    // Call again the method if the route changes
    '$route': 'fetchVdfEvent'
  },
  methods: {
    fetchVdfEvent: function () {
      this.error = this.vdfEvent = null
      this.loadingData = true
      let self = this
      axios.get(process.env.API_BASE_URL + '/event/' + this.vdfEventId)
        .then(response => {
          self.loadingData = false
          self.vdfEvent = response.data
        })
        .catch(error => {
          self.error = error.response
        })
    }
  }
}
</script>

<style scoped>

</style>
