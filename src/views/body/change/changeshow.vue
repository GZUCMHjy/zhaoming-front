<template>
  <div>
    <el-select v-model="value" placeholder="请选择" @change="selectclass">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :filterable="true"
      ></el-option>
    </el-select>
    <div style="margin-top: 50px" v-if="ischoose">
      <!-- <el-tag
        class="tag"
        :class="{ tagactive: productId == tag.productId }"
        v-for="tag in namelist"
        :key="tag.productId"
        :closable="true"
        :disable-transitions="true"
        @close="handleClose(tag)"
      >-->
      <el-tag
        class="tag"
        :class="{ tagactive: productId == tag.productId }"
        v-for="tag in namelist"
        :key="tag.productId"
        :disable-transitions="true"
      >
        <span v-if="istag">
          <a href="javascript:void(0);" @click="show(tag)">
            {{
            tag.productName
            }}
          </a>
        </span>
        <el-input
          v-else
          class="input-tag"
          size="small"
          v-model="tag.productName"
          @blur="confirmproduct(tag)"
        ></el-input>
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      ></el-input>
      <!-- <el-button v-else class="button-new-tag" size="small" @click="showInput">添加品名</el-button>
      <el-button
        v-if="istag"
        type="success"
        class="button-new-tag"
        size="small"
        @click="changemodel"
      >修改</el-button>
      <el-button v-else type="danger" class="button-new-tag" size="small" @click="cancelmodel">取消</el-button>-->
      <div class="body">
        <div v-for="(item, i) in shows" :key="i" class="showbox">
          <el-form label-width="110px">
            <el-form-item :model="item" label="型号:" style="margin-top: 10px">
              <el-input class="input" v-model="item.modelName" placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-image
              v-for="pic in item.imgs"
              :key="pic.url"
              :src="`${domain}/${pic.url}`"
              class="imagePic"
              style="width: 140px;height: 140px;margin: 5px;"
              fit="fill"
              @click="handleRemove(i,pic)"
            ></el-image>

            <el-upload
              class="upload-demo"
              action="/exhibit/uploadPicture"
              name="picture"
              :show-file-list="false"
              :on-success="
                (res, file, fileList) => {
                  upimg(i, res, file, fileList);
                }
              "
            >
              <el-button type="primary" style="float: left" size="mini">上传图片</el-button>
            </el-upload>
            <el-form-item label="价格:" style="margin-top: 10px" prop="productPrice">
              <el-input
                class="input"
                v-model="item.productPrice"
                placeholder="请输入数字"
                @change="confirmTelephone1(i)"
              >></el-input>
            </el-form-item>

            <el-form-item label="备注：" prop="productPriceOnTmall">
              <el-input class="input" v-model="item.productPriceOnTmall" placeholder="请输入内容">></el-input>
            </el-form-item>

            <el-form-item label="光源:">
              <el-input class="input" v-model="item.deploy" placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item label="灯头规格:">
              <el-input class="input" v-model="item.lampHolderSpecifications" placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item label="尺寸:">
              <el-input class="input" v-model="item.size" placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item label="分别价格:">
              <el-input class="input" v-model="item.specification" placeholder="请输入内容"></el-input>
            </el-form-item>

            <el-form-item label="材质:">
              <el-input class="input" v-model="item.material" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-form>
          <div>
            <el-button type="success" @click="changeshow(i)">修改</el-button>
            <el-button type="danger" @click="delmodel(i)">删除</el-button>
            <el-button
              :type="
              item.isTop !== '2000-01-01 00:00:00' ? 'warning' : 'primary'
            "
              @click="changeshowTop(i)"
            >
              {{
              item.isTop !== "2000-01-01 00:00:00" ? "取消置顶" : "置顶"
              }}
            </el-button>
            <p></p>
            <div class="add-del">
              <el-button style="margin-right: 10px;" type="warning" @click="upmove(i)">上移</el-button>
              <Copy :modelId="item.modelId"></Copy>
              <el-button style="margin-left: 10px;" type="warning" @click="downmove(i)">下移</el-button>
            </div>
          </div>
        </div>
      </div>
      <Add :productId="productId" @flash="flash"></Add>
    </div>

    <el-pagination
      background
      :page-size="6"
      layout="prev, pager, next"
      :total="total"
      style="margin: 50px 0 100px 0"
      @current-change="curchange"
      @prev-click="curchange"
      @next-click="curchange"
    ></el-pagination>
  </div>
