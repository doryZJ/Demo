<template>
	<div>
    <p>
      user: {{user}}
    </p>
		<e-nav></e-nav>
		<!-- <input type="file" class="input-file" @change="uploadFile">
		<button @click="fileHandle">上传文件</button> -->
		<!-- <div id="map"></div> -->
		<!-- <div id="legend"></div> -->
		<!-- <hello :msg=message @increment="parincrement"></hello> -->	
		<!-- <VueUEditor @ready="editorReady" style="width: 800px"
		></VueUEditor> -->
		<el-upload
			class="avatar-uploader"
			:action="action"
			:http-request="handleUpload"
			:show-file-list="false"
		>
		<i class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
    <transition name="custom-classes-transition"
                enter-active-class="animated tada"
                leave-active-class="animated bounceOutRight"
    >
      <div v-if="show">hello</div>
    </transition>
		<div @click="handleShow">toggle</div>  
    <ul class="" class="avatarList" v-if="images">
			<li v-for="(image, index) in images" @click="toggleCover(index)">
				<img :src="image.url" class="img"  >
        <span class="cover" v-show="index === coverIndex">
          <img src="../assets/images/cover-enable.png">
        </span>
        <span class="delete" @click="deleteCover(image.url, index)">
          <img src="../assets/images/cover-delete.png">
        </span>
			</li>
		</ul>
        <div class="field">
          <label for="username">username</label>
          <input id="username" type="text" 
                 v-model="username"
                 >
          <!-- <label v-if="$validation1.username.required">请输入姓名！</label> -->
        </div>
        <div class="field">
          <label for="comment">comment</label>
          <input id="comment" type="text"
                 v-model="comment" 
                 v-validate:comment="['required']">
         <!-- <label v-if="$validation1.comment.required">请输入评论！</label> -->
        </div>
        <button @click.stop="checkForm">验证</button>
    <m-progress  :percentage="120" style="margin-top: 60px;"></m-progress>
    <router-link to="/login">登录</router-link>
    <router-view :name="login"></router-view>
	</div>
