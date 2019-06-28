<template>
    <div v-if="!loading">
        <NoItems v-if="noItems" :locationId="$route.params.id"/>
        <div v-else>
            <Toolbar />
            <div class="content-wrapper">
                <ItemsList :items="itemsList"
                />
            </div>
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
  import { getAllLocationItemsAction } from "../../services/firebase";

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
        loading: true,
        noItems: true,
      }
    },
    mounted() {
      EventBus.$on('reloadItems', this.getAllLocationItems);
    },
    methods: {
      getAllLocationItems(locId) {
        getAllLocationItemsAction(locId).then((items) => {
          this.loading = false;
          this.noItems = items.empty;
          this.itemsList = items.docs;
        });
      },
    },
    created() {
      this.getAllLocationItems(this.$route.params.id)
    },
  }
</script>

<style scoped lang="scss">
    .content-wrapper {
        margin-top: 40px;
        padding: 10px;
    }
</style>
