<template>
    <div v-if="!loading">
        <Toolbar v-if="!noLocations" />
        <main class="content-wrapper" >
            <NoLocations v-if="noLocations" />
            <CategoryList :locations="locationList" v-else />
        </main>
    </div>
    <div v-else >
        LOADING
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
        locationList: {
          type: Array,
          default: [],
        },
        noLocations: Boolean,
        loading: {
          type: Boolean,
          default: true,
        },
      }
    },
    created() {
      getAllLocations().then((locations) => {
        this.loading = false;
        this.noLocations = locations.empty;
        this.locationList = locations.docs;
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
