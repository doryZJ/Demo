<template>
	<div>
		<!-- <router-link to="/home/cn">
			<span>
				中文
			</span>
		</router-link>	
		<router-link to="/home/en">
			<span>
				英文
			</span>
		</router-link>
		<router-link to="/home/jp">
			<span>
				日语
			</span>
		</router-link> -->
		<div class="main">
		    <div class="main__main">
		      <img src="../assets/images/logo.png" alt="">
		      <p>WELCOME TO KINGCORE STORE</p>
		      <div class="main__main__language">
		        <ul>
		          <li
		          v-for='language in languageList'
		          @click='selectLanguage(language)'>
		            <img :src="language.icon" alt="">
		          </li>
		        </ul>
		      </div>
		    </div>
		  </div>
	</div>
</template>
 <script>
 	import { mapGetters,mapActions } from 'vuex'
	import lan from '../vuex/type'
 	export default{
 		name: 'main',
 		data() {
 			return {
 				lan: 'en',
 				lanList: null,
 				lanPack: null,
 			}
 		},
 		computed: {
 			...mapGetters({
 				'curlanguage': lan.G_lan,
 				'languageList': lan.G_lanList,
 				'languagePack': lan.G_lanPack
 			})
 		},
 		mounted(){
 			this.getLanList()
 		},
 		methods: {
 			...mapActions({
 				'getLan': lan.A_lan,
 				'getLanList': lan.A_lanList
 			}),
 			selectLanguage(language){
 				this.getLan(language.content)
 				// console.log(this.curlanguage)
 				 //console.log(this.languagePack)
 				this.$router.push("/index")
 			}
 		}
 		
 	}
 </script>
<style lang='scss' soped>
  #app {
    height: 100%;
  }
  .main {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../assets/images/main_bg.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    &__main {
      background: #d7d2d3;
      opacity: .8;
      padding: 30px 100px;
      text-align: center;
      border-radius: 5px;
      p {
        display: block;
        padding: 10px;
        color: #43484b;
        font-size: 14px;
        border-bottom: 1px solid #000;
      }

      &__language {
        ul {
          display: flex;
          width: 100%;
          justify-content: space-between;
          li {
            list-style: none;
            margin-right: 30px;
          }
          li:nth-last-child(1) {
            margin-right: 0;
          }
        }
      }
    }
  }
</style>