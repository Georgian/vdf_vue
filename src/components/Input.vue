<template>
  <v-text-field
    v-model.lazy="query"
    solo-inverted
    flat
    label="Caută eveniment"
    prepend-inner-icon="search">
  </v-text-field>
</template>

<script>
import { Component } from 'vue-instantsearch'

export default {
  mixins: [Component],
  data () {
    return {
      blockClassName: 'ais-input'
    }
  },
  computed: {
    query: {
      get () {
        return this.searchStore.query
      },
      set (value) {
        this.searchStore.query = value
        this.$emit('query', value)
      }
    }
  }
}
</script>
