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
    name: '',
    email: ''
  }),
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post('http://localhost:8080/event/add', {
          name: this.name,
          description: this.description
        })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
