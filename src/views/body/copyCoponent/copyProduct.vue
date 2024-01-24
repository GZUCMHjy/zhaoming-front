<template>
  <div>
    <el-button @click="openCopyModel()">移动</el-button>
    <el-dialog title="移动至" :visible.sync="dialogTableVisible" width="500px">
      <CopyDialog @closeDialog="dialogTableVisible = false;" :modelId="modelId"></CopyDialog>
    </el-dialog>
  </div>
</template>

<script>
import CopyDialog from "./copyDialog.vue";
export default {
  props:{
    modelId:Number,
  },
  components:{
    CopyDialog,
  },
  data(){
    return {
      dialogTableVisible: false,
    }
  },
  methods:{
    //复制模型的函数
    openCopyModel(){
      this.dialogTableVisible = true;
    }
  }
};
</script>

<style>
</style>