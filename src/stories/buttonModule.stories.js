import buttonModule from '../components/button-module/index.vue'

export default {
  title: 'Button 按钮',
  component: buttonModule,
  argTypes: {
    backgroundColor: {
      control: 'color',
      description: '这里是背景',
      table: {
        defaultValue: {
          summary: '#fc0'
        }
      }
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large']
      }
    },
    primary: {
      control: {
        type: 'boolean'
      }
    },
    onClick: {
      action: 'clicked',
      description: '点击事件',
      table: {
        type: {
          summary: 'function'
        }
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { buttonModule },
  template: '<button-module @onClick="onClick" v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  label: 'Button',
  backgroundColor: '#fc0'
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'Button'
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'Button'
}
