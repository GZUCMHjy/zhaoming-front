<template>
  <div>
    <form action>
      <el-table
        ref="dragTable"
        :row-key="tableData => tableData.categoryId"
        :default-sort="{ prop: 'sortId' }"
        :data="tableData"
        border
        style="margin: auto"
        id="middle"
      >
        <el-table-column prop="sortId" v-show="false"></el-table-column>
        <el-table-column prop="title" label="名字" width="400">
          <template slot-scope="scope">
            <el-input type="text" v-model="scope.row.title" />
          </template>
        </el-table-column>
        <el-table-column prop="imgSrc" label="图片" width="400">
          <template slot-scope="scope">
            <el-image
              style="width: 200px; height: 180px"
              :src="`${domain}/${scope.row.imgSrc}`"
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
              @click="changethis(scope.row)"
            >确定修改</el-button>
            <el-button v-else type="success" @click="addchange(scope.row)">确定添加</el-button>

            <el-button
              v-if="scope.row.categoryId"
              type="danger"
              @click="delthis(scope.row.categoryId)"
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
  deleteCategory,
  updateCategory,
  saveCategory,
  updateAllCategories
} from "@/api/exhibit.js";
import { domain } from '@/utils/state'
export default {
  data() {
    return {
      tableData: [],
      btndisable: false,
      domain: domain
    };
  },
  methods: {
    addclass() {
      let item = {
        // categoryId: this.tableData.length + 1,
        title: "",
        imgSrc: "",
      };
      this.tableData.push(item);
      console.log(this.tableData);
      this.btndisable = true;
    },
    //增加
    addchange(row) {
      console.log(row);
      if (row.title) {
        saveCategory({ title: row.title, imgSrc: row.imgSrc }).then((res) => {
          console.log(res);
          this.$message({
            message: "添加成功",
            type: "success",
          });
          exhibitCategory().then((res) => {
            console.log(res);
            this.tableData = res;
            this.btndisable = false;
          });
        });
      } else {
        this.$message({
          message: "没有标题，请输入",
          type: "warning",
        });
      }
    },
    //取消
    cancelchange() {
      exhibitCategory().then((res) => {
        console.log(res);
        this.tableData = res;
        this.btndisable = false;
      });
    },
    //上传图片
    upimg(row, response, file, fileList) {
      console.log(row);
      console.log(response);
      row.imgSrc = response;
    },
    //修改
    changethis(category) {
      console.log(category);
      updateCategory(category).then((res) => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
      });
    },
    //删除
    delthis(categoryId) {
      console.log(categoryId.toString());
      deleteCategory({ categoryId }).then((res) => {
        if (res === "success") {
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].categoryId === categoryId) {
              this.tableData.splice(i, 1);
            }
          }
          this.$message({
            message: "删除成功",
            type: "success",
          });
        } else if (res === "haveProduct") {
          this.$message.error("该类含有内容，删除失败");
        } else this.$message.error("删除失败");
      });
    },
    async getBanner(val) {

      await exhibitCategory().then((res) => {
        this.tableData = res;
        console.log(this.tableData)
      });
      this.$nextTick(() => {
        this.setSort()  //数据渲染完毕执行方法
      })
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll(
        '.el-table__body-wrapper > table > tbody'
      )[0];
      this.sortable = Sortable.create(el, {
        //拖拽结束执行,evt执向拖拽的参数
        onEnd: evt => {
          if (evt.oldIndex !== evt.newIndex) {
            const currRow = this.tableData.splice(evt.oldIndex, 1)[0];
            this.tableData.splice(evt.newIndex, 0, currRow);
            const data = this.tableData.map(v => v.categoryId)
            //数据提交失败则重新请求数据
            updateAllCategories(data).then((res) => {
              if (res.status !== 200) {
                this.getBanner();
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
    this.getBanner()

  },
};
</script>
