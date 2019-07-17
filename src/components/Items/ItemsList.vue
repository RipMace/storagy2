<template>
    <div id="swipeWrapper" class="swipe-wrapper">
        <ul class="mdc-image-list-grid">
            <li class="mdc-image-list__item" tabindex="0" v-for="item in evaluatedItems">
                <Item
                    :item="item"
                    :showCategory="showCategory"
                    :location="location"
                />
            </li>
        </ul>
    </div>
</template>

<script>
  import Hammer from 'hammerjs';
  import Item from './Item.vue';
  import { stringSort, dateSort, numberSort } from '../utils/sorter';

  export default {
    name: "ItemsList",
    props: {
      items: Array,
      showCategory: Boolean,
      location: Object,
      textFilter: String,
      sort: Object,
    },
    components: {
      Item
    },
    mounted() {
      const swipeWrapper = document.getElementById('swipeWrapper');
      const hammertime = Hammer(swipeWrapper).on('swipe', () => this.$router.push({ name: 'Category' }));
      hammertime.get('swipe').set({ direction: Hammer.DIRECTION_RIGHT });
    },
    computed: {
      evaluatedItems() {
       const sorting = { ...this.sort };
        const items = this.items
          .filter((item) => item.name.includes(this.textFilter));
        if (Object.keys(sorting).length) {
          if (sorting.type === 'String') {
            return stringSort(items, sorting.key)
          }
          if (sorting.type === 'Date') {
            return dateSort(items, sorting.key);
          }
          if (sorting.type === 'Number') {
            return numberSort(items, sorting.key);
          }
        }
        return items
      },
    }
  }
</script>

<style scoped lang="scss">
    @import "~@material/image-list/mdc-image-list";
    @import "~@material/icon-button/mdc-icon-button";
    @import "../../variables.scss";

    .swipe-wrapper {
        height: 95vh;
        width: 100%;
    }

    .mdc-image-list-grid {
        padding: 60px 10px 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
        grid-gap: 16px;
    }
</style>
