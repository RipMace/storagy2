<template>
    <div class="empty-state-wrapper">
        <div class="icon">
            <object type="image/svg+xml" data="images/empty_state.svg" width="300" height="300" />
        </div>
        <h4>
            Il tuo Storagy sembra vuoto...
        </h4>
        <p>
            Crea una sezione ed inizia a riempirla!
        </p>
        <CreateLocation>
            <button class="mdc-button--raised">
                Crea Sezione
            </button>
        </CreateLocation>
    </div>
</template>


<script>
  import CreateLocation from "./actions/CreateLocation.vue";
  export default {
    name: "NoLocations",
    components: {
      CreateLocation,
    },
  }
</script>

<style scoped lang="scss">
    @import ".././variables.scss";

    @keyframes icon-action {
        0% { transform: translateY(0); }
        100% { transform: translateY(-10px); }
    }

    .empty-state-wrapper {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-top: 40px;

        .icon {
            background: whitesmoke;
            border-radius: 50%;
            padding: 50px;

            object {
                top: -15px;
                position: relative;
                animation: icon-action 1.5s infinite  alternate;
            }
        }
    }

</style>
