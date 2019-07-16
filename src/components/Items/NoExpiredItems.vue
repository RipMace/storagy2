<template>
    <div class="empty-state-wrapper">
        <div class="icon">
            <object class="material-icons">thumb_up</object>
        </div>
        <h4>
            Ben fatto!
        </h4>
        <p>
            Nessun prodotto in scadenza!
        </p>
    </div>
</template>


<script>
  export default {
    name: "NoExpiredItems",
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
                font-size: 130px;
                color: $mdc-theme-primary;
            }
        }
    }

</style>
