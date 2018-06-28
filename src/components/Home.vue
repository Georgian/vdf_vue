<template>
<!--  <ais-index
    index-name="vdf"
    :search-client="searchClient"
  >-->
  <ais-index
    app-id="latency"
    api-key="3d9875e51fbd20c7754e65422f7ce5e1"
    index-name="bestbuy"
  >
    <v-app id="vdf">
      <v-toolbar color="amber" app absolute clipped-left>
        <span class="title ml-3 mr-5">Varf De Forma</span>
        <ais-search-box>
          <!--<v-text-field
            solo-inverted
            flat
            label="Search"
            prepend-icon="search"
          ></v-text-field>-->
        </ais-search-box>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height class="grey lighten-4">
          <v-layout justify-center align-center>
            <ais-results>
              <template slot-scope="{ result }">
                <h2>
                  <ais-highlight :result="result" attribute-name="name"></ais-highlight>
                </h2>
              </template>
            </ais-results>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </ais-index>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    searchClient: {
      search (requests) {
        return 'A'
      },
      searchForFacetValues (requests) {
        return 'B'
      }
    }
  })
}
</script>

<style>
  #keep main .container {
    height: 660px;
  }

  .navigation-drawer__border {
    display: none;
  }

  .text {
    font-weight: 400;
  }
</style>
