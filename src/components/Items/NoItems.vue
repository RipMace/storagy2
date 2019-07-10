<template>
    <div class="empty-state-wrapper">
        <div class="icon">
            <object type="image/svg+xml" data="images/add_to.svg"/>
        </div>
        <h4>
            Il tuo scaffale sembra vuoto...
        </h4>
        <p>
            Aggiungi un elemento e riempilo!
        </p>
        <CreateItem :fromLocation="location" disableLocation>
            <button class="mdc-button--raised" style="margin-top: 20px">
                Aggiungi
            </button>
        </CreateItem>
        <button class="mdc-button" style="margin-top: 20px" @click="goBack">
            Torna indietro
        </button>
    </div>
</template>


<script>
  import CreateItem from "../actions/CreateItem.vue";
  export default {
    name: "NoItem",
    components: {
      CreateItem,
    },
    props: {
      location: Object,
    },
    methods: {
      goBack() {
        this.$router.push({ name: 'Category' });
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../../variables.scss";

    @keyframes icon-action {
        0% { transform: translateY(0); }
        100% { transform: translateY(-10px); }
    }

    .empty-state-wrapper {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 60px 0;
        text-align: center;

        .icon {
            background: whitesmoke;
            border-radius: 50%;

            object {
                top: -15px;
                position: relative;
                animation: icon-action 1.5s infinite  alternate;
                width: 60%;
                height: 60%;
            }
        }
    }

</style>
