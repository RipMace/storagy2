<template>
    <div v-if="!loading">
        <Menu />
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
  import Menu from "./Menu.vue";
  import NoLocations from "./NoLocations.vue";
  import CategoryList from "./CategoryList.vue";
  import { getAllLocationsAction } from '../services/firebase';
  import EventBus from '../services/event-bus';

  export default {
    name: "Home",
    components: {
      CategoryList,
      Toolbar,
      Menu,
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
    mounted() {
      EventBus.$on('reloadCategories', this.getAllLocations);
    },
    methods: {
      getAllLocations() {
        getAllLocationsAction().then((locations) => {
          this.loading = false;
          this.noLocations = locations.empty;
          this.locationList = locations.docs;
        });
      }
    },
    created() {
      this.getAllLocations()
    },
  }
</script>

<style scoped lang="scss">
    .content-wrapper {
        margin-top: 40px;
        padding: 10px;
    }
</style>
