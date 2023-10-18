
<script setup>
  import { reactive, ref, onMounted } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import axios from 'axios'

  const formRef = ref();

  const queryLoading = ref(false);
  const roleInfoOpts = reactive([
    { value: '1', label: '管理员' },
    { value: '2', label: '助理' },
    { value: '3', label: '合作伙伴' }
  ]);
  const queryForm = reactive({
    jdPin: '', // 京东Pin
    userInfo: '', // 用户名,手机号
    roleName: '' // 角色名
  });
  const queryFormRules = reactive({
    jdPin: [
      { required: false, message: '京东Pin不能为空', trigger: 'blur' }
    ],
    userInfo: [
      { required: false, message: '用户信息不能为空', trigger: 'blur' }
    ],
    roleName: [
      { required: false, message: '角色名称不能为空', trigger: 'blur' }
    ]
  });
  const listLoading = ref(false);
  const userList = reactive([]);
  const pageSize = ref(10);
  const pageNumber = ref(1);
  const total = ref(0);

  const baseUrl = ref('https://api.snrthn.com/');
    
  onMounted(() => {
    initFun();
  });

  // 初始化
  const initFun = () => {
    fetchData();
  }

  // 查询表单
  const submitQueryForm = () => {
    pageSize.value = 10
    pageNumber.value = 1
    formRef.value.validate((valid) => {
      if (valid) {
        queryLoading.value = true
        console.log(queryForm);

        fetchData()
      } else {
        ElMessage({
          message: '请确保所有字段填写正确！',
          type: 'warning',
        })
      }
    })
  }
  // 重置表单
  const resetQueryForm = () => {
    formRef.value.resetFields()
    submitQueryForm()
  }
  // 请求数据
  const fetchData = () => {
    if (listLoading.value) return

    listLoading.value = true

    const queryData = {
        pageSize: pageSize.value,
        pageNumber: pageNumber.value
    }

    if (queryForm.jdPin.trim()) {
      queryData.jdPin = queryForm.jdPin.trim()
    }
    if (queryForm.userInfo.trim()) {
      queryData.userInfo = queryForm.userInfo.trim()
    }
    if (queryForm.roleName.trim()) {
      queryData.roleName = queryForm.roleName.trim()
    }

    axios({
      method: 'post',
      url: baseUrl.value + 'jd/userlist',
      data: queryData
    }).then(res => {
      listLoading.value = false
      queryLoading.value = false
      userList.value = res.data.data.content
      total.value = res.data.data.totalElements
    }).catch(err => {
      console.log(err)
      listLoading.value = false
      queryLoading.value = false
      userList.value = []
      total.value = 0
    })
  }
  // 新增人员
  const addPersonHandle = () => {
    ElMessage({
      message: '新增人员正在开发中…',
      type: 'warning',
    })
  }
  // 下载授权书
  const downLoadBookHandle = () => {
    ElMessage({
      message: '下载授权书正在开发中…',
      type: 'warning',
    })
  }
  // 查看详情
  const detailHandle = () => {
    ElMessage({
      message: '详情正在开发中…',
      type: 'warning',
    })
  }
  // 查看权限
  const rolesHandle = () => {
    ElMessage({
      message: '权限正在开发中…',
      type: 'warning',
    })
  }
  // 编辑信息
  const editHandle = () => {
    ElMessage({
      message: '编辑正在开发中…',
      type: 'warning',
    })
  }
  // 删除信息
  const removeHandle = (id) => {
    ElMessageBox.confirm(
      '确定要删除用户信息吗？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then(() => {
      axios({
        method: 'delete',
        url: baseUrl.value + 'jd/userlist',
        data: {
          id,
          pageSize: pageSize.value,
          pageNumber: pageNumber.value
        }
      }).then(res => {
        ElMessage({
          message: '删除成功',
          type: 'success',
        })          
        userList.value = res.data.data.content
        total.value = res.data.data.totalElements
      }).catch(err => {
        console.log(err)
      })
    })
  }
  // 改变页面数量
  const handleSizeChange = (size) => {
    pageSize.value = size
    fetchData()
  }
  // 改变页码
  const handleCurrentChange = (page) => {
    pageNumber.value = page
    fetchData()
  }

</script>

<template>
  <div class="page-personal-list">
    
    <!-- 标题栏 -->
    <div class="header-tit">人员管理列表</div>

    <!-- 查询表单 -->
    <el-form ref="formRef" :model="queryForm" :rules="queryFormRules" :inline="true" label-width="100px">

      <!-- 京东pin -->
      <el-form-item label="京东pin：" prop="jdPin">
        <el-input v-model="queryForm.jdPin" maxlength="30" placeholder="请输入京东pin" />
      </el-form-item>

      <!-- 个人信息 -->
      <el-form-item label="个人信息：" prop="userInfo">
        <el-input v-model="queryForm.userInfo" maxlength="30" placeholder="请输入姓名/手机号" />
      </el-form-item>

      <!-- 角色名称 -->
      <el-form-item label="角色名称：" prop="roleName">
        <el-select v-model="queryForm.roleName" clearable placeholder="请选择角色名称">
          <el-option
            v-for="item in roleInfoOpts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!-- 表单操作 -->
      <el-form-item label="">        
        <el-button type="primary" :loading="queryLoading" @click="submitQueryForm">确定</el-button>
        <el-button @click="resetQueryForm">重置</el-button>
      </el-form-item>

    </el-form>

    <!-- 操作表格 -->
    <div class="table-opt">
      <el-button type="primary" @click="addPersonHandle">新增人员</el-button>
      <el-button link type="primary" @click="downLoadBookHandle">下载授权书模板</el-button>
    </div>

    <!-- 列表部分 -->
    <el-table :data="userList.value" style="width: 100%" v-loading="listLoading">
      <el-table-column label="序号" type="index" width="100" />
      <el-table-column prop="jdPin" label="京东pin" min-width="120" />
      <el-table-column prop="userName" label="姓名" min-width="120" />
      <el-table-column prop="phoneNumber" label="手机号" min-width="120" />
      <el-table-column prop="roleName" label="角色" min-width="120">
        <template #default="scope">
          <div v-if="scope.row.roleName === '1'">管理员</div>
          <div v-if="scope.row.roleName === '2'">助理</div>
          <div v-if="scope.row.roleName === '3'">合作伙伴</div>
        </template>
      </el-table-column>
      <el-table-column prop="approStatus" label="审核状态" width="120">
        <template #default="scope">
          <div v-if="scope.row.approStatus === '1'">审核中</div>
          <div v-if="scope.row.approStatus === '2'">已通过</div>
          <div v-if="scope.row.approStatus === '3'">被驳回</div>
          <el-popover
            v-if="scope.row.approStatus === '3'"
            placement="bottom"
            :width="200"
            trigger="click"
            :content="scope.row.reason"
          >
            <template #reference>              
              <el-button link type="primary" size="small">驳回原因</el-button>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="createBy" label="操作人" min-width="120" />
      <el-table-column prop="createTime" label="创建时间" min-width="200" />
      <el-table-column fixed="right" label="操作" width="210">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="detailHandle(scope.row.id)">查看</el-button>
          <el-button link type="primary" size="small" @click="rolesHandle(scope.row.id)">角色权限</el-button>
          <el-button link type="primary" size="small" @click="editHandle(scope.row.id)">编辑</el-button>
          <el-button link type="primary" size="small" @click="removeHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="pageNumber"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        small="small"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.page-personal-list {

}

.table-opt {
  margin: 16px 0px 20px;
  display: flex;
  justify-content: space-between;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 14px;
}

</style>
