<template>
  <v-btn fab color="darkgray" icon v-on:click="switchDisplayMode">
    <font-awesome-icon class="fa-lg" :icon=icon></font-awesome-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'vdf-display-mode-switch',
  data: () => ({
    icon: 'globe'
  }),
  methods: {
    switchDisplayMode () {
      this.icon = this.icon === 'th' ? 'globe' : 'th'
      this.$eventBus.$emit('toggleDisplayMode')
    }
  }
}
</script>

<style scoped>

</style>
