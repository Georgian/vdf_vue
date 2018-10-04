<template>
  <!-- TODO need to hide this ais-index if not on search page !! -->
  <ais-index
    index-name='vdf'
    :search-store='searchStore'>
    <v-app id='vdf'>

      <vdf-header />
      <nuxt />
      <vdf-footer />

      <no-ssr>
        <cookie-law
          theme="blood-orange"
          buttonText="Am înțeles!"
          buttonLinkText="">
          <div slot="message">
            Acest website folosește cookie-uri pentru a furniza vizitatorilor o experiență mult mai bună de
            navigare și servicii adaptate nevoilor și interesului fiecăruia. Citește
            <router-link to="/termeni" class="white--text">Termeni și Condiții</router-link>
          </div>
        </cookie-law>
      </no-ssr>

    </v-app>
  </ais-index>
</template>
<script>
import VdfHeader from '~/components/Header'
import VdfFooter from '~/components/Footer'
import CookieLaw from 'vue-cookie-law'
import createSearchStoreFromVuex from '../plugins/search'

export default {
  components: {VdfFooter, VdfHeader, CookieLaw},
  data: () => ({
    searchStore: null
  }),
  created () {
    this.searchStore = createSearchStoreFromVuex(this.$store)
    // this.$Progress.start()
  },
  mounted () {
    this.$store.dispatch('loadEvents')
  },
  computed: {
    eventCount () {
      return this.$store.getters.events
    }
  },
  watch: {
    eventCount (newCount, oldCount) {
      this.searchStore.refresh()
    }
  }
}
</script>

