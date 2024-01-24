<template>
  <div>
    <el-select v-model="value" placeholder="请选择" @change="selectclass">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :filterable="true"
      >
      </el-option>
    </el-select>
    <div class="btnBox">
      <el-button
        @click="copyThisModel(item.productId)"
        v-for="item in namelist"
        :key="item.productId"
        class="btn"
        >{{ item.productName }}</el-button
      >
    </div>
  </div>
</template>

<script>
import { copyModel } from "@/api/show";
import { exhibitCategory } from "@/api/exhibit.js";
import { exhibitProduct } from "@/api/show.js";
export default {
  props: {
    modelId:Number,
  },
  data() {
    return {
      options: [], //型号数组
      namelist: [], //品名数组
      ischoose: false,
    };
  },
  methods: {
    //选择类别
    selectclass(categoryId) {
      this.classnum = categoryId;
      exhibitProduct({ categoryId }).then((res) => {
        this.namelist = res;
        this.ischoose = true;
      });
    },
    //复制模型的函数
    copyThisModel(productId) {
      copyModel({
        modelId: this.modelId,
        productId,
      }).then((res) => {
        if (res === "success") {
          this.$message({
            message: "移动成功",
            type: "success",
          });
        } else this.$message.error("移动失败！！！");
        this.$emit('closeDialog');
      });
    },
  },
  created() {
    //获取型号
    exhibitCategory().then((res) => {
      console.log(res);
      this.options = res.map((item) => {
        return {
          value: item.categoryId,
          label: item.title,
        };
      });
    });
  },
};
</script>

<style scoped>
.btnBox{
  display: flex;
  flex-wrap: wrap;
}
.btn{
  margin: 5px 10px;
}
</style>