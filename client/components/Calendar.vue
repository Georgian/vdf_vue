<template>
  <div>
    <no-ssr>
      <v-calendar
        :columns="$screens({ default: 1, lg: 2 })"
        :rows="$screens({ default: 1, lg: 2 })"
        :is-expanded="$screens({ default: true, lg: false })"
      >
        <div slot='day-content' slot-scope="props" class="my-day">
          {{props.day.day}}
        </div>
      </v-calendar>
    </no-ssr>
  </div>
</template>

<script>
export default {
  name: 'vdf-map'
}
</script>

<style>
/* Set width and height and `v-calendar` will resize appropriately */
.my-day {
  width: 40px;
  height: 40px;
}
/* You can also apply your own hover styles */
.my-day:hover {
  background-color: #dadada;
}
</style>