</template>
<script>
	import GoogleMapsLoader from 'google-maps'
	import $ from 'jquery'
	import {uploadFile} from '../api/upload/index'
	import Hello from '../components/Hello'
	import VueUEditor from '../components/UEditor'
  import MProgress from '../components/progress'
	import ENav from '../components/Nav'
	import getLanguage from '../api/language'
	import File from '../api/file/index'
	
	export default{
		name: 'home',
		data() {
			const site = window.localStorage['site']
 			return {
 				token: window.sessionStorage.id_token,
 				uploadList: [],
 				plan: '50%',
 				flag: '1',
 				message:'hello',
 				imageUrl: '',
 				action: `http://121.40.161.244:8080/${site}/files/upload`,
 				images: [],
        coverIndex: 0,
        user: this.$store.state.token,
        product: {
          cover: ''
        },
        show: false,
        minlength: 3,
        username: '',
        comment: '',
        $validation: {
          "valid": false, // 字段校验是否通过 
           "invalid": true, // valid 取反
           "touched": false, // 校验字段所在元素获得通过焦点时返回true，否则返回false
           "untouched": true, // touched 取反
           "modified": false, // 当元素值与初始值不同时返回true，否则返回false
           "dirty": false, // 字段值改变过至少一次返回true，否则返回false 
           "pristine": true, // dirty 取反
           // 字段单一验证
           "username": {
            "required": true,
           },
           "comment": {
            "maxlength": false,
           }
        }
 			}
 		},
		computed:{
			
 		},
 		mounted() {
 			// this.addmap()
 			//this.getLanguage()
      console.log(this.$msg)
 		},
 		components:{
 			Hello,
 			VueUEditor,
 			ENav,
      MProgress
 		},
 		methods: {
      checkForm() {
        // this.$validation()
      },
      handleEnter(e) {
        const target = e.target
        const nodeNext = target.nextElementSibling
        nodeNext.focus()

      },
      handleShow() {
        this.show = !this.show
      },
 			fileHandle(e){
 				const dom = e.target
 				const oFile = dom.parentNode.children[0];
 				oFile.click()
 			},
 			getLanguage() {
 				getLanguage()
 					.then((res) => {
 						console.log(res)
 					})
 					.catch((err) => {
 						console.log(err)
 					})
 			},
 			parincrement(){
 				console.log("hello")
 			},
 			uploadFile(e){
 				const Dom = e.target
 				const FileController = '/images/upload.php'
 				const formData = new FormData()
 				this.uploadList.push({
 					name: Dom.files[0].name,
 					state: false,
 					plan: '0%'
 				})
 				const index = this.uploadList.length - 1
 				formData.append('file',Dom.files[0])
 				console.log(formData)
 				let xhr = new XMLHttpRequest()
 				xhr.open('post',FileController,true)
 				// xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
 				xhr.onreadystatechange = function(){
		            if(xhr.status == 200){
		                if(xhr.readyState == 4){
		                	console.log(xhr)
		                }}
	                }
 				xhr.send(formData)
 				// uploadFile(formData)
 				// 	.then((res) => {
 				// 		console.log(res)
 				// 	})
 				// 	.catch((err) => {
 				// 		console.log(err)
 				// 	})
 			},
 			beforeAvatarUpload(file) {
 				const isType = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
 			 	const isLt2M = file.size / 1024 / 1024 < 2;
 				if (!isType) {
 					this.$message.error('上传头像图片是 JPG/PNG 格式!');
 				}
 				if (!isLt2M) {
 					this.$message.error('上传头像图片大小不能超过 2MB!');
 				}
 				return isType && isLt2M
 			},
 			handleUpload(e) {
 				const file = e.file
 				if ( !this.beforeAvatarUpload(file) ) {
 					return
 				}
 				const formData = new FormData()
 				formData.append('files', file)
 				File.uploadFile(formData)
 					.then((res) => {
 						const data = res.data
            this.handleAvatarSuccess(data)
 					})
 					.catch((err) => {
 						console.log(err)
 					})
 			},
 			handleAvatarSuccess(res, file) {
        const code = res.code
        if (code === 0) {
          this.images.push({
            url: res.data
          })
          if (this.images.length === 1) {
            this.product.cover = this.images[0].url
          }
        } else {
          this.$message.error('上传失败，请重试！')
        }
 			},
      toggleCover(e) {
        this.coverIndex = e
      },
      deleteCover(uuid, index) {
        File.deleteImage(uuid)
          .then((res) => {
            console.log(res)
            if (res.data.code === 0) {
              this.images.splice(index, 1)
              if (this.images.length) {
                this.toggleCover(0)
              }
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
            } else {
              this.$message.error(res.data.msg)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
 			// addmap(){
 			// 	let mapObj = document.getElementById('map')
 			// 	let legendObj = document.getElementById("legend")
 			// 	GoogleMapsLoader.load((google) => {
 			// 		let uluru = {lat: 35.6792, lng: 139.78737999999998};
 			// 		let icon = 'http://zj.jinwen.tech/images/icon_map.png'
 			// 		var styledMapType = new google.maps.StyledMapType(
			 //            [
			 //              {
			 //                featureType: 'all',
			 //                stylers: [{color: '#fbfbfb'}]
			 //              },
			 //              {
			 //                featureType: 'administrative',
			 //                stylers: [{color: '#dadada'}]
			 //              },
			 //              {
			 //                featureType: 'landscape',
			 //                stylers: [{color: '#dadada'}]
			 //              },
			 //              {
			 //                featureType: 'road',
			 //                stylers: [{color: '#fbfbfb'}]
			 //              },
			 //              {
			 //                featureType: 'transit',
			 //                stylers: [{color: '#fbfbfb'}]
			 //              },
			 //              {
			 //                featureType: 'administrative.locality',
			 //                elementType: 'labels.text.fill',
			 //                stylers: [{color: '#000000',fontSize: '16px'}]
			 //              },
			 //            ],
			 //            {name: 'Styled Map'})
			 //        let map = new google.maps.Map(mapObj, {
			 //          zoom: 2,
			 //          center: uluru,
			 //          mapTypeControlOptions: {
				// 	     mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
				// 	  },	
			 //        });
			 //        let cityNames = ['London','Paris','Berlin','Shanghai','Tokyo','Sydney','Los Angeles','New York']
			 //        map.mapTypes.set('styled_map', styledMapType)
       //       			map.setMapTypeId('styled_map')
			 //        let features = [{
			 //        	position: new google.maps.LatLng(51.50568,-0.12563),
			 //        	name: 'London'
			 //        },
			 //        {
			 //        	position: new google.maps.LatLng(48.85556,2.31245),
			 //        	name: 'Paris'
			 //        },
			 //        {
			 //        	position: new google.maps.LatLng(52.51050,13.40713),
			 //        	name: 'Berlin'
			 //        },
			 //        {
			 //        	position: new google.maps.LatLng(31.18331,121.43657),
			 //        	name: 'Shanghai'
			 //        },
			 //        {
			 //        	position: new google.maps.LatLng(35.6792,139.78737),
			 //        	name: 'Tokyo'
			 //        },
			 //        {
			 //        	position: new google.maps.LatLng(-25.363,131.044),
			 //        	name: 'Sydney'
			 //        },
			 //        {
			 //        	position: new google.maps.LatLng(34.05369,-118.24275),
			 //        	name: 'Los Angeles'
			 //        },
			 //        {
			 //        	position: new google.maps.LatLng(40.72775,-73.99736),
			 //        	name: 'Los Angeles'
			 //        },
			 //      ]
			 //      for (let i=0;i<features.length;i++){
			 //      	let marker = new google.maps.Marker({
			 //          position: features[i]['position'],
			 //          icon: icon,
			 //          //label: features[i]['name'],
			 //          map: map
			 //        });
			 //      }
 			// 	})
 			// },
 			editorReady (editorInstance) {
 				editorInstance.setContent('hello world')
 				editorInstance.addListener('contentChange',() => {
 					console.log('编辑器内容发生了变化',editorInstance.getContent())
 				})
 			}
 		},
    directives: {
      focus: {
        inserted: function(el) {
          el.focus()
        }
      }
    }
	}
</script>
<style lang="scss">
  body {
    SCROLLBAR-FACE-COLOR:   #ffcc99; 
   SCROLLBAR-HIGHLIGHT-COLOR:   #ff0000; 
   SCROLLBAR-SHADOW-COLOR:   #ffffff; 
   SCROLLBAR-3DLIGHT-COLOR:   #000000; 
   SCROLLBAR-ARROW-COLOR:   #ff0000; 
   SCROLLBAR-TRACK-COLOR:   #dee0ed; 
   SCROLLBAR-DARKSHADOW-COLOR:   #ffff00;
  }
	#map{
		width: 100%;
		height: 400px;
		background-color: #fbfbfb
	}
	.labels{
		color: #dadada;
	}
	.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100px;
    height: 100px;
    float: left;
    margin-right: 20px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .el-icon-plus:before {
  	width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
    float: left; 
    margin-right: 10px;
  }
  .avatarList {
  	list-style: none;

  	li {
      width: 100px;
      height: 100px;
  		float: left;
  		margin-left: 10px;
      position: relative;

      .img {
        width: 100px;
        height: 100px;
        border: 1px solid #ebebec;
        border-radius: 6px;
        box-sizing: border-box;
      }

      .cover {
        position: absolute;
        right: 0;
        top: 0;
      }

      .delete {
        position: absolute;
        right: -8px;
        bottom: -11px;
      }
  	}
  }

  .scroll {
    width: 200px;
    height: 100px;
    overflow-y: auto;
    border: 1px solid #ccc;
  }
  ::-webkit-scrollbar {
      width: 0;/*对垂直流动条有效*/
      height: 0;/*对水平流动条有效*/
    }
</style>