<template>
    <ul class="mdc-list mdc-list--two-line mdc-list--avatar-list">
        <li class="mdc-list-item" tabindex="0" v-for="loc in evaluatedLocations">
        <span class="mdc-list-item__graphic material-icons" aria-hidden="true">folder</span>
        <span class="mdc-list-item__text">
          <span class="mdc-list-item__primary-text">{{loc.name}}</span>
          <span class="mdc-list-item__secondary-text">Second-line text</span>
        </span>
        </li>
    </ul>
</template>

<script>

  import { MDCList } from '@material/list';
  import { MDCRipple } from '@material/ripple';

  export default {
    name: "CategoryList",
    props: {
      locations: Array,
    },
    data() {
      return {
        category: Object,
      }
    },
    mounted() {
      const list = new MDCList(document.querySelector('.mdc-list'));
      const listItemRipples = list.listElements.map((listItemEl) => new MDCRipple(listItemEl));
    },
    computed: {
      evaluatedLocations () {
        return this.locations.map((loc) => loc.data())
      }
    }
  }
</script>

<style scoped lang="scss">
    @import ".././variables.scss";

    .mdc-list-item {
        border-radius: 8px;
    }
    .mdc-list--avatar-list .mdc-list-item__graphic {
        background-color: rgba(0,0,0,.3);
        color: $white;
    }
</style>
