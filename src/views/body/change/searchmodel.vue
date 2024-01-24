<template>
  <div>
    <div class="search bar7">
      <form>
        <input
          type="text"
          placeholder="请输入您要搜索的展品"
          v-model="inputValue"
        />
      </form>
      <el-button type="success" round @click="search">搜索</el-button>
    </div>
    <!-- body -->
    <div class="body">
      <div v-for="(item, i) in shows" :key="i" class="showbox">
        <el-form label-width="110px">
          <el-form-item :model="item" label="型号:" style="margin-top: 10px">
            <el-input
              class="input"
              v-model="item.modelName"
              placeholder="请输入内容"
            ></el-input>
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
            <el-button type="primary" style="float: left" size="mini"
              >上传图片</el-button
            >
          </el-upload> 

          <el-form-item
            label="价格:"
            style="margin-top: 10px"
            prop="productPrice"
          >
            <el-input
              class="input"
              v-model="item.productPrice"
              placeholder="请输入数字"
              @change="confirmTelephone1(i)"
            >
              ></el-input
            >
          </el-form-item>

          <el-form-item label="备注：" prop="productPriceOnTmall">
            <el-input
              class="input"
              v-model="item.productPriceOnTmall"
              placeholder="请输入内容"
            >
              ></el-input
            >
          </el-form-item>

          <el-form-item label="光源:">
            <el-input
              class="input"
              v-model="item.deploy"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>

          <el-form-item label="灯头规格:">
            <el-input
              class="input"
              v-model="item.lampHolderSpecifications"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>

          <el-form-item label="尺寸:">
            <el-input
              class="input"
              v-model="item.size"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>

          <el-form-item label="分别价格:">
            <el-input
              class="input"
              v-model="item.specification"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>

          <el-form-item label="材质:">
            <el-input
              class="input"
              v-model="item.material"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="btn-flex">
          <el-button type="success" @click="changeshow(i)">修改</el-button>
          <el-button type="danger" @click="delmodel(i)">删除</el-button>
          <el-button
          style="margin-right: 10px;"
            :type="item.isTop !== '2000-01-01 00:00:00' ? 'warning' : 'primary'"
            @click="changeshowTop(i)"
          >
            {{ item.isTop !== "2000-01-01 00:00:00" ? "取消置顶" : "置顶" }}
          </el-button>
          <copyProduct :modelId="item.modelId"/>
        </div>
      </div>
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
    >
    </el-pagination>
  </div>
</template>

<script>
import { deleteModel, updateModel, exhibitTop } from "@/api/show.js";
import { findModelByName, findModelByNameCount } from "@/api/search.js";
import copyProduct from "../copyCoponent/copyProduct.vue";
import { domain } from '@/utils/state'
export default {
  components: {
    copyProduct,
  },
  data() {
    return {
      inputValue: "", //input的值
      currentValue: "",
      value: "",
      total: 6, //modal总数
      shows: [], //展品数据
      page: 0, //当前页数
      domain: domain,
    };
  },
  methods: {
    //搜索
    search() {
      console.log(this.inputValue);
      findModelByName({
        modelName: this.inputValue,
        page: this.page,
        size: 6,
      }).then((res) => {
        findModelByNameCount({ modelName: this.inputValue }).then((res) => {
          console.log(res);
          this.total = res;
        });
        console.log(res);
        if (res.length === 0) {
          this.$message({
            type: "warning",
            message: "未查询到相应的展品",
          });
        }
        this.shows = res;
      });
    },
    //修改
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
            console.log(res);
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
    //选页
    curchange(index) {
      console.log(index);
      this.page = index;
      console.log(this.page);
      //获取展品接口
      findModelByName({
        modelName: this.inputValue,
        page: index - 1,
        size: 6,
      }).then((res) => {
        console.log(res);
        this.shows = res;
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
    //置顶
    changeshowTop(i) {
      let isTop = 0;
      if (this.shows[i].isTop !== "2000-01-01 00:00:00") {
        isTop = 0;
        this.shows[i].isTop = "2000-01-01 00:00:00";
      } else {
        isTop = 1;
        this.shows[i].isTop = "temporary";
      }
      exhibitTop({ modelId: this.shows[i].modelId, isTop: isTop }).then(
        (res) => {
          if (
            res === "success" &&
            this.shows[i].isTop !== "2000-01-01 00:00:00"
          ) {
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
        }
      );
    },
  },
};
</script>

<style scoped>
/*搜索框7*/
.bar7 form {
  height: 42px;
}
.bar7 input {
  width: 250px;
  font-size: 15px;
  line-height: 25px;
  border-radius: 42px;
  border: 2px solid #324b4e;
  transition: 0.3s linear;
}
.bar7 input:focus {
  width: 300px;
}
.bar7 button {
  top: -2px;
  right: 0;
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

.body {
  display: flex;
  flex-wrap: wrap;
  width: 1200px;
  margin: 50px auto;
}
.btn-flex {
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