<template>
  <v-app id="vdf1">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        label="Nume"
      ></v-text-field>
      <v-text-field
        v-model="description"
        label="Descriere"
      ></v-text-field>
      <v-text-field
        v-model="sport"
        label="Sport"
      ></v-text-field>
      <v-text-field
        v-model="discipline"
        label="Disciplina"
      ></v-text-field>
      <v-flex xs12 sm6 md4>
        <v-menu
          ref="menu"
          :close-on-content-click="true"
          v-model="menu"
          :nudge-right="40"
          :return-value.sync="date"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="date"
            label="Data"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="date" @input="$refs.menu.save(date)"></v-date-picker>
        </v-menu>
      </v-flex>
      <v-text-field
        v-model="timeSchedule"
        label="Program"
      ></v-text-field>
      <v-text-field
        v-model="price"
        label="Taxa"
      ></v-text-field>
      <v-text-field
        v-model="locationName"
        label="Locatie"
      ></v-text-field>
      <v-text-field
        v-model="locationCoordinates"
        label="Coordonate"
      ></v-text-field>
      <v-text-field
        v-model="registrationLink"
        label="Link inregistrare"
      ></v-text-field>
      <v-text-field
        v-model="technicalGuideLink"
        label="Link ghid tehnic"
      ></v-text-field>
      <v-text-field
        v-model="photoLink"
        label="Link fotograie de promovare"
      ></v-text-field>
      <v-text-field
        v-model="trackLink"
        label="Link traseu"
      ></v-text-field>
      <v-btn
        :disabled="!valid"
        @click="submit"
      >
        Adaugare
      </v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-form>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    valid: true,
    menu: false,
    name: '',
    description: '',
    sport: '',
    discipline: '',
    date: '',
    timeSchedule: '',
    price: '',
    locationName: '',
    locationCoordinates: '',
    registrationLink: '',
    technicalGuideLink: '',
    photoLink: '',
    trackLink: ''
  }),
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post('api/event/add', {
          name: this.name,
          description: this.description,
          sport: this.sport,
          discipline: this.discipline,
          date: this.date,
          timeSchedule: this.timeSchedule,
          price: this.price,
          locationName: this.locationName,
          locationCoordinates: this.locationCoordinates,
          registrationLink: this.registrationLink,
          technicalGuideLink: this.technicalGuideLink,
          photoLink: this.photoLink,
          trackLink: this.trackLink
        })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
`
