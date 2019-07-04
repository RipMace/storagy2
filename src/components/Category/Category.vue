<template>
    <div v-if="!loading">
        <NoLocations v-if="noLocations" />
        <div v-else>
            <Toolbar
                placeholder="Storagy"
                :changeTextFilter="changeTextFilter"
                addAction="CreateLocation"
            />
            <div class="content-wrapper">
                <CategoryList :textFilter="textFilter" :locations="locationList" />
            </div>
        </div>
    </div>
    <Loading v-else/>
</template>

<script>
  import NoLocations from "./NoLocations.vue";
  import CategoryList from "./CategoryList.vue";
  import { getAllLocationsAction } from '../../services/firebase';
  import EventBus from '../../services/event-bus';
  import Toolbar from "../shared/Toolbar.vue";
  import Loading from "../shared/Loading.vue";

  export default {
    name: "Category",
    components: {
      Toolbar,
      CategoryList,
      NoLocations,
      Loading,
    },
    data() {
      return {
        locationList: [],
        noLocations: Boolean,
        textFilter: '',
        loading: true
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
      changeTextFilter(event) {
        this.textFilter = event.target.value;
      },
    },
    created() {
      this.getAllLocations()
    },
  }
</script>

<style scoped lang="scss">
    .content-wrapper {
        margin-top: 50px;
        padding: 10px;
    }
</style>
