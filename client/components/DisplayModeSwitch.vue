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
      if (this.icon === 'globe')
        this.icon = 'calendar-alt'
      else if (this.icon === 'calendar-alt')
        this.icon = 'th'
      else if (this.icon === 'th')
        this.icon = 'globe'

      this.$eventBus.$emit('toggleDisplayMode')
    }
  }
}
</script>

<style scoped>

</style>
