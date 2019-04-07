<template>
    <div class="addActivity">
      <el-row>
        <el-col :span="8" :push="4">
          <el-form ref="form"
                   :model="form"
                   label-width="80px">
            <el-form-item label="文章名称">
              <el-input v-model="form.articleTitle" placeholder="文字尽量限制在10字内"></el-input>
            </el-form-item>
            <el-form-item label="文章类型">
              <el-select v-model="form.classify" placeholder="请选择文章类型">
                <el-option label="饮食小常识" value="1"></el-option>
                <el-option label="养身妙方" value="2"></el-option>
                <el-option label="饮食禁忌" value="3"></el-option>
                <el-option label="美容瘦身" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="文章简介">
              <el-input v-model="form.articleBrief" placeholder="文字尽量限制在20字内"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8" :push="5">
          <el-form label-width="80px"
                   ref="recipeNum"
                   :model="form">
            <el-form-item label="文章大图">
              <div>
                <label for="recipe">
                  <img class="brower" :src="updatePic" alt="">
                  <div class="recipeBig flex flex-cen" v-if="showUp">
                    <i class="icon iconfont icon-jia3"></i>
                  </div>
                </label>
              </div>
              <input type="file"
                     id="recipe"
                     ref='recipesPhoto'
                     @change="showBasicPh($event)"
                     accept="image/jpeg,image/jpg,image/png"
                     style="display: none;">
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <div class="articleContent">
          <el-col :span="16" :push="4">
            <el-form label-width="80px"
                     ref="recipeNum"
                     :model="form">
              <el-form-item label="文章简介">
                <el-input type="textarea"
                          v-model="form.articleCtn"
                          :autosize="{ minRows: 3, maxRows: 20}"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </div>

      </el-row>
    </div>
</template>

<script>
    export default {
      name: "addActivity",
      data(){
          return {
            form:{
              articleTitle:"",
              classify:"",
              articleBrief:"",
              articleCtn:""
            },
            articleTitle:"",
            showUp: true,
            updatePic:"",
            articlePic:"",
          }
      },
      methods:{
        showBasicPh(e){
          console.log(e.target.files[0])
          let file = e.target.files[0]
          this.articlePic = file;
          var reader=new FileReader();
          reader.onload=function(event){
            console.log(event.target.result)
            document.querySelector(".brower").src=event.target.result;
          }
          reader.readAsDataURL(file);
          this.showUp = false;
        },
        onSubmit() {
          console.log(this.form);
          let zipFormData = new FormData();
          zipFormData.append('filename', this.articlePic);
          zipFormData.append('myDate', JSON.stringify(this.form));
          this.$ajax.post('/api/article/addArticle',zipFormData).then(res => {
              console.log(res)
          })
        }
      }
    }
</script>

<style scoped lang="scss">
  /deep/ .el-form-item__content{
    line-height: normal;
    font-size:0;
  }
  /deep/ .el-input__inner{
    width: 289.66px;
  }
  /deep/ .el-button--primary{
    background-color: #91bfbf;
  }
  .recipeBig{
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
  }
  .articleContent{
    /deep/ .el-textarea__inner{
      height: 300px !important;
    }
  }
</style>
