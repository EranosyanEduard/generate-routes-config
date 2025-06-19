<template>
  <div><span>Admin</span><span>Home</span><Aaa /></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import A from "./A.vue";
export default defineComponent({
  name: "Home",
  components: { Aaa: A },
});
</script>
