<template>
<el-upload
  class="upload-demo"
  ref="upload"
  action=""
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :auto-upload="false"
  list-type="picture">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <div slot="tip" class="el-upload__tip">上传文件不超过500kb</div>
</el-upload>
</template>
<script>
  export default {
    data() {
      return {
        fileList: []
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>