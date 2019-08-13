<template>
  <v-content>
    <v-container>
      <v-layout column v-if="vdfEvent">
        <v-text-field v-model="fbEventLink" label="Event Link" outline></v-text-field>
        <v-text-field v-model="vdfEvent.name" label="Name" outline></v-text-field>
        <v-text-field v-model="vdfEvent.organizer" label="Organizer" outline></v-text-field>
        <v-layout row>
          <v-text-field v-model="vdfEvent.dateStart" label="Date Start" outline></v-text-field>
          <v-text-field v-model="vdfEvent.dateEnd" label="Date End" outline></v-text-field>
        </v-layout>
        <v-layout row>
          <v-text-field v-model="vdfEvent.locationName" label="Location" outline></v-text-field>
          <v-text-field v-model="vdfEvent.locationCoordinates" label="Coordinates" outline></v-text-field>
        </v-layout>
        <v-layout row wrap>
          <v-flex v-for="tag in allTags" :key="tag.name" md2 sm4 xs10>
            <v-checkbox :label="tag.name" v-model="selectedTags" :value="tag"></v-checkbox>
          </v-flex>
        </v-layout>
        <v-textarea v-model="vdfEvent.description" label="Description" rows="20" outline></v-textarea>
        <v-textarea v-model="vdfEvent.tracks" label="Traseu" rows="10" outline></v-textarea>
        <v-textarea v-model="vdfEvent.prizes" label="Premii" rows="10" outline></v-textarea>
        <v-textarea v-model="vdfEvent.schedule" label="Program" rows="10" outline></v-textarea>
        <v-textarea v-model="vdfEvent.registrationTax" label="Taxă" rows="10" outline></v-textarea>
        <v-textarea v-model="vdfEvent.ageCategories" label="Categorii" rows="10" outline></v-textarea>
        <v-text-field v-model="vdfEvent.photoLink" label="Photo Link" outline></v-text-field>
        <v-text-field v-model="vdfEvent.registrationLink" label="Registration Link" outline></v-text-field>
        <v-btn @click="save">SAVE</v-btn>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'EventEditPage',
    middleware: 'unauth-redirect',
    data: function () {
      return {
        vdfEvent: {},
        selectedTags: null,
        allTags: null,
        fbEventLink: null,
        isFBReady: false
      }
    },
    mounted: function () {
      this.isFBReady = Vue.FB != undefined
      window.addEventListener('fb-sdk-ready', this.onFBReady)
    },
    beforeDestroy: function () {
      window.removeEventListener('fb-sdk-ready', this.onFBReady)
    },
    methods: {
      onFBReady: function () {
        this.isFBReady = true
      },
      hasTag: function (tag) {
        return this.vdfEvent.tags.includes(tag)
      },
      save: function () {
        this.vdfEvent.tags = this.selectedTags
        this.$axios.post('/event/', this.vdfEvent)
          .then(respone => {
            confirm('Saved!')
            this.$router.push('/')
          })
          .catch(err => {
            console.log(err)
          })
      },
    }
  }
</script>

<style scoped>

</style>
