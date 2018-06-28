<template>
  <ais-index
    index-name="vdf"
    :search-client="searchClient"
  >
<!--  <ais-index
    app-id="latency"
    api-key="3d9875e51fbd20c7754e65422f7ce5e1"
    index-name="bestbuy"
  >-->
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
          search(requests) {

            const result = {
             "results": [
                    {
                      "hits": [
                        {
                          "name": "Sony - PlayStation 3 The Last of Us Bundle - 500GB",
                          "shortDescription": "Explore expansive entertainment options with the power of this PlayStation 3 Bundle",
                          "bestSellingRank": 1204,
                          "thumbnailImage": "http://img.bbystatic.com/BestBuy_US/images/products/3384/3384001_s.gif",
                          "salePrice": 269.99,
                          "manufacturer": "Sony",
                          "url": "http://www.bestbuy.com/site/sony-playstation-3-the-last-of-us-bundle-500gb/3384001.p?id=1219091055302&skuId=3384001&cmp=RMX&ky=2d3GfEmNIzjA0vkzveHdZEBgpPCyMnLTJ",
                          "type": "HardGood",
                          "image": "http://img.bbystatic.com/BestBuy_US/images/products/3384/3384001_sc.jpg",
                          "customerReviewCount": 77,
                          "category": "PS3 Consoles",
                          "shipping": "Free shipping",
                          "salePrice_range": "201 - 500",
                          "objectID": "3384001",
                          "_highlightResult": {
                            "name": {
                              "value": "Sony - __ais-highlight__PlayStation__/ais-highlight__ 3 The Last of __ais-highlight__Us__/ais-highlight__ Bundle - __ais-highlight__500GB__/ais-highlight__",
                              "matchLevel": "full",
                              "fullyHighlighted": false,
                              "matchedWords": [
                                "playstation4",
                                "500gb",
                                "us"
                              ]
                            },
                          }
                        }
                      ],
                      "nbHits": 1,
                      "page": 0,
                      "nbPages": 1,
                      "hitsPerPage": 20,
                      "processingTimeMS": 3,
                      "exhaustiveNbHits": true,
                      "query": "playstation4 (500gb) us ",
                      "params": "query=playstation4%20(500gb)%20us%20&page=0&highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&facets=%5B%5D&tagFilters=",
                      "index": "bestbuy"
                    }
                  ]
                  }

            return Promise.resolve(result);
          },
          searchForFacetValues(requests) {
            // perform the requests
            return "lol";
          },
      }
    }),
    props: {
      source: String
    }
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
