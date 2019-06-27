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
        <Loading />
    </div>
</template>

<script>
  import Toolbar from "../shared/Toolbar.vue";
  import Loading from "../shared/Loading.vue";

  export default {
    name: "Items",
    components: {
      Loading,
      Toolbar,
    },
    data() {
      return {
        loading: {
          type: Boolean,
          default: false,
        },
      }
    },
    created() {
      console.log(this.$route)
    },
  }
</script>

<style scoped lang="scss">
    .content-wrapper {
        margin-top: 40px;
        padding: 10px;
    }
</style>
