<template>
    <div class="toggle-field-wrapper">
        <div class="mdc-switch" :id="fieldId + 'Field'">
            <div class="mdc-switch__track"></div>
            <div class="mdc-switch__thumb-underlay">
                <div class="mdc-switch__thumb">
                    <input
                        type="checkbox"
                        :id="fieldId"
                        class="mdc-switch__native-control"
                        role="switch"
                        :checked="value"
                        @change="$emit('input', $event.target.checked)"
                    >
                </div>
            </div>
        </div>
        <label class="label-placeholder" :for="fieldId">{{placeholder}}</label>
    </div>
</template>

<script>
  import { MDCSwitch } from '@material/switch';

  export default {
    name: "ToggleField",
    props: {
      value: Boolean,
      fieldId: String,
      placeholder: String,
    },
    mounted() {
      const switchControl = new MDCSwitch(document.querySelector('#' + this.fieldId + 'Field'));
    },
  }
</script>

<style scoped lang="scss">
    @import "../.././variables.scss";
    @import "~@material/switch/mdc-switch";

    .toggle-field-wrapper {
        margin-top: 20px;
    }

    .label-placeholder {
        margin-left: 10px;
    }
</style>
