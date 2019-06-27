<template>
    <div class="loading-wrapper">
        <svg class="circular">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="10" />
        </svg>
    </div>
</template>

<script>
  export default {
    name: "Loading",
  }
</script>

<style scoped lang="scss">
    @import "../../variables.scss";
    $width: 100px;

    .loading-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100%;

        .circular {
            animation: rotate 2s linear infinite;
            height: $width;
            position: relative;
            width: $width;
        }

        .path {
            stroke-dasharray: 1,200;
            stroke-dashoffset: 0;
            animation: dash 1.5s ease-in-out infinite;
            stroke-linecap: round;
            stroke: $mdc-theme-primary;
        }
    }

    @keyframes rotate{
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes dash{
        0%{
            stroke-dasharray: 1,200;
            stroke-dashoffset: 0;
        }
        50%{
            stroke-dasharray: 89,200;
            stroke-dashoffset: -35;
        }
        100%{
            stroke-dasharray: 89,200;
            stroke-dashoffset: -124;
        }
    }
</style>
