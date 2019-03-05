<template>
    <div>
        <Toolbar v-if="!noLocations" />
        <main class="content-wrapper">
            <NoLocations v-if="noLocations"/>
            <CategoryList v-else/>
        </main>
    </div>
</template>

<script>
  import Toolbar from "./Toolbar.vue";
  import NoLocations from "./NoLocations.vue";
  import CategoryList from "./CategoryList.vue";
  import { getAllLocations } from '../services/firebase';
  export default {
    name: "Home",
    components: {
      CategoryList,
      Toolbar,
      NoLocations,
    },
    data() {
      return {
        noLocations: Boolean,
      }
    },
    beforeCreate() {
      let { noLocations } = this;
      getAllLocations().then((locations) => {
        console.log(locations)
        // if (locations.empty) {
        //   noStores = true;
        // }
      });
    },
  }
</script>

<style scoped lang="scss">
    .content-wrapper {
        margin-top: 40px;
        padding: 10px;
    }
</style>
