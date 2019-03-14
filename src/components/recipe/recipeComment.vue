<template>
  <div>
    <div class="row" >
      <div>
        <p class="text commentTitle">评论内容</p>
          <!-- 发布内容输入框，利用Html5的新属性contenteditable，实现可编辑文本 ，会自动将插入的IMG标签解析-->
          <div class="publish_container">
           <p contenteditable="true" id="input_conta" ></p>
          </div>
      </div>
    </div>
    <div class="row">
      <!-- 表情和发送-->
      <div class="face_container">
        <!-- 表情Icon，点击触发事件，动态生成表情并显示 -->
        <span @click="flag=!flag" class="make_face" ><img src="/static/eoim/face2.png"alt=""></span>
        <!--<span class="send" @click=send()>选择表情</span>-->
        <span class="send btn" @click=send()>发送评论</span>
        <!-- 表情容器 ，包裹生成的表情，绑定点击表情事件-->
        <div id="face" style="width: 338px;height: 170px;background-color: white;border:1px solid #cccccc;margin-left: 20px;" @click=choice_face($event) v-if="flag" v-html="eoimImg"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"
  import $ from 'jquery'//加载jquery，需要安装npm install jquery -S
  export default {
    name: 'HelloWorld',
    data(){
      return {
        flag:false,
        isClick: false,
        eoimImg:""
      }
    },
    created(){
      console.log(this.$route.params.cardId)
      for(var i=1;i<=84;i++) {
        this.eoimImg += `<img src="/static/eoim/${i}.png" class="eoimPic" width="20px" height="20px" style="margin-left: 4px; margin-right:4px; margin-top: 2px;">`;
      }
    },
    methods:{
      choice_face(e){
        if(e.target.nodeName=="IMG"){
          var choice=e.target;
          //深度复制，复制节点下面所有的子节点 ，直接将整个表情的IMG标签复制，并添加到发布框的<p></p>里面
          var cEle = choice.cloneNode(true);
          $("p#input_conta").append(cEle);
          this.flag = false;
        }
      },
      send(){
        if (this.$store.state.userId) {
          var text=$("#input_conta").html();  //获得发布框的文本内容，表情会以整个img标签文本显示
          console.log('text：'+text)
          if(text!="") {
            $("#input_conta").html("");  //清除发布框的文本内容
            $("div#face").hide();      //隐藏表情选择// 上传图片并发送给后台
            // $.ajax({
            //   url: `${axios.defaults.baseURL}/postcards/addcomment`,
            //   type: "post",
            //   data: {
            //     'commentUserId':this.userId,
            //     'commentCardId':this.$route.params.cardId,
            //     'commentContent':text,
            //   },
            //   success: function (data){
            //     console.info(data);
            //   }
            // });
            this.$ajax({
              method: "post",
              url: `${axios.defaults.baseURL}/postcards/addcomment`,
              data: {
                'commentUserId': this.userId,
                'commentCardId': this.$route.params.cardId,
                'commentContent': text,
              }
            }).then((res) => {
              this.$ajax({
                method: 'get',
                url: `${axios.defaults.baseURL}/postcards/` + this.$route.params.cardId
              }).then((res) => {
                console.log("id:" + res.data.data.cardComment[0].commentUserId)
                this.$emit('all-comment', res.data.data.cardComment)
              })
            })
          }else{
            alert("内容不能为空！")
          }
        } else {
          alert("请先登录！");
        }
      }
    },
    computed: mapGetters([
      "isLogin",
      "userId"
    ]),

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .make_face {
    margin-left: 25px;

  }

  .text {
    color: #5e5e5e;
  }
  .commentTitle {
    margin-left: 25px;
    margin-right: 20px;
    margin-top: 25px;
    font-size: 20px;
    font-weight: bold;
  }

  .publish_container{
    border:1px solid #ccc;
    /*padding:0;*/
    margin-left: 20px;
    margin-right: 20px;
  }
  #input_conta{
    margin:0;
    font-size:16px;
    min-height: 150px;
    text-align:left;
  }
  .eoimPic{
    cursor: pointer;
  }
  #face{
    position: absolute;
    z-index: 999;
    overflow: hidden;
    padding-top: 5px;
    cursor: pointer;
  }

  .btn{
    float: right;
    margin-right: 25px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 4px;
    color: #EEEEEE;
    background-color: #91bfbf;
  }
  .make_face>img,.btn{
    margin-top: 15px;

  }
</style>
