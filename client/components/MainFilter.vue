<template>
  <v-list class="grey lighten-4" dense>
    <v-flex xs12>
      <vdf-misc-filter></vdf-misc-filter>
    </v-flex>

    <v-divider/>

    <v-flex>
      <v-subheader>Sport</v-subheader>
      <vdf-sport-filter/>
    </v-flex>

    <v-divider/>

    <v-flex xs12 pb-5>
      <v-subheader>Disciplină</v-subheader>
      <vdf-facet-filter facetName='discipline'/>
    </v-flex>

    <v-divider/>

    <v-flex xs12 pb-5>
      <v-subheader>Etichetă</v-subheader>
      <vdf-facet-filter facetName='miscellaneous'/>
    </v-flex>

    <v-divider/>

    <v-flex xs12>
      <v-subheader>Organizator</v-subheader>
      <vdf-facet-filter facetName='organizer'/>
    </v-flex>

  </v-list>
</template>

<script>
  import VdfSportFilter from '~/components/SportFilter'
  import VdfMiscFilter from '~/components/MiscFilter'
  import VdfFacetFilter from '~/components/FacetFilter'

  export default {
    name: 'vdf-main-filter',
    components: {
      VdfFacetFilter, VdfMiscFilter, VdfSportFilter
    },
  }
</script>

<style scoped>

</style>
