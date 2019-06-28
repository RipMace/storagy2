<template>
    <ul class="mdc-list mdc-list--two-line mdc-list--avatar-list">
        <li class="mdc-list-item" tabindex="0" v-for="item in evaluatedItems" @click="changeRoute(item.id)">
            <span class="mdc-list-item__graphic material-icons" aria-hidden="true">folder</span>
            <span class="mdc-list-item__text">
              <span class="mdc-list-item__primary-text">{{item.name}}</span>
              <span v-if="item.description" class="mdc-list-item__secondary-text">{{item.description}}</span>
            </span>
            <span class="mdc-list-item__meta">5</span>
        </li>
    </ul>
</template>

<script>

  import { MDCList } from '@material/list';
  import { MDCRipple } from '@material/ripple';

  export default {
    name: "ItemsList",
    props: {
      items: Array,
    },
    mounted() {
      const list = new MDCList(document.querySelector('.mdc-list'));
      const listItemRipples = list.listElements.map((listItemEl) => new MDCRipple(listItemEl));
    },
    methods: {
      changeRoute(itemId) {
        this.$router.push({ name: 'CategoryItemsItem', params: { itemId } });
      },
    },
    computed: {
      evaluatedItems () {
        return this.items.map((item) => ({ id: item.id, ...item.data() }));
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../../variables.scss";

    .mdc-list-item {
        border-radius: 8px;
    }
    .mdc-list--avatar-list .mdc-list-item__graphic {
        background-color: rgba(0,0,0,.3);
        color: $white;
    }
</style>
