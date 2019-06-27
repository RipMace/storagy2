<template>
    <div v-if="!loading">
        <div>
            <Toolbar />
            <div class="content-wrapper">
                ITEMS
            </div>
        </div>
    </div>
    <div v-else>
        LOADING
    </div>
</template>

<script>
  import { getAllLocationsAction } from '../../services/firebase';
  import EventBus from '../../services/event-bus';
  import Toolbar from "../shared/Toolbar.vue";

  export default {
    name: "Items",
    components: {
      Toolbar,
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
      },
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
