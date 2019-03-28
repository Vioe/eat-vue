<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide v-for="(slide,index) in swiperSlides" :key="index" class="hh">
        <img :src="slide.swiperUrl" class="img" alt="">
      </swiper-slide>
        <!--<div class="swiper-pagination" slot="pagination"></div>-->
    </swiper>
  </div>
</template>

<script>
    export default {
        name: "homeSwiper",
       data(){
          return {
            swiperOption: {
              pagination: {
                el: '.swiper-pagination',
                // dynamicBullets: true,
                // clickable :true,
              },
              autoplay: {
              delay: 3000,
              stopOnLastSlide: false,
              disableOnInteraction: true,
              },
            },
            swiperSlides: [
              {"swiperUrl":"http://images.meishij.net/p/20161011/7cca169c9aff32f682e482fc8a987d0c.jpg"},
              {"swiperUrl":"http://images.meishij.net/p/20170123/6d637a92a2423a1085d8e79d6847c184.jpg"},
              {"swiperUrl":"http://images.meishij.net/p/20161128/72d4cf45f75f20a0dccb01940a6cc9b8.jpg"}
            ]
          }
       },
      mounted() {
        // setInterval(() => {
        //   console.log('simulate async data')
        //   if (this.swiperSlides.length < 10) {
        //     this.swiperSlides.push(this.swiperSlides.length + 1)
        //   }
        // }, 3000)
      }

    }
</script>

<style scoped>
.hh{
  width: 700px;
  height:405px;
  text-align: center;
  line-height: 400px;
  background-color: #ccc;
}
  .big{
    width: 30px;
    height: 60px;
    background-color: red;
  }
</style>
