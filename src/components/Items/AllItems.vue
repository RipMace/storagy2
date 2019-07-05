<template>
    <div v-if="!loading">
<!--        <NoItems v-if="noItems" :location="location"/>-->
<!--        <div v-else>-->
<!--            <Toolbar-->
<!--                :placeholder="location.name"-->
<!--                :locationId="location.id"-->
<!--                addAction="CreateItem"-->
<!--                :changeTextFilter="changeTextFilter"-->
<!--                :changeSort="changeSort"-->
<!--                goBackRoute="Category"-->
<!--                :orderBy="['NAME', 'DUE', 'AMOUNT']"-->
<!--                :currentSort="sort"-->
<!--            />-->
<!--            <ItemsList-->
<!--                showCategory-->
<!--                :location="location"-->
<!--                :items="itemsList"-->
<!--                :textFilter="textFilter"-->
<!--                :sort="sort"-->
<!--            />-->
<!--        </div>-->
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
        location: {},
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
          console.log(itemsList)
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
