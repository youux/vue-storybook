<template>
  <button type="button" :class="classes" @click="onClick" :style="style">
    <slot></slot>
  </button>
</template>

<script>

export default {
  name: 'button-module',
  props: {
    type: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].indexOf(value) !== -1
    },
    backgroundColor: {
      type: String
    }
  },

  computed: {
    classes () {
      return {
        'vue-button': true,
        'vue-button-secondary': !this.type,
        [`vue-button-${this.type}`]: this.type,
        [`vue-button-${this.size}`]: true
      }
    },
    style () {
      return {
        backgroundColor: this.backgroundColor
      }
    }
  },

  methods: {
    onClick () {
      this.$emit('onClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.storybook-button {
  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 700;
  line-height: 1;
  display: inline-block;
  cursor: pointer;
  border: 0;
  border-radius: 3em;
}
.storybook-button-primary {
  color: white;
  background-color: #1ea7fd;
}
.storybook-button-error {
  color: white;
  background-color: #ed4014;
}
.storybook-button-success {
  color: white;
  background-color: #19be6b;
}
.storybook-button-secondary {
  color: #333;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.15) 0 0 0 1px inset;
}
.storybook-button-small {
  font-size: 12px;
  padding: 10px 16px;
}
.storybook-button-medium {
  font-size: 14px;
  padding: 11px 20px;
}
.storybook-button-large {
  font-size: 16px;
  padding: 12px 24px;
}
</style>
