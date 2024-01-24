<template>
  <div>
    <el-upload
      action="/exhibit/uploadPicture"
      name="picture"
      :multiple="true"
      list-type="picture-card"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :on-success="handlesucess"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-error="handleError"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <el-button size="small" type="primary" @click="submitimg">修改轮播图</el-button>
  </div>
</template>
<script>
import {exhibitCarouselPictures,updateCarouselPictures} from '@/api/exhibitPicture.js';
import {deletePicture} from '@/api/Picture.js';
import { domain } from '@/utils/state'
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      fileList:[],   //图片列表
      fileLists:[],  //图片路径列表
      domain: domain
    };
  },
  methods: {
     beforeUpload(file) {
      console.log(file)
     },
    handleRemove(file, fileList) {
      let pictureList=[]
      console.log(file, fileList);
      this.fileList=fileList;
      for(let i=0;i<this.fileList.length;i++){
        pictureList.push(this.fileList[i].url);
      }
      this.fileLists=pictureList;
      let url=file.url;

      deletePicture({pictureSrc:url}).then(res=>{
        console.log(res);
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlesucess(response, file, fileList){
      let img={
        name:response,
        url: domain + '/' + response
      }
      this.fileList.push(img),
      this.fileLists.push(response)
      console.log(response,file,fileList)
    },
    submitimg(){
      console.log(this.fileList);
      console.log(this.fileLists);
      updateCarouselPictures({strings: this.fileLists}).then(res=>{
        console.log(res);
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      })
    },
    handleError(err, file, fileList){
     console.log(err, file, fileList)
    }

  },
  created(){
    exhibitCarouselPictures().then(res=>{
      console.log(res);
      let pictureList=[];
      this.fileLists = res.map(item=>{
        return item.pictureSrc
      })
      for(let i=0;i<res.length;i++){
        pictureList.push(res[i].pictureSrc);
      }
      this.fileList = pictureList.map(item => {
       return {
         name: item,
         url: domain + '/' +item
       }
      });
      console.log(this.fileList);
    })
  }
};
</script>