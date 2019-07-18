<template>
    <ul class="mdc-list mdc-list--two-line mdc-list--avatar-list">
        <li class="mdc-list-item" tabindex="0" v-for="loc in evaluatedLocations" @click="changeRoute(loc.id)">
            <span class="mdc-list-item__graphic material-icons" aria-hidden="true">kitchen</span>
            <span class="mdc-list-item__text">
              <span class="mdc-list-item__primary-text">{{loc.name}}</span>
              <span v-if="loc.description" class="mdc-list-item__secondary-text">{{loc.description}}</span>
            </span>
            <div class="mdc-list-item__meta">
                <span style="margin-right: 20px">{{loc.count || 0}}</span>
                 <a class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon"
                    title="Delete"
                    @click.stop="deleteLocation(loc.id)">
                     delete
                 </a>
            </div>
        </li>
    </ul>
</template>

<script>

  import { MDCList } from '@material/list';
  import { MDCRipple } from '@material/ripple';
  import EventBus from '../../services/event-bus';
  import { deleteLocationAction } from '../../services/firebase';

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
      deleteLocation(locationId) {
        const confirm = window.confirm(`Sei sicuro di eliminare la sezione? Eliminerai tutto il suo contenuto.`);
        if (confirm) {
          deleteLocationAction(locationId).then(() => EventBus.$emit('reloadCategories'));
        }
      }
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

        .mdc-list-item__primary-text {
            margin-bottom: 0;
        }
        .mdc-list-item__secondary-text {
            margin-top: -20px;
        }
    }

    .mdc-list--avatar-list .mdc-list-item__graphic {
        background-color: rgba(0,0,0,.3);
        color: $white;
    }

    .mdc-list-item__meta {
        display: flex;
        align-items: center;
    }
</style>
