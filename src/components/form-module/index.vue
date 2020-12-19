<template>
  <el-form size="small" :model="formData" :label-width="width+'px'">
    <el-form-item :style="widthStyle" v-for="item in formTemp" :key="item.key" v-show="item.show">
      <div class="form-label" slot="label">
        <span v-if="item.required">*</span>{{item.label}}
      </div>
      <template v-if="item.tips">
        <el-tooltip class="item" effect="dark" placement="top">
          <div slot="content" v-html="item.tips"></div>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </template>
      <!-- 文本 -->
      <div :class="{'input-box':item.prepend||item.append}" v-if="item.type === 'input'">
        <span class="prepend" v-if="item.prepend">{{item.prepend}}</span>
        <el-input v-model="formData[item.key]" :disabled="show"></el-input>
        <span class="append" v-if="item.append">{{item.append}}</span>
      </div>

      <!-- 文本域 -->
      <template v-if="item.type === 'textarea'">
        <el-input type="textarea" :rows="item.row||3" :maxlength="item.maxlength" v-model="formData[item.key]" :show-word-limit="!!item.maxlength" :disabled="show"></el-input>
      </template>

      <!-- 数值 -->
      <template v-if="item.type === 'number'">
        <el-input-number class="item-all" v-model="formData[item.key]" controls-position="right" :disabled="show"></el-input-number>
      </template>

      <!-- 日期 -->
      <template v-if="item.type === 'date'">
        <el-date-picker class="item-all" v-model="formData[item.key]" type="date" value-format="yyyy-MM-dd" :disabled="show" @blur="changeDate(item.key,formData[item.key])"></el-date-picker>
      </template>

      <!-- 日期+时间 -->
      <template v-if="item.type === 'datetime'">
        <el-date-picker class="item-all" v-model="formData[item.key]" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :disabled="show" @blur="changeDate(item.key,formData[item.key])"></el-date-picker>
      </template>

      <!-- 时间段 -->
      <div class="datepicker-box" v-if="item.type === 'datepicker'">
        <el-date-picker v-model="formData[item.key].start" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :disabled="show" @blur="changeDate(item.key,formData[item.key])"></el-date-picker>
        <span> - </span>
        <el-date-picker v-model="formData[item.key].end" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :disabled="show" @blur="changeDate(item.key,formData[item.key])"></el-date-picker>
      </div>

      <!-- 多选 -->
      <template v-if="item.type === 'checkbox'">
        <el-checkbox-group v-model="formData[item.key]" :disabled="show" @change="changeCascader($event,item)">
          <el-checkbox v-for="li in item.options" :key="li.key" :label="li.key">{{li.label}}</el-checkbox>
        </el-checkbox-group>
      </template>

      <!-- 单选 -->
      <template v-if="item.type === 'radio'">
        <el-radio-group v-model="formData[item.key]" :disabled="show" @change="changeCascader($event,item)">
          <el-radio v-for="li in item.options" :key="li.key" :label="li.key">{{li.label}}</el-radio>
        </el-radio-group>
      </template>

      <!-- 级联选择器 -->
      <template v-if="item.type === 'cascader'">
        <el-cascader class="item-all" v-model="formData[item.key]" :options="item.options" :props="item.props" :disabled="show"></el-cascader>
      </template>

      <!-- 选择器 -->
      <template v-if="item.type === 'select'">
        <el-select class="item-all" v-model="formData[item.key]" :disabled="show" @change="changeCascader($event,item)">
          <el-option v-for="li in item.options" :key="li.key" :label="li.label" :value="li.key"></el-option>
        </el-select>
      </template>

      <!-- 选择器+多选 -->
      <template v-if="item.type === 'select-multiple'">
        <el-select multiple collapse-tags class="item-all" v-model="formData[item.key]" :disabled="show" value-key="key">
          <el-option v-for="li in item.options" :key="li.key" :label="li.label" :value="li"></el-option>
        </el-select>
      </template>

      <!-- 选择器+默认 -->
      <template v-if="item.type === 'select-cascader'">
        <el-select multiple collapse-tags class="item-all" v-model="formData[item.key]" :disabled="show" value-key="key" @change="changeSelectCascader">
          <el-option v-for="li in item.options" :key="li.key" :label="li.label" :value="li"></el-option>
        </el-select>
        <div class="is-default">
          <div class="label">选择默认值</div>
          <el-select class="item-all" v-model="isDefault" :disabled="show" value-key="key" @change="changeDefault($event,item.key)">
            <el-option v-for="li in formData[item.key]" :key="li.key" :label="li.label" :value="li"></el-option>
          </el-select>
        </div>
      </template>

      <!-- 累加 -->
      <template v-if="item.type === 'add'">
        <div class="add-tag-wrap">
          <div class="tag-item" :class="{'is-avatar':li.thumb}" v-for="(li,index) in addList" :key="index">
            <el-upload :action="item.upload.action" :headers="item.upload.headers" :limit="item.upload.limit" :data="item.upload.data" :on-change="changeAddUpload" :show-file-list="false" :on-progress="progressUpload">
              <el-button icon="el-icon-upload" @click="getAddInfo(li,index)">{{li.value}}</el-button>
            </el-upload>
            <el-avatar shape="square" :size="33" :src="li.thumb" v-if="li.thumb"></el-avatar>
          </div>
        </div>
        <el-input class="input-new-tag" v-if="addInputVisible" v-model="addInput" ref="saveAddInput" @keyup.enter.native="addSubmit(item.key)" @blur="addSubmit(item.key)">
        </el-input>
        <el-button type="success" size="mini" v-else class="button-new-tag" icon="el-icon-plus" @click="showInput">添加</el-button>
      </template>

      <!-- 上传图片 -->
      <div class="item-all" v-if="item.type === 'upload'">
        <div class="upload-show" v-if="show">
          <div v-for="(pic,index) in fileList" :key="index">
            <el-image style="width: 100px; height: 100px" :src="pic.url" fit="contain"></el-image>
          </div>
          <div class="pic-none" v-if="!fileList.length">
            <i class="el-icon-hot-water"></i>
            <span>暂无图片</span>
          </div>
        </div>
        <el-upload :action="item.upload.action" :headers="item.upload.headers" :limit="item.upload.limit" :data="item.upload.data" :on-change="changeUpload" :on-remove="removeUpload" :show-file-list="item.upload.fileshow" :file-list="fileList" list-type="picture" v-else>
          <el-button icon="el-icon-upload">点击上传</el-button>
          <div slot="tip" class="el-upload__tip" v-if="item.upload.tips">{{item.upload.tips}}</div>
        </el-upload>
      </div>

      <!-- 选择器 -->
      <template v-if="item.type === 'slot'">
        <div class="item-all">
          <slot :name="item.key" :data="transData(formData)"></slot>
        </div>
      </template>
    </el-form-item>

    <el-form-item v-if="!show">
      <slot :data="transData(formData)"></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'form-module',
  props: {
    // 模板
    temp: {
      type: Array,
      required: true
    },
    // 填写的数据
    data: {
      type: Object,
      required: true
    },
    // label宽度
    width: {
      type: Number
    },
    // 是否显示slot
    show: {
      type: Boolean
    },
    // 一行显示多少个元素
    row: {
      type: Number
    }
  },
  data () {
    return {
      formData: {},
      // 选择器+默认
      isDefault: {},
      // 累加
      addList: [],
      addInputVisible: false,
      addInput: '',
      addItem: null,
      // 上传
      fileList: [],
      // 全局loading
      fullscreenLoading: null,
      // 联动选择器
      cascaderBox: null
    }
  },
  computed: {
    formTemp: {
      get () {
        const config = JSON.parse(JSON.stringify(this.temp))
        const data = JSON.parse(JSON.stringify(this.data))

        for (let i = 0; i < config.length; i++) {
          const element = config[i]
          if (element.show !== false) {
            element.show = true
          }

          if (element.tips) {
            if (element.tips.constructor === Array) {
              element.tips = element.tips.join('<br/>')
            }
          }

          const dKey = data[element.key]
          if (dKey != '' || dKey != null || dKey != undefined) {
            if (dKey) {
              if (element.cascader) {
                const list = element.options
                list.forEach(value => {
                  if (value.key == dKey) {
                    this.cascaderBox = value.cascader
                  }
                })
              }

              if (element.type == 'select-cascader') {
                dKey.forEach(element => {
                  if (element.isDefault == 1) {
                    this.isDefault = element
                  }
                })
              }

              if (element.type == 'add') {
                this.addList = dKey
              }

              if (element.type === 'upload') {
                for (const [key, value] of Object.entries(element.upload)) {
                  if (key === 'limit') {
                    if (value === 1) {
                      this.fileList = [{ url: dKey }]
                    } else {
                      // 多图情况
                    }
                  }
                }
              }
            } else {
              data[element.key] = ''
              if (element.type === 'upload') {
                this.fileList = []
              }
              if (element.type === 'checkbox') {
                data[element.key] = []
              }
              if (element.type === 'datepicker') {
                data[element.key] = {
                  start: null,
                  end: null
                }
              }
            }
          }
        }
        this.formData = data
        return config
      },
      set () { }
    },
    // 计算宽度
    widthStyle () {
      const style = {}
      if (this.row) {
        style.width = 100 / this.row + '%'
      }
      return style
    }
  },
  methods: {
    // 监控-时间选择
    changeDate (name, key, id) {
      if (id == 'undefined') {
        this.formData[name] = key
      }
      this.$forceUpdate()
    },
    // 监控-选择器+默认
    changeSelectCascader (data) {
      const isBool = data.every((e) => !e.isDefault)
      if (isBool) {
        this.isDefault = {}
      }
    },
    // 默认
    changeDefault (item, name) {
      const list = this.formData[name]
      list.forEach(element => {
        if (element.key === item.key) {
          element.isDefault = 1
        } else {
          element.isDefault = 0
        }
      })
    },
    // 监控选择
    changeCascader (key, item) {
      const config = this.formTemp
      const data = JSON.parse(JSON.stringify(item))
      if (data.cascader) {
        let showCascader = null
        const hideCascader = []

        if (data.options) {
          data.options.forEach(value => {
            hideCascader.push(...value.cascader)
            if (value.key == key) {
              showCascader = value.cascader
            }
          })
          if (showCascader) {
            showCascader.forEach(item => {
              hideCascader.splice(hideCascader.indexOf(item), 1)
            })
          }
        }
        if (hideCascader) {
          hideCascader.forEach(ce => {
            config.forEach((element, index) => {
              if (element.key == ce) {
                config[index].show = false
              }
            })
          })
        }
        if (showCascader) {
          showCascader.forEach(ce => {
            config.forEach((element, index) => {
              if (element.key == ce) {
                config[index].show = true
              }
            })
          })
        }
        this.$forceUpdate()
      }
    },
    // 累加-输入
    showInput () {
      this.addInputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveAddInput[0].$refs.input.focus()
      })
    },
    // 累加-确定
    addSubmit (name) {
      const addInput = this.addInput
      if (addInput) {
        this.addList.push({
          value: addInput
        })
      }
      this.addInputVisible = false
      this.addInput = ''
      this.formData[name] = this.addList
    },
    // 监控文件上传
    changeUpload (file, fileList) {
      for (let i = 0; i < fileList.length; i++) {
        const element = fileList[i]
        if (element.response) {
          element.url = element.response.data.targetAddr
        }
      }
      this.fileList = fileList
    },
    // 文件列表移除文件
    removeUpload (file, fileList) {
      this.fileList = fileList
    },
    // 获取信息
    getAddInfo (data, index) {
      this.addItem = { data, index }
    },
    // 叠加文件上传
    progressUpload (event, file, fileList) {
      this.fullscreenLoading = this.$loading({
        lock: true,
        text: '努力加载中……',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    changeAddUpload (file, fileList) {
      const res = file.response
      if (res) {
        if (res.code == 200) {
          const thumb = res.data.targetAddr
          const Update = this.addList[this.addItem.index]
          Update.thumb = thumb
          this.$set(this.addList, this.addItem.index, Update)

          this.formData[this.addItem.data.key] = this.addList
        }
        this.$message({
          type: res.code == '200' ? 'success' : 'error',
          message: res.code == '200' ? '上传成功' : '上传失败',
          center: true,
          duration: 2000,
          customClass: 'show-success'
        })
        this.fullscreenLoading.close()
      }
    },
    // 转换数据
    transData (data) {
      let upload = ''
      this.formTemp.forEach(element => {
        if (element.type == 'upload') {
          for (const [key, value] of Object.entries(element.upload)) {
            if (key == 'limit') {
              if (value === 1 && this.fileList.length) {
                upload = this.fileList[0].url
              } else {
                if (this.fileList.length) {
                  upload = []
                  this.fileList.forEach(e => {
                    upload.push(e.url)
                  })
                }
              }
            }
          }
          data[element.key] = upload
        }
      })
      return data
    },
    // 监控数据变动
    changeformData (val) {
      let isBool = false
      for (const [, value] of Object.entries(val)) {
        if (value) {
          isBool = true
        }
      }
      if (isBool) {
        this.$emit('on-change', val)
      }
    },
    // 监控显示
    changeCascaderBox (val, old) {
      if (val && val !== old) {
        const config = this.formTemp
        config.forEach(element => {
          val.forEach(ve => {
            if (element.key == ve) {
              element.show = true
            }
          })
        })
      }
    }
  },
  watch: {
    formData: {
      handler: 'changeformData',
      deep: true
    },
    cascaderBox: {
      handler: 'changeCascaderBox',
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.el-form-item {
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
.item-all {
  display: inline-block;
  width: 100%;
}
.is-default {
  display: flex;
  flex-direction: row;
  margin-top: 18px;
  .label {
    margin-right: 12px;
    white-space: nowrap;
  }
}
.button-new-tag {
  line-height: 30px;
  height: 32px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-bottom: 4px;
  vertical-align: bottom;
}
.pic-none {
  font-size: inherit;
  box-sizing: border-box;
  padding: 0 15px;
  cursor: not-allowed;
  color: #c0c4cc;
  border: 1px solid #dcdfe6;
  border-color: #e4e7ed;
  border-radius: 4px;
  background-color: #f5f7fa;
  background-image: none;
  span {
    margin-left: 4px;
  }
}
.el-radio {
  line-height: 32px;
}
.add-tag-wrap {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .tag-item {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .is-avatar {
    position: relative;
    .el-button {
      padding-right: 48px;
    }
    .el-avatar {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
.thumb {
  vertical-align: -4px;
}
.form-label {
  span {
    font-size: 14px;
    margin-right: 4px;
    color: #f56c6c;
  }
}
.el-radio-group {
  width: 100%;
}
.datepicker-box {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  .el-input {
    width: 48%;
  }
}
.input-box {
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  color: #909399;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #f5f7fa;
  background-image: none;
  .prepend {
    padding-right: 10px;
    padding-left: 15px;
    white-space: nowrap;
  }
  .append {
    padding-right: 15px;
    padding-left: 10px;
    white-space: nowrap;
  }
}

</style>
