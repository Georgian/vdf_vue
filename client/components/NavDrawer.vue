<template>
  <v-navigation-drawer
    v-model="showDrawer"
    fixed
    clipped
    class="grey lighten-4"
    app
  >
    <v-list
      dense
      class="grey lighten-4"
    >
      <v-flex xs12 mx-3>
        <vdf-misc-filter></vdf-misc-filter>
      </v-flex>

      <v-divider dark class="my-2"></v-divider>

      <v-flex xs12 mx-3>
        <v-subheader>Sport</v-subheader>
        <vdf-sport-filter></vdf-sport-filter>
      </v-flex>

      <v-divider dark class="my-2"></v-divider>

      <v-flex xs12 mx-3>
        <v-subheader>Disciplină</v-subheader>
        <vdf-filter facetName='discipline'></vdf-filter>
      </v-flex>

      <v-divider dark class="my-2"></v-divider>

      <v-flex xs12 mx-3>
        <v-subheader>Etichetă</v-subheader>
        <vdf-filter facetName='miscellaneous'></vdf-filter>
      </v-flex>

      <v-divider dark class="my-2"></v-divider>

      <v-flex xs12 mx-3>
        <v-subheader>Organizator</v-subheader>
        <vdf-filter facetName='organizer'></vdf-filter>
      </v-flex>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
import VdfSportFilter from '~/components/SportFilter'
import VdfMiscFilter from '~/components/MiscFilter'
import VdfResults from '~/components/Results'
import VdfFilter from '~/components/Filter'

export default {
  name: 'vdf-nav-drawer',
  data: () => ({
    showDrawer: false
  }),
  components: {
    VdfResults,
    VdfMiscFilter,
    VdfSportFilter,
    VdfFilter
  },
  created () {
    this.$eventBus.$on('toggleDrawer', () => {
      this.showDrawer = !this.showDrawer
    })
  }
  // computed: {
  //   showDrawer: {
  //     get () {
  //       return this.$store.state.showDrawer
  //     },
  //     set (newVal) {
  //       this.$store.commit('SET_DRAWER', newVal)
  //     }
  //   }
  // }
}
</script>

<style scoped>

</style>
