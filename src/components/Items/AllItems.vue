<template>
    <div v-if="!loading">
        <NoItems v-if="noItems"/>
        <div v-else>
            <Toolbar
                placeholder="Storagy"
                addAction="CreateItem"
                editMode
                :changeTextFilter="changeTextFilter"
                :changeSort="changeSort"
                :orderBy="['NAME', 'DUE', 'AMOUNT']"
                :currentSort="sort"
            />
            <ItemsList
                showCategory
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
    getAllItemsAction,
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
        textFilter: '',
        sort: { key: 'name', type: 'String' },
        loading: true,
        noItems: true,
      }
    },
    mounted() {
      EventBus.$on('reloadItems', this.getAllItems);
    },
    methods: {
      getAllItems() {
        this.loading = true;
        getAllItemsAction().then((itemsList) => {
          this.noItems = !itemsList.length;
          this.itemsList = itemsList;
          this.loading = false;
        })
      },
      changeTextFilter(event) {
        this.textFilter = event.target.value;
      },
      changeSort(sort) {
        this.sort = sort;
      },
    },
    created() {
      this.getAllItems();
    },
  }
</script>

<style scoped lang="scss">
</style>
