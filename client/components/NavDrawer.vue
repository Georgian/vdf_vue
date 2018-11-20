<template>
  <v-navigation-drawer
    v-model="showDrawer"
    fixed
    clipped
    class="grey lighten-4"
    app
  >
    <v-flex>
    <v-layout column>

      <v-flex>
        <vdf-misc-filter></vdf-misc-filter>
      </v-flex>

      <v-flex>
        <h3>Sport</h3>
        <vdf-sport-filter></vdf-sport-filter>
      </v-flex>

      <v-flex pb-5>
        <h3>Disciplina</h3>
        <vdf-filter facetName='discipline'></vdf-filter>
      </v-flex>

      <v-flex pb-5>
        <h3>Etichetă</h3>
        <vdf-filter facetName='miscellaneous'></vdf-filter>
      </v-flex>

      <v-flex>
        <h3>Organizator</h3>
        <vdf-filter facetName='organizer'></vdf-filter>
      </v-flex>

    </v-layout>
      </v-flex>
  </v-navigation-drawer>
</template>

<script>
import VdfSportFilter from '~/components/SportFilter'
import VdfMiscFilter from '~/components/MiscFilter'
import VdfResults from '~/components/Results'
import VdfFilter from '~/components/Filter'

export default {
  name: 'vdf-nav-drawer',
  components: {
    VdfResults,
    VdfMiscFilter,
    VdfSportFilter,
    VdfFilter
  },
  computed: {
    showDrawer: {
      get () {
        return this.$store.state.showDrawer
      },
      set (newVal) {
        this.$store.commit('SET_DRAWER', newVal)
      }
    }
  }
}
</script>

<style scoped>

</style>
