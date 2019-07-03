<template>
    <ul class="mdc-list mdc-list--two-line mdc-list--avatar-list">
        <li class="mdc-list-item" tabindex="0" v-for="loc in evaluatedLocations" @click="changeRoute(loc.id)">
            <span class="mdc-list-item__graphic material-icons" aria-hidden="true">folder</span>
            <span class="mdc-list-item__text">
              <span class="mdc-list-item__primary-text">{{loc.name}}</span>
              <span v-if="loc.description" class="mdc-list-item__secondary-text">{{loc.description}}</span>
            </span>
            <span class="mdc-list-item__meta">{{loc.count || 0}}</span>
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
      textFilter: String,
    },
    mounted() {
      const list = new MDCList(document.querySelector('.mdc-list'));
      const listItemRipples = list.listElements.map((listItemEl) => new MDCRipple(listItemEl));
    },
    methods: {
      changeRoute(id) {
        this.$router.push({ name: 'CategoryItems', params: { id } });
      },
    },
    computed: {
      evaluatedLocations () {
        return this.locations
          .map((loc) => ({ id: loc.id, ...loc.data() }))
          .filter((loc) => loc.name.includes(this.textFilter));
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
