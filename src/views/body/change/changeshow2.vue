<template>
  <div>
    <el-select v-model="value" placeholder="请选择" @change="selectclass" class="select">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :filterable="true"
      ></el-option>
    </el-select>
    <form action>
      <el-table
        ref="drag2Table"
        :row-key="tableData => tableData.categoryId"
        :default-sort="{ prop: 'sortId' }"
        :data="tableData"
        border
        style="margin: auto"
        id="middle"
      >
        <el-table-column prop="sortId" v-show="false"></el-table-column>
        <el-table-column prop="productName" label="名字" width="400">
          <template slot-scope="scope">
            <el-input type="text" v-model="scope.row.productName" />
          </template>
        </el-table-column>
        <el-table-column prop="imageSrc" label="图片" width="400">
          <template slot-scope="scope">
            <el-image
              style="width: 200px; height: 180px"
              :src="`${domain}/${scope.row.imageSrc}`"
              fit="fit"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="350">
          <template slot-scope="scope">
            <el-upload
              class="upload-demo"
              action="/exhibit/uploadPicture"
              name="picture"
              :show-file-list="false"
              :on-success="
                (res, file, fileList) => {
                  upimg(scope.row, res, file, fileList);
                }
              "
            >
              <el-button type="primary" style="float: left">上传图片</el-button>
            </el-upload>
            <el-button
              v-if="scope.row.categoryId"
              type="success"
              @click="confirmproduct(scope.row)"
            >确定修改</el-button>
            <el-button v-else type="success" @click="addchange(scope.row)">确定添加</el-button>

            <el-button
              v-if="scope.row.categoryId"
              type="danger"
              @click="handleClose(scope.row.productId)"
            >删除</el-button>
            <el-button v-else type="warning" @click="cancelchange()">取消</el-button>
          </template>
        </el-table-column>
        <el-table-column></el-table-column>
      </el-table>
    </form>
    <el-button :disabled="btndisable" type="warning" @click="addclass" style="margin-top: 10px">添加</el-button>
    <!-- <el-button type="success" @click="submit">修改</el-button> -->
  </div>
</template>
<script>
import Sortable from 'sortablejs'
import {
  exhibitCategory,

} from "@/api/exhibit.js";
import {
  updateProduct,
  deleteProduct,
  saveProduct,
  updateProductSortId
} from "@/api/show.js"
import { domain } from '@/utils/state'
import {
  exhibitProduct,
} from "@/api/show.js";
export default {
  data() {
    return {
      tableData: [],
      btndisable: false,
      domain: domain,
      options: [],
    };
  },
  methods: {
    //选择类别
    selectclass(categoryId) {
      this.classnum = categoryId;
      console.log(categoryId);
      exhibitProduct({ categoryId }).then((res) => {
        this.tableData = res;
        console.log(this.tableData);
        this.showlist = [];
        this.shows = [];
        this.ischoose = true;
      });
      this.btndisable = false; //此处为了解决用户在点击添加后，如果切换类别会导致添加按钮不可点击

      this.$nextTick(() => {
        this.setSort()  //数据渲染完毕执行方法
      })
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

    //上传图片
    upimg(row, response, file, fileList) {
      console.log(row);
      console.log(response);
      row.imageSrc = response;
      console.log(row);
    },

    //点击添加按钮
    addclass() {
      let item = {
        // categoryId: this.tableData.length + 1,
        productName: "",
        imageSrc: "",
      };
      this.tableData.push(item);
      console.log(this.tableData);
      this.btndisable = true;
    },

    //取消新增
    cancelchange() {
      this.selectclass(this.value)
      this.btndisable = false;
    },

    //增加
    addchange(row) {
      console.log(row);
      if (row.productName && row.imageSrc) {
        saveProduct({ productName: row.productName, imageSrc: row.imageSrc, categoryId: this.value }).then((res) => {
          console.log(res);
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.selectclass(this.value)
        });
      } else if (row.productName) {
        this.$message({
          message: "没有照片，请上传",
          type: "warning",
        });
      } else {
        this.$message({
          message: "没有标题，请输入",
          type: "warning",
        });
      }
    },

    //删除品名
    handleClose(tag) {
      console.log(tag);
      deleteProduct({ productId: tag }).then((res) => {
        console.log(res);
        if (res === "failure") {
          this.$message.error("该品名下面有型号，删除失败");
        } else {
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].productId === tag) {
              this.tableData.splice(i, 1);
            }
          }
          this.$message({
            message: "删除成功",
            type: "success",
          });
        }
        console.log(res);
      });
    },

    setSort() {
      const el = this.$refs.drag2Table.$el.querySelectorAll(
        '.el-table__body-wrapper > table > tbody'
      )[0];
      this.sortable = Sortable.create(el, {
        //拖拽结束执行,evt执向拖拽的参数
        onEnd: evt => {
          console.log(evt.oldIndex, evt.newIndex);
          if (evt.oldIndex !== evt.newIndex) {
            const currRow = this.tableData.splice(evt.oldIndex, 1)[0];
            this.tableData.splice(evt.newIndex, 0, currRow);
            const data = this.tableData.map(v => v.productId)
            console.log(data);
            //数据提交失败则重新请求数据
            updateProductSortId(this.value, data).then((res) => {
              if (res.status !== 200) {
                this.$message.error('数据提交失败，请重新提交');
              }
            }).catch((err) => {
              this.$message.error('网络错误:', err);
            })
          }
        }
      })
    },

    //排序规则
    sortByDate(obj1, obj2) {
      let val1 = obj1.sortId
      let val2 = obj2.sortId
      return val1 - val2
    }

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
      this.value = res[0].categoryId
      this.selectclass(this.value)
    });


  },
};
</script>
<style scoped>
.select {
  margin-bottom: 20px;
}
</style>
