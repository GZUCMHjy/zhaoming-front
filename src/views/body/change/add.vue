<template>
  <div>
    <el-button type="primary" @click="addshow">添 加</el-button>
    <el-dialog title="添加型号" :visible.sync="dialogFormVisible">
      <el-form label-width="110px">
        <el-form-item label="型号:" style="margin-top: 10px">
          <el-input
            class="input"
            v-model="shows.modelName"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <!-- 样式更changeshow一样，由于没有设置scope，此文件不需要声明样式 -->
        <el-image
          v-for="pic in shows.imgs"
          :key="pic.url"
          :src="`${domain}/${pic.url}`"
          class="imagePic"
          style="width: 140px;height: 140px;margin: 5px;"
          fit="fill"
          @click="handleRemove(pic)"
        ></el-image>

        <el-upload
          class="upload-demo"
          action="/exhibit/uploadPicture"
          name="picture"
          :show-file-list="false"
          :on-success="
            (res, file, fileList) => {
              upimg(res, file, fileList);
            }
          "
        >
          <el-button type="primary" style="float: left" size="mini"
            >上传图片</el-button
          >
        </el-upload>

        <el-form-item label="价格:" style="margin-top: 10px">
          <el-input
            class="input"
            v-model="shows.productPrice"
            placeholder="请输入数字"
          ></el-input>
        </el-form-item>

        <el-form-item label="备注：">
          <el-input
            class="input"
            v-model="shows.productPriceOnTmall"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item label="光源:">
          <el-input
            class="input"
            v-model="shows.deploy"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item label="灯头规格:">
          <el-input
            class="input"
            v-model="shows.lampHolderSpecifications"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item label="尺寸:">
          <el-input
            class="input"
            v-model="shows.size"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item label="分别价格:">
          <el-input
            class="input"
            v-model="shows.specification"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item label="材质:">
          <el-input
            class="input"
            v-model="shows.material"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item label="是否置顶:">
          <el-select v-model="shows.isTop" placeholder="请选择">
            <el-option
            style="width:100%"
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="increaseill" :loading="btnloading"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { saveModel } from "@/api/show.js";
import { domain } from '@/utils/state'
export default {
  props: {
    productId: {
      type: Number,
    },
  },
  data() {
    return {
      shows: {
        modelId: null,
        modelName: "",
        // modelImgSrc: "",
        imgs:[],
        productPrice: "",
        productPriceOnTmall: null,
        deploy: "",
        lampHolderSpecifications: null,
        size: null,
        material: null,
        specification: null,
        wattage: null,
        productId: null,
        isTop: 0,
      },
      options:[
        {
          value: 0,
          label: '否'
        }, {
          value: 1,
          label: '是'
        }
      ],
      dialogFormVisible: false,
      btnloading: false,
      domain:domain
    };
  },
  methods: {
    addshow() {
      console.log(this.productId);
      if (this.productId !== 0) {
        this.dialogFormVisible = true;
      } else {
        this.$message.error("错误，请先选择品名");
      }
    },
    increaseill() {
      console.log(this.shows);
      this.shows.productId = this.productId;
      this.btnloading = true;
      saveModel(this.shows).then((res) => {
        console.log(res);
        this.dialogFormVisible = false;
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.btnloading = false;
        // this.shows = {};
        this.shows={
          modelId: null,
          modelName: "",
          // modelImgSrc: "",
          imgs:[],
          productPrice: "",
          productPriceOnTmall: null,
          deploy: "",
          lampHolderSpecifications: null,
          size: null,
          material: null,
          specification: null,
          wattage: null,
          productId: null,
          isTop: 0,
        };
        this.$emit("flash", "true");
      });
    },
    // upimg(response, file, fileList) {
    //   console.log(response);
    //   this.shows.modelImgSrc = response;
    // },
      //上传图片
    upimg(response, file, fileList) {
      this.shows.imgs.push({
        id:null,
        url:response
      })
      console.log(this.shows.imgs);
      // this.shows[i].modelImgSrc = response;
    },
    //删除图片
    handleRemove(file){
      const index=this.shows.imgs.findIndex(i=>i.url===file.url)
      this.shows.imgs.splice(index,1)
      console.log(this.shows.imgs);
    },
  },
};
</script>
<style>
.el-form-item .el-select{
  width: 85%;
  float: left;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-tag {
  float: left;
  width: 90px;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
/* .tag{
    padding-left: 0;
  } */
a {
  text-decoration: none;
}
.showbox {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  height: 800px;
  width: 30%;
  margin: 10px 20px 20px 0;
  background-color: rgb(255, 255, 255);
}
.input {
  float: left;
  width: 85%;
}
</style>