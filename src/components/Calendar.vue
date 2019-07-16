<template>
    <div v-if="!loading">
        <div v-if="noItems">
            noItems
        </div>
        <div v-else>
            <ToolbarBase title="Calendario" />
            <div class="content-wrapper">
                <vue-cal
                 :time="false"
                 locale="it"
                 xsmall
                 style="height: 475px"
                 class="vuecal--green-theme"
                 default-view="month"
                 clickToNavigate
                 events-on-month-view="short"
                 :disable-views="['years', 'year', 'week']"
                 :events="itemsList">
                </vue-cal>
            </div>
        </div>
    </div>
    <Loading v-else/>
</template>

<script>
  import { getAllItemsAction } from './../services/firebase';
  import VueCal from 'vue-cal';
  import 'vue-cal/dist/vuecal.css';
  import { checkDueDate } from './utils/checkDue';
  import ToolbarBase from "./shared/ToolbarBase.vue";
  import Loading from "./shared/Loading.vue";

  export default {
    name: "Calendar",
    components: {
      VueCal,
      ToolbarBase,
      Loading,
    },
    data() {
      return {
        itemsList: [],
        noItems: false,
        loading: true
      }
    },
    methods: {
      getAllItems() {
        this.loading = true;
        getAllItemsAction().then((itemsList) => {
          this.noItems = !itemsList.length;
          this.itemsList = itemsList
            .filter((item) => item.due)
            .map((item) => (
            {
              start: item.due,
              end: item.due,
              title: item.name,
              allDay: true,
              content: `<div class="mdc-card item-event-card">
                            <h3 class="item-card__subtitle mdc-typography mdc-typography--subtitle2">
                                Quantità:  ${item.amount}
                                <br>
                                Sezione: ${item.locationName}
                            </h3>
                        </div>`,
              class: checkDueDate(item.due) ? 'due' : 'standard'
            }));
          this.loading = false;
        })
      },
    },
    created() {
      this.getAllItems()
    },
  }
</script>

<style lang="scss">
    @import "./../variables.scss";

    .content-wrapper {
        margin-top: 50px;
        padding: 10px;
    }

    .due {
        background-color: $mdc-theme-background;
        border: 1px solid goldenrod;
        border-radius: 4px;
        color: $black;
    }

    .standard {
        background-color: $greyLighter;
        border: 1px solid $greyDarker;
        border-radius: 4px;
        color: $black;
    }

    .vuecal {
        margin-top: 10px;
        border-radius: 4px;
    }

    .vuecal__menu li {
        font-size: 16px;
        padding: 7px 20px;
        width: 50%;
        text-align: center;
        border-bottom-color: $link-color;
    }

    .vuecal__title {
        font-size: 14px;
    }

    .vuecal__event-title {
        padding: 10px;
        font-size: 16px;
    }

    .vuecal__cell-date {
        position: absolute;
        top: 0;
        right: 0;
        padding: 5px;
        font-size: 12px;
    }

    .vuecal--green-theme .vuecal__menu {
        background-color: $mdc-theme-primary;
        margin: 0;
    }
</style>
