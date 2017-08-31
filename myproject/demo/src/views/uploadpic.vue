<template>
  <!-- <el-upload class='upload-demo'
    action="http://zj.jinwen.tech:8080/images/"
    :file-list="fileList"
  >
    <el-button type="primary">点击上传</el-button>
  </el-upload>  --> 
  <vue-core-image-upload
    class="btn btn-primary"
    text="上传图片"
    url="/images/uploadpic.php"
    :crop="false"
    @imageuploaded="imageuploaded"
  >
  </vue-core-image-upload>
</template>
<script>
  import VueCoreImageUpload from 'vue-core-image-upload'
  export default {
    name: 'uploadpic',
    data () {
      return {
        src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png'
      }
    },
    components: {
      'vue-core-image-upload' : VueCoreImageUpload
    },
    methods: {
      imageuploaded(res) {
        console.log(res)
      }
    }
  }
</script>
