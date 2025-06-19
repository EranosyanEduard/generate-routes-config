<template>
  <div>A</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "A",
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate");
    next();
  },
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter");
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("beforeRouteLeave");
    next();
  },
});
</script>
