<template>
  <ais-refinement-list :attribute-name='facetName' :sort-by="['count:desc', 'name:asc']" inline-template>
    <v-layout column>
      <v-flex v-for="facet in facetValues" :key="facet.name" my-1 py-1>
        <v-layout row align-center justify-center fill-height>
          <v-flex my-0 py-0>
            <v-checkbox :label=facet.name v-model="facet.isRefined" @change="toggleRefinement(facet)" hide-details></v-checkbox>
          </v-flex>
          <div class="badge">
            {{ facet.count }}
          </div>
        </v-layout>
      </v-flex>
    </v-layout>
  </ais-refinement-list>
</template>

<script>
export default {
  name: 'vdf-filter',
  props: [
    'facetName'
  ]
}
</script>

<style>
.badge {
  margin-top: 15px;
  float: right;
  min-width: 10px;
  padding: 3px 7px;
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  background-color: #777;
  border-radius: 8px;
}
</style>
