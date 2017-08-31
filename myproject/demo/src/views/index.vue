<template>
	<div class="index">
    <div class="home__main">
     
    </div>

  </div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import lan from '../vuex/type'
	export default{
		name: 'index',
		data(){
			return {
				hostSell: [],
		      	banner: [],
		      	swiperOption: {
		        	pagination: '.swiper-pagination',
		        	nextButton: '.swiper-button-next',
		        	prevButton: '.swiper-button-prev',
			        preventClicks: false,
			        preventClicksPropagation: false,
			        slidesPerView: 1,
			        spaceBetween: 30,
		        	loop: true
		      	},
		      	sliderHeight: '400px'
			}
		},
		computed:{
			...mapGetters({
 				lanPackage: lan.G_lanPack
 			}),
		},
		mounted() {
			console.log(this.lanPackage)
		},
		methods: {
			
		}

	}
</script>
<style lang="scss" scoped>

.slider-router {
  display: block;
  height: 350px;
  width: 100%;
  background-position: center;
  background-size: auto;
}
 .slider-container {
   & {
     width: 100%;
     height: 300px;
     overflow-x: hidden;
     position: relative;
   }
   ul {
     & {
       display: flex;
       position: absolute;
       height: 500px;
     }
     li {
       display: inline-block;
       min-width: 100%;
       img {
         width: 100%;
       }
     }
   }
 }
 
 

</style>