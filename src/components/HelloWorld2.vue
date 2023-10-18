<script setup>
  import { reactive, ref } from 'vue'
  import { ElMessage } from 'element-plus'

  const formRes = ref();

  const typeOptions = reactive([
    {
      value: 'guide',
      label: 'Guide',
      children: [
        {
          value: 'disciplines',
          label: 'Disciplines',
          children: [
            {
              value: 'consistency',
              label: 'Consistency',
            },
            {
              value: 'feedback',
              label: 'Feedback',
            },
            {
              value: 'efficiency',
              label: 'Efficiency',
            },
            {
              value: 'controllability',
              label: 'Controllability',
            },
          ],
        },
        {
          value: 'navigation',
          label: 'Navigation',
          children: [
            {
              value: 'side nav',
              label: 'Side Navigation',
            },
            {
              value: 'top nav',
              label: 'Top Navigation',
            },
          ],
        },
      ],
    },
    {
      value: 'component',
      label: 'Component',
      children: [
        {
          value: 'basic',
          label: 'Basic',
          children: [
            {
              value: 'layout',
              label: 'Layout',
            },
            {
              value: 'color',
              label: 'Color',
            },
            {
              value: 'typography',
              label: 'Typography',
            },
            {
              value: 'icon',
              label: 'Icon',
            },
            {
              value: 'button',
              label: 'Button',
            },
          ],
        },
        {
          value: 'form',
          label: 'Form',
          children: [
            {
              value: 'radio',
              label: 'Radio',
            },
            {
              value: 'checkbox',
              label: 'Checkbox',
            },
            {
              value: 'input',
              label: 'Input',
            },
            {
              value: 'input-number',
              label: 'InputNumber',
            },
            {
              value: 'select',
              label: 'Select',
            },
            {
              value: 'cascader',
              label: 'Cascader',
            },
            {
              value: 'switch',
              label: 'Switch',
            },
            {
              value: 'slider',
              label: 'Slider',
            },
            {
              value: 'time-picker',
              label: 'TimePicker',
            },
            {
              value: 'date-picker',
              label: 'DatePicker',
            },
            {
              value: 'datetime-picker',
              label: 'DateTimePicker',
            },
            {
              value: 'upload',
              label: 'Upload',
            },
            {
              value: 'rate',
              label: 'Rate',
            },
            {
              value: 'form',
              label: 'Form',
            },
          ],
        },
        {
          value: 'data',
          label: 'Data',
          children: [
            {
              value: 'table',
              label: 'Table',
            },
            {
              value: 'tag',
              label: 'Tag',
            },
            {
              value: 'progress',
              label: 'Progress',
            },
            {
              value: 'tree',
              label: 'Tree',
            },
            {
              value: 'pagination',
              label: 'Pagination',
            },
            {
              value: 'badge',
              label: 'Badge',
            },
          ],
        },
        {
          value: 'notice',
          label: 'Notice',
          children: [
            {
              value: 'alert',
              label: 'Alert',
            },
            {
              value: 'loading',
              label: 'Loading',
            },
            {
              value: 'message',
              label: 'Message',
            },
            {
              value: 'message-box',
              label: 'MessageBox',
            },
            {
              value: 'notification',
              label: 'Notification',
            },
          ],
        },
        {
          value: 'navigation',
          label: 'Navigation',
          children: [
            {
              value: 'menu',
              label: 'Menu',
            },
            {
              value: 'tabs',
              label: 'Tabs',
            },
            {
              value: 'breadcrumb',
              label: 'Breadcrumb',
            },
            {
              value: 'dropdown',
              label: 'Dropdown',
            },
            {
              value: 'steps',
              label: 'Steps',
            },
          ],
        },
        {
          value: 'others',
          label: 'Others',
          children: [
            {
              value: 'dialog',
              label: 'Dialog',
            },
            {
              value: 'tooltip',
              label: 'Tooltip',
            },
            {
              value: 'popover',
              label: 'Popover',
            },
            {
              value: 'card',
              label: 'Card',
            },
            {
              value: 'carousel',
              label: 'Carousel',
            },
            {
              value: 'collapse',
              label: 'Collapse',
            },
          ],
        },
      ],
    },
    {
      value: 'resource',
      label: 'Resource',
      children: [
        {
          value: 'axure',
          label: 'Axure Components',
        },
        {
          value: 'sketch',
          label: 'Sketch Templates',
        },
        {
          value: 'docs',
          label: 'Design Documentation',
        },
      ],
    }
  ]);
  const unitOptions = reactive([
    {
      label: '天',
      value: 'day'
    },
    {
      label: '月',
      value: 'month'
    }
  ]);
  const formData = reactive({
    productList: [
      {
        prodType: [],
        qualityStart: 1,
        qualityEnd: 1,
        timeUnit: ''
      }
    ]
  });
  const formDataRules = reactive({
    productList: [
      {
        prodType: [
          { required: true, message: '商品类目不能为空', trigger: 'change' }
        ],
        qualityStart: [
          { required: true, message: '起始时间不能为空', trigger: 'change' }
        ],
        qualityEnd: [
          { required: true, message: '结束时间不能为空', trigger: 'change' }
        ],
        timeUnit: [
          { required: true, message: '时间单位不能为空', trigger: 'change' }
        ]
      }
    ]
  });

  // 添加行
  const addHandle = () => {
    if (formData.productList.length >= 5) {
      ElMessage({
        message: '最多支持添加 5 个类目',
        type: 'warning',
      })
      return;
    }
    formData.productList.push({
      prodType: [],
      qualityStart: 1,
      qualityEnd: 1,
      timeUnit: ''
    })
    formDataRules.productList.push({
      prodType: [
        { required: true, message: '商品类目不能为空', trigger: 'change' }
      ],
      qualityStart: [
        { required: true, message: '起始时间不能为空', trigger: 'change' }
      ],
      qualityEnd: [
        { required: true, message: '结束时间不能为空', trigger: 'change' }
      ],
      timeUnit: [
        { required: true, message: '时间单位不能为空', trigger: 'change' }
      ]
    })
  }

  // 删除行
  const removeHandle = (count) => {
    if (formDataRules.productList.length === 1) {
      ElMessage({
        message: '最少保留 1 个类目',
        type: 'warning',
      })
      return;
    }
    formData.productList.splice(count, 1);
    formDataRules.productList.splice(count, 1);
  }

  // 保存数据
  const onSubmit = () => {
    formRes.value.validate((valid) => {
      if (valid) {
        console.log(formData);
        ElMessage({
          message: '保存成功',
          type: 'success',
        })
      } else {
        ElMessage({
          message: '请检查必填项',
          type: 'warning',
        })
      }
    })
  }

  // 返回
  const backHandle = () => {
    ElMessage({
      message: '返回成功',
      type: 'success',
    })
  }

