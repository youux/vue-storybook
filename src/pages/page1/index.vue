<template>
  <div>
    <form-module :temp="formTemp" :data="fromData" :width="120">
      <el-button slot-scope="{data}" type="primary" @click="getData(data)">提交</el-button>
    </form-module>
  </div>
</template>

<script>
export default {
  name: 'page1',
  data () {
    return {
      formTemp: [
        {
          label: '文本',
          key: 'name1',
          type: 'input'
        },
        {
          label: '文本域',
          key: 'name2',
          type: 'textarea'
        },
        {
          label: '数值',
          key: 'name3',
          type: 'number'
        },
        {
          label: '日期',
          key: 'name4',
          type: 'data'
        },
        {
          label: '日期+时间',
          key: 'name5',
          type: 'datetime'
        },
        {
          label: '时间段',
          key: 'name6',
          type: 'datepicker'
        },
        {
          label: '多选',
          key: 'name7',
          type: 'checkbox',
          options: [
            {
              label: '选项1',
              key: 1
            },
            {
              label: '选项2',
              key: 2
            },
            {
              label: '选项3',
              key: 3
            }
          ]
        },
        {
          label: '单选',
          key: 'name8',
          type: 'radio',
          options: [
            {
              label: '选项1',
              key: 1
            },
            {
              label: '选项2',
              key: 2
            },
            {
              label: '选项3',
              key: 3
            }
          ]
        },
        {
          label: '选择器',
          key: 'name9',
          type: 'select',
          options: [
            {
              label: '选项1',
              key: 1
            },
            {
              label: '选项2',
              key: 2
            },
            {
              label: '选项3',
              key: 3
            }
          ]
        },
        {
          label: '选择器+多选',
          key: 'name10',
          type: 'select-multiple',
          options: [
            {
              label: '选项1',
              key: 1
            },
            {
              label: '选项2',
              key: 2
            },
            {
              label: '选项3',
              key: 3
            }
          ]
        },
        {
          label: '选择器+级联',
          key: 'name11',
          type: 'select-cascader',
          options: [
            {
              label: '选项1',
              key: 1
            },
            {
              label: '选项2',
              key: 2
            },
            {
              label: '选项3',
              key: 3
            }
          ]
        },
        {
          label: '选择器+联动',
          key: 'name14',
          type: 'radio',
          cascader: true,
          options: [
            {
              label: '选项1',
              key: 1,
              cascader: ['name15']
            },
            {
              label: '选项2',
              key: 2,
              cascader: ['name16']
            },
            {
              label: '选项3',
              key: 3,
              cascader: ['name17']
            }
          ]
        },
        {
          label: '文本1',
          key: 'name15',
          type: 'input',
          prepend: 'prepend',
          show: false
        },
        {
          label: '文本2',
          key: 'name16',
          type: 'input',
          append: 'append',
          show: false
        },
        {
          label: '文本3',
          key: 'name17',
          type: 'input',
          prepend: 'prepend',
          append: 'append',
          show: false
        },
        {
          label: '累加',
          key: 'name12',
          type: 'add'
        },
        {
          label: '上传',
          key: 'name13',
          type: 'upload',
          upload: {
            action: ''
          }
        }
      ],
      fromData: {}
    }
  },
  methods: {
    getData (data) {
      console.log(data)
    }
  }
}
</script>
