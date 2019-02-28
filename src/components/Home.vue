<template>
    <div>
        <Toolbar />
        <CategoryList />
    </div>
</template>

<script>
  import Toolbar from "./Toolbar.vue";
  import CategoryList from "./CategoryList.vue";
  export default {
    name: "Home",
    components: {
      CategoryList,
      Toolbar
    },
  }
</script>

<style scoped lang="scss">

</style>
