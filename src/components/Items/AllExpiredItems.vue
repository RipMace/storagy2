<template>
    <div v-if="!loading">
        <div v-if="noItems">
            <ToolbarBase title="Lista in Scadenza" />
            <NoExpiredItems />
        </div>
        <div v-else>
            <Toolbar
                placeholder="Storagy"
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
  import ToolbarBase from "../shared/ToolbarBase.vue";
  import Loading from "../shared/Loading.vue";
  import NoExpiredItems from "./NoExpiredItems.vue";
  import ItemsList from "./ItemsList.vue";
  import { checkDueDate } from '../../components/utils/checkDue';
  import EventBus from '../../services/event-bus';
  import {
    getAllItemsAction,
  } from "../../services/firebase";

  export default {
    name: "Items",
    components: {
      Loading,
      Toolbar,
      ToolbarBase,
      NoExpiredItems,
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
          this.itemsList = itemsList.filter((item) => item.due && checkDueDate(item.due) && item.amount);
          this.noItems = !this.itemsList.length;
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
