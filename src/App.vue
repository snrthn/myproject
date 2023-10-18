<!--
 * @User: shencaixia
 * @Email: shencaixia@jd.com
 * @lastTime: 2022-04-28 11:24:47
 * @Description: TODO...
-->
<template>

  <el-container>
    <el-header style="text-align: center;">
      
        <!-- Tab标签 -->
        <el-radio-group v-model="actIndex">
          <el-radio-button label="HelloWorld1">活动表单</el-radio-button>
          <el-radio-button label="HelloWorld2">类目保质期配置</el-radio-button>
          <el-radio-button label="HelloWorld3">人员管理列表</el-radio-button>
        </el-radio-group>
      
    </el-header>
    <el-main>

      <!-- 组件 -->
      <component :is="actIndex" />
      
    </el-main>
  </el-container>

</template>

<script>
import HelloWorld1 from './components/HelloWorld1.vue'
import HelloWorld2 from './components/HelloWorld2.vue'
import HelloWorld3 from './components/HelloWorld3.vue'

export default {
  name: 'App',
  components: {
    HelloWorld1,
    HelloWorld2,
    HelloWorld3
  },
  data () {
    return {
      actIndex: 'HelloWorld1'
    }
  }
}
</script>

<style>

.header-tit {
  height: 24px;
  line-height: 24px;
  padding-left: 6px;
  margin-bottom: 24px;
  border-left: 5px solid #409eff;
}

</style>