</template>
<script>
import Add from "./add.vue";
import Copy from "../copyCoponent/copyProduct.vue";
import { exhibitCategory } from "@/api/exhibit.js";
import { domain } from '@/utils/state'
import {
  exhibitProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
  exhibitModel,
  getModelCountByProductId,
  deleteModel,
  updateModel,
  exhibitTop,
  updownMove
} from "@/api/show.js";
export default {
  components: {
    Add,
    Copy,
  },
  data() {
    return {
      classnum: 0, //类的num
      options: [],
      value: "",
      namelist: [],
      showlist: [],
      inputVisible: false, //是否出现添加的input
      inputValue: "", //添加的input的内容
      ischoose: false, //有没有选择类
      istag: true, //是否要修改
      total: 6, //modal总数
      productId: 0,
      shows: [], //展品数据
      page: 1, //当前页数
      tap: "",
      domain: domain
    };
  },
  methods: {
    flash(data) {
      console.log(this.page);
      // getModelCountByProductId({ productId: this.productId }).then((res) => {
      //   this.total = res;
      //   console.log(res);
      //   this.curchange(this.page);
      // });
      this.curchange(this.page);
    },
    //选择类别
    selectclass(categoryId) {
      this.classnum = categoryId;
      console.log(categoryId);
      exhibitProduct({ categoryId }).then((res) => {
        this.namelist = res;
        console.log(this.namelist);
        this.showlist = [];
        this.shows = [];
        this.ischoose = true;
        this.show(this.namelist[0])
      });
    },
    //添加品名
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      console.log(inputValue);
      if (inputValue) {
        let nameitem = {
          categoryId: this.classnum,
          productName: this.inputValue,
        };
        saveProduct(nameitem).then((res) => {
          console.log(res);
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.namelist.push(nameitem);
        });
      }
      console.log(this.namelist);
      this.inputVisible = false;
      this.inputValue = "";
    },

    //修改品名
    confirmproduct(tag) {
      console.log(tag);
      updateProduct(tag).then((res) => {
        console.log(res);
        this.$message({
          message: "修改成功",
          type: "success",
        });
      });
    },
    //删除品名
    handleClose(tag) {
      console.log(tag);
      deleteProduct({ productId: tag.productId }).then((res) => {
        console.log(res);
        if (res === "failure") {
          this.$message.error("该品名下面有型号，删除失败");
        } else {
          this.namelist.splice(this.namelist.indexOf(tag), 1);
          this.$message({
            message: "删除成功",
            type: "success",
          });
        }
        console.log(res);
      });
    },
    changemodel() {
      this.istag = false;
    },
    cancelmodel() {
      this.istag = true;
    },
    //显示展品
    show(tag) {
      this.productId = tag.productId;
      getModelCountByProductId({ productId: tag.productId }).then((res) => {
        this.total = res;
        console.log(res);
        //获取展品接口
        exhibitModel({
          page: 0,
          productId: tag.productId,
          size: 6,
        }).then((res) => {
          console.log(res);
          console.log("************", res);
          this.shows = res;
        });
      });
    },
    //选页
    curchange(index) {
      console.log(index);
      this.page = index;
      console.log(this.page);
      getModelCountByProductId({ productId: this.productId }).then((res) => {
        this.total = res;
        //获取展品接口
        exhibitModel({
          page: index - 1,
          productId: this.productId,
          size: 6,
        }).then((res) => {
          console.log(res);
          this.shows = res;
        });
      });
    },
    //上传图片
    upimg(i,response, file, fileList) {
      this.shows[i].imgs.push({
        id:null,
        url:response
      })
      console.log(fileList);
      // this.shows[i].modelImgSrc = response;
    },
    //删除图片
    handleRemove(i,file){
      const index=this.shows[i].imgs.findIndex(i=>i.url===file.url)
      this.shows[i].imgs.splice(index,1)
      console.log(this.shows[i].imgs);
    },
    //删除展品
    delmodel(i) {
      console.log(this.shows[i].modelId);
      this.$confirm("是否删除该展品", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          deleteModel({ modelId: this.shows[i].modelId }).then((res) => {
            if (res === "success") {
              this.shows.splice(i, 1);
              this.$message({
                message: "删除成功",
                type: "success",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },
    //修改展品
    changeshow(i) {
      console.log(this.shows[i]);
      updateModel(this.shows[i]).then((res) => {
        console.log(res);
        if (res === "success") {
          this.$message({
            message: "修改成功",
            type: "success",
          });
        }
      });
    },
    //上移
    upmove(i) {
      updownMove({ modelId: this.shows[i].modelId, status: "moveUp" }).then((res) => {
        if (res.status === 200) {
          this.curchange(this.page)
          this.$message.success('上移成功');
        } else {
          this.$message.error('数据提交失败');
        }
      }).catch((err) => {
        this.$message.error('网络错误:', err);
      })
    },
    //下移
    downmove(i) {
      updownMove({ modelId: this.shows[i].modelId, status: "moveDown" }).then((res) => {
        if (res.status === 200) {
          this.curchange(this.page)
          this.$message.success('下移成功');
        } else {
          this.$message.error('数据提交失败');
        }
      }).catch((err) => {
        this.$message.error('网络错误:', err);
      })
    },
    //置顶
    changeshowTop(i) {
      let isTop = 0;
      if (this.shows[i].isTop !== "2000-01-01 00:00:00") {
        isTop = 0;
      } else {
        isTop = 1;
      }
      let Inc = Math.random();
      exhibitTop({ modelId: this.shows[i].modelId, isTop: isTop })
        .then((res) => {
          if (res === "success" && isTop === 1) {
            this.$message({
              message: "置顶成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "取消置顶成功",
              type: "success",
            });
          }
        })
        .then(() => {
          //获取展品接口
          exhibitModel({
            page: this.page - 1,
            productId: this.productId,
            size: 6,
            op: Inc++,
          }).then((res) => {
            this.shows = res;
          });
        });
    },
    //匹配数字
    confirmTelephone1(i) {
      console.log("1");
      if (
        !/^([+]\d+[.]\d+|[-]\d+[.]\d+|\d+[.]\d+|[+]\d+|[-]\d+|\d+)$/.test(
          this.shows[i].productPrice
        )
      ) {
        this.shows[i].productPrice = "";
        this.$message({
          message: "输入错误，请输入数字",
          type: "warning",
        });
      }
    },
    confirmTelephone2(i) {
      if (
        !/^([+]\d+[.]\d+|[-]\d+[.]\d+|\d+[.]\d+|[+]\d+|[-]\d+|\d+)$/.test(
          this.shows[i].productPriceOnTmall
        )
      ) {
        this.shows[i].productPriceOnTmall = "";
        this.$message({
          message: "输入错误，请输入数字",
          type: "warning",
        });
      }
    },
  },
  created() {
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
<style>
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
/* a {
  text-decoration: none;
} */
.body {
  display: flex;
  flex-wrap: wrap;
  width: 1200px;
  margin: 50px auto;
}

.showbox {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  height: auto;
  width: 30%;
  margin: 10px 20px 20px 0px;
  background-color: rgb(255, 255, 255);
  padding: 20px 0 20px 0;
}

.tagactive {
  background-color: rgb(126, 193, 255);
}

.add-del {
  display: flex;
  justify-content: center;
}

.imagePic{
  transition: all 0.3s ease; 
  cursor: pointer;
}

.imagePic::before{
  content: "";
  background-image: url("../../../assets/delete.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 25px;
  position: absolute;
  width: 100%;
  height: 100%;
  top:0;
  left:0;
  font-size: 24px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;

}

.imagePic:hover::before {
  opacity: 1;
}
</style>