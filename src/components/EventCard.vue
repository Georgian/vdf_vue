<template>
  <v-card>
    <v-card-media
      :src="vdfEvent.photoLink"
      height="200px"
    ></v-card-media>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
        <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn flat color="orange">Share</v-btn>
      <v-btn flat color="orange">Explore</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    vdfEvent: { type: Object, required: true }
  }
}
</script>

<style scoped>

</style>
