<template>
  <div class="home">
  <el-container>
    <el-header><Nav></Nav></el-header>
    <el-main><Body></Body></el-main>
    <el-footer>
      <a href="https://beian.miit.gov.cn/" target="">粤ICP备2023017790号-1</a>
    </el-footer>
  </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/views/nav/index.vue'
import Body from '@/views/body/index.vue'

export default {
  name: 'Home',
  components: {
    Nav,
    Body
  }
}
</script>
<style>
.el-footer {
    background-color: #ffffff;
    color: rgb(99, 99, 99);
    text-align: center;
    font-size: 14px;
    line-height: 60px;
}
a{
  text-decoration: none;
}
</style>
