<script setup>

  import { reactive, ref } from 'vue'

  import { ElMessage } from 'element-plus'

  const formRes = ref();

  const validatephone = function (rule, value, callback) {
    if (value === '') {
      callback(new Error('手机号不能为空'))
    } else {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error('请输入有效手机号'))
      }
      callback()
    }
  }

  const storeListOpts = reactive([
    {
      value: 'range1',
      label: '门店范围1'
    },
    {
      value: 'range2',
      label: '门店范围2',
    },
    {
      value: 'range3',
      label: '门店范围3',
    },
    {
      value: 'range4',
      label: '门店范围4',
    },
    {
      value: 'range5',
      label: '门店范围5',
    }
  ]);
  const freightTypeOpts = reactive([
    {
      label: '满减',
      value: 'manjian'
    },
    {
      label: '极速达',
      value: 'jisuda'
    },
    {
      label: '新人首单免运费',
      value: 'xinren'
    }
  ]);
  const distributionChannelsOpts = reactive([
    {
      label: '到家',
      value: 'gohome'
    },
    {
      label: '海博',
      value: 'haibo'
    }
  ]);
  const fileList = reactive([]);
  const dialogImageUrl = ref('');
  const dialogVisible = ref(false);
  const formData = reactive({
    activeName: '',
    storeList: [],
    actTimeRange: [],
    phone: '',
    freightType: 'manjian',
    businessLicense: [],
    distributionChannels: [],
    account: false
  });
  const formDataRules = reactive({
    activeName: [
      { required: true, message: '活动名称不能为空', trigger: 'blur' }
    ],
    storeList: [
      { required: true, message: '门店范围不能为空', trigger: 'change' }
    ],
    actTimeRange: [
      { required: true, message: '活动时段不能为空', trigger: 'blur' }
    ],
    phone: [
      { required: true, trigger: 'blur', validator: validatephone }
    ],
    freightType: [
      { required: true, message: '费用类型不能为空', trigger: 'blur' }
    ],
    businessLicense: [
      { required: true, message: '营业执照必传', trigger: 'blur' }
    ],
    distributionChannels: [
      { required: true, message: '销售渠道必选', trigger: 'blur' }
    ],
    account: [
      { required: false, message: '设置默认不能为空', trigger: 'blur' }
    ]
  });
  const loading = ref(false);

  const handlePictureCardPreview = (file) => {
    dialogImageUrl.value = file.url
    dialogVisible.value = true
  }

  const handleRemove = (file) => {
    const curUrl = file.response.data.urls.file[0]
    const curIndex = formData.businessLicense.indexOf(curUrl)
    formData.businessLicense.splice(curIndex, 1)
  }

  const handleSuccess = (res) => {
    formData.businessLicense.push(res.data.urls.file[0])
  }

  const submitForm = () => {
    formRes.value.validate((valid) => {
      if (valid) {
        loading.value = true
        setTimeout(() => {
          loading.value = false
          console.log(formData);
          ElMessage({
            message: '提交成功！',
            type: 'success',
          })
        }, 1500)
      } else {
        ElMessage({
          message: '请确保所有字段填写正确！',
          type: 'warning',
        })
      }
    })
  }

  const resetForm = () => {
    formRes.value.resetFields();
  }

</script>

<template>
  <div class="page-active-form">
    
    <!-- 标题栏 -->
    <div class="header-tit">活动表单</div>

    <!-- 活动Form表单 -->
    <el-form ref="formRes" :model="formData" :rules="formDataRules" label-width="100px">

      <!-- 活动名称 -->
      <el-form-item label="活动名称：" prop="activeName">
        <el-input v-model="formData.activeName" maxlength="20" placeholder="促销名称不能超过20个字" />
      </el-form-item>

      <!-- 门店范围 -->
      <el-form-item label="门店范围：" prop="storeList">
        <el-select v-model="formData.storeList" style="width: 100%;" clearable multiple placeholder="请选择门店范围">
          <el-option
            v-for="item in storeListOpts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 活动时段 -->
      <el-form-item label="活动时段：" prop="actTimeRange">
        <el-date-picker
          v-model="formData.actTimeRange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        />
      </el-form-item>

      <!-- 手机号码 -->
      <el-form-item label="手机号码：" prop="phone">
        <el-input v-model="formData.phone" maxlength="11" oninput="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')" placeholder="请输入手机号码" />
      </el-form-item>

      <!-- 运费类型 -->
      <el-form-item label="运费类型：" prop="freightType">
        <el-radio-group v-model="formData.freightType">
          <el-radio v-for="(item, index) in freightTypeOpts" :key="index" :label="item.value" :name="item.value">{{ item.label }}</el-radio>
        </el-radio-group>

      </el-form-item>

      <!-- 营业执照 -->
      <el-form-item label="营业执照：" prop="businessLicense">
        <el-upload
          v-model:file-list="fileList"
          action="https://api.snrthn.com/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <el-icon><Plus /></el-icon>
          <template #tip>            
            <div style="font-size: 14px; color: #aaaaaa;">请上传门店营业执照，支持JPG、PNG格式</div>
          </template>
        </el-upload>
      </el-form-item>

      <!-- 销售渠道 -->
      <el-form-item label="销售渠道：" prop="distributionChannels">
        <el-checkbox-group v-model="formData.distributionChannels">
          <el-checkbox v-for="(item, index) in distributionChannelsOpts" :key="index" :label="item.value" name="type">{{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <!-- 设为默认 -->
      <el-form-item label="设为默认：" prop="account">
        <el-switch v-model="formData.account" />
      </el-form-item>

      <!-- 表单操作 -->
      <el-form-item label="">        
        <el-button type="primary" :loading="loading" @click="submitForm">确定</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>

    </el-form>

    <el-dialog v-model="dialogVisible">
      <img style="max-width: 100%;" :src="dialogImageUrl" />
    </el-dialog>

  </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.page-active-form {

}

</style>