</script>

<template>
  <div class="page-prod-type">

    <!-- 标题栏 -->
    <div class="header-tit">选择商品</div>

    <!-- 商品类目选择 -->
    <el-form ref="formRes" :model="formData" :rules="formDataRules" label-width="80px">
    
      <div v-for="(prod, count) in formData.productList" :key="count" style="display: flex;">  

        <!-- 商品类目 -->
        <el-form-item label="商品类目" :prop="'productList[' + count + '].prodType'">
          <el-cascader
            style="width: 150px;"
            v-model="prod.prodType"
            :options="typeOptions"
            placeholder="请选择"
          />
        </el-form-item>

        <!-- 起始时长 -->
        <el-form-item label="保质期" :prop="'productList[' + count + '].qualityStart'">
          <el-input-number style="margin: 0px 8px; width: 120px;" v-model="prod.qualityStart" :min="1" :max="prod.qualityEnd" />
        </el-form-item>

        <!-- 起始单位 -->
        <el-form-item label="" :prop="'productList[' + count + '].timeUnit'" label-width="0px">
          <el-select v-model="prod.timeUnit" style="width: 150px;" placeholder="请选择">
            <el-option
              v-for="item in unitOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <!-- 连接符号 -->
        <span style="margin-left: 8px;">——</span>

        <!-- 结束时长 -->
        <el-form-item label="" :prop="'productList[' + count + '].qualityEnd'" label-width="0px">
          <el-input-number style="margin: 0px 8px; width: 120px;" v-model="prod.qualityEnd" :min="prod.qualityStart" :max="15" />
        </el-form-item>

        <!-- 结束单位 -->
        <el-form-item label="" :prop="'productList[' + count + '].timeUnit'" label-width="0px">
          <el-select v-model="prod.timeUnit" style="width: 150px;" placeholder="请选择">
            <el-option
              v-for="item in unitOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <!-- 单行操作 -->
        <div style="height: 30px; margin-left: 16px; display: flex; align-items: center;">
          <el-icon style="margin: 0px 4px;" size="26" color="#409eff"><RemoveFilled @click="removeHandle(count)" /></el-icon>
          <el-icon v-show="count === formData.productList.length - 1" style="margin: 0px 4px;" size="26" color="#409eff"><CirclePlusFilled @click="addHandle" /></el-icon>
        </div>

      </div>

      <!-- 表单操作 -->
      <el-form-item>
        <el-button @click="backHandle">返回</el-button>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    
    </el-form>

  </div>
</template>

<style scoped>

.page-prod-type {
  
}

</style>