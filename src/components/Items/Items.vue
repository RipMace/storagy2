<template>
    <div v-if="!loading">
        <NoItems v-if="noItems" :location="location"/>
        <div v-else>
            <Toolbar
                :placeholder="location.name"
                :locationId="location.id"
                addAction="CreateItem"
                disableLocation
                :changeTextFilter="changeTextFilter"
                :changeSort="changeSort"
                goBackRoute="Category"
                :orderBy="['NAME', 'DUE', 'AMOUNT']"
                :currentSort="sort"
            />
            <ItemsList
                :location="location"
                :items="itemsList"
                :textFilter="textFilter"
                :sort="sort"
            />
        </div>
    </div>
    <Loading v-else/>
</template>

<script>
  import Toolbar from "../shared/Toolbar.vue";
  import Loading from "../shared/Loading.vue";
  import NoItems from "./NoItems.vue";
  import ItemsList from "./ItemsList.vue";

  import EventBus from '../../services/event-bus';
  import {
    getLocationAction,
    getAllLocationItemsAction,
  } from "../../services/firebase";

  export default {
    name: "Items",
    components: {
      Loading,
      Toolbar,
      NoItems,
      ItemsList,
    },
    data() {
      return {
        itemsList: [],
        location: {},
        textFilter: '',
        sort: { key: 'name', type: 'String' },
        loading: true,
        noItems: true,
      }
    },
    mounted() {
      EventBus.$on('reloadItems', this.getAllLocationItems);
    },
    methods: {
      getAllLocationItems(locId) {
        this.loading = true;
        getAllLocationItemsAction(locId).then((items) => {
          this.loading = false;
          this.noItems = items.empty;
          this.itemsList = items.docs.map((item) => ({ itemId: item.id, ...item.data() }));
        });
      },
      getLocation(locId) {
        getLocationAction(locId).then((loc) => {
          this.location = { id: locId, ...loc.data() };
        });
      },
      changeTextFilter(event) {
        this.textFilter = event.target.value;
      },
      changeSort(sort) {
        this.sort = sort;
      },
    },
    created() {
      this.getLocation(this.$route.params.id);
      this.getAllLocationItems(this.$route.params.id);
    },
  }
</script>

<style scoped lang="scss">
</style>
