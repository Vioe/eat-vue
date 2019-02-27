<template>
  <div class="content">
    <div class="addRecipe">
      <el-row>
        <el-col :span="8" :push="4">
          <el-form ref="form"
                   :model="form"
                   label-width="80px">
            <el-form-item label="菜谱名称">
                <el-input v-model="dieltTitle" placeholder="文字尽量限制在20字内"></el-input>
            </el-form-item>
            <el-form-item label="菜谱大图">
              <div>
                <label for="recipe">
                  <img class="brower" :src="updatePic" alt="">
                  <i v-if="showUp" class="icon iconfont icon-jia3"></i>
                </label>
              </div>
              <input type="file"
                     id="recipe"
                     ref='recipesPhoto'
                     @change="showBasicPh($event)"
                     accept="image/jpeg,image/jpg,image/png"
                     style="display: none;">
            </el-form-item>
            <el-form-item label="简介">
              <el-input type="textarea"
                        v-model="form.dieltSyon"
                        :autosize="{ minRows: 3, maxRows: 5}"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8" :push="5">
          <!-- 烹饪时间 + 份量 + 食材 -->
          <el-form label-position="top"
                   label-width="80px"
                   ref="recipeNum"
                   :model="form">
            <el-form-item label="烹饪时间(分钟)">
              <el-select v-model="form.dieltTime" placeholder="请选择大致烹饪时间">
                <el-option label="5" value="5"></el-option>
                <el-option label="10" value="10"></el-option>
                <el-option label="15" value="15"></el-option>
                <el-option label="20" value="20"></el-option>
                <el-option label="25" value="25"></el-option>
                <el-option label="30" value="30"></el-option>
                <el-option label="35" value="35"></el-option>
                <el-option label="40" value="40"></el-option>
                <el-option label="45" value="45"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="份量(人份)">
              <el-select v-model="form.dieltWeight" placeholder="请选择大致烹饪时间">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
                <el-option label="6" value="6"></el-option>
                <el-option label="7" value="7"></el-option>
                <el-option label="8+" value="8+"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="食材(名稱15字內，份量10字內，皆為必填!)">
              <div v-for="(obj,key) in form.foodlist">
                <el-row style="margin-bottom: 10px">
                  <el-col :span="8">
                    <el-input
                      placeholder="食材名称"
                      v-model="obj.Name"
                      clearable>
                    </el-input>
                  </el-col>
                  <el-col :span="6" :offset="2">
                    <el-input placeholder="数量"
                              v-model="obj.Num"
                              clearable>
                    </el-input>
                  </el-col>
                  <el-col :span="2"
                          :push="1"
                          @click.native="delFoodList(form.foodlist,key)"
                         >
                    <i class="el-icon-circle-close-outline"
                       style="font-size: 30px;vertical-align: middle;color:red"></i>
                  </el-col>
                </el-row>
              </div>

              <el-row>
                <el-button style="width: 70%; margin-top: 15px"
                           type="success"
                           @click.native="addFoodList(form.foodlist)"
                           round>
                  添加食材
                </el-button>
              </el-row>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :push="4">
          <!-- 步骤图片显示 -->
          <el-form ref="form"
                   :model="form"
                   label-width="80px"
                   label-position="top">
            <el-form-item label="步骤(可以一次上傳多張圖片)">
              <div v-for="(obj,key) in form.steplist" class="stepContent">
                <div style="overflow: hidden; width: 100%">
                  <!-- 图片上传 -->
                  <div class="leftPhoto">
                    <label :for="`step${key}`">
                      <!--<i v-if="showUp" class="icon iconfont icon-jia3" style="font-size: 300px"></i>-->
                      <img src="../../../static/headPic/userHead.jpg" width="300px" alt="" style="margin-left: 12%">
                    </label>
                    <input type="file"
                           :id="`step${key}`"
                           :ref="`step${key}`"
                           @change="showBasicPh('step'+key,key)"
                           accept="image/jpeg,image/jpg,image/png"
                           style="display: none">
                  </div>
                  <!-- 步骤描述 -->
                  <div class="rightDepict">
                    <strong style="font-size: 30px">{{key + 1}}</strong>
                    <div class="depictIco">
                      <el-col :span="2"
                              :push="1"
                              @click.native="delFoodList(form.steplist,key)"
                              >
                        <!--<i class="el-icon-circle-close-outline"
                           v-if="icoChange.stepIco[key]"></i>
                        <i class="el-icon-circle-close"
                           v-else></i>-->
                        <i class="el-icon-circle-close-outline"></i>
                      </el-col>

                      <el-col :span="2"
                              :push="1"
                              @click.native="addFoodList(form.steplist,key)"
                      >
                        <!--<i class="el-icon-circle-plus-outline"
                           v-if="icoChange.stepIco[key*2]"></i>
                        <i class="el-icon-circle-plus"
                           v-else></i>-->
                        <i class="el-icon-circle-plus-outline"></i>
                      </el-col>
                    </div>
                    <el-input class="depict"
                              type="textarea"
                              :autosize="{ minRows: 6, maxRows: 6}"
                              placeholder="请输入内容"
                              @keyup.native="checkInputNum(obj.stepContent,150)"
                              v-model="obj.stepContent">
                    </el-input>
                    <span>剩余{{150-obj.stepContent.length}}个字</span>
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="17">
          <el-button type="primary"
                     class="el-icon-success"
                     @click.native="uploadBtn"
          >上传菜谱
          </el-button>
          <el-button
            type="info"
            plain
            @click.native="cancelBtn">
            取消上传
            <i class="el-icon-delete el-icon--right"></i></el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    export default {
      name: "addRecipe",
      data(){
          return {
            form: {
              dieltSyon: '',
              // 烹饪时间 + 份量 + 食材[]
              dieltTime: '',
              dieltWeight: '',
              foodlist: [
                {
                  Num: '',
                  Name: ''
                }
              ],
              // 步骤图片名 + 步骤内容
              steplist: [
                {
                  stepPHName: '',
                  stepPhoto: '',
                  stepContent: ''
                }
              ],
            },
            updatePic:"",
            show: true,
            showUp: true,
            dieltTitle:"",
            icoChange: {
              foodIco: [
                true
              ],
              stepIco: [
                true, true
              ]
            },
          }
      },
      methods:{
        // 检查输入的文字
        checkInputNum(input, maxLength) {
          if (input.length > maxLength) {
            this.$notify({
              title: '警告',
              message: `您输入的长度超过了${maxLength}个字`,
              type: 'warning'
            });
            input=input.substr(0,maxLength);
          }
        },
        //获取上传的大图
        showBasicPh(e){
          var file=e.target.files[0];
          var reader=new FileReader();
          reader.onload=function(event){
            console.log(event.target.result)
            document.querySelector(".brower").src=event.target.result;
          }
          reader.readAsDataURL(file);
          this.showUp = false;
        },
        // 删除
        delFoodList(formArray, key) {
          if (formArray.length <= 1) {
            this.$message.error('不允许你再删除了!');
            return false;
          }
          formArray.splice(key, 1);
          this.$notify({
            title: '成功',
            message: '删除成功！',
            type: 'success'
          });
        },
        // 增加列表<要增加的表名>
        addFoodList(formName) {
          if (formName === this.form.foodlist) {
            formName.push({
              Num: '',
              Name: ''
            });
            this.icoChange.foodIco.push(true);
          } else {
            formName.push({
              stepPhoto: '',
              stepContent: ''
            });
            this.icoChange.stepIco.push(true, true);
          }
          this.$notify({
            title: '成功',
            message: '增加成功！',
            type: 'success'
          });
        },
      }
    }
</script>

<style scoped lang="scss">
.icon{
  font-size: 64px;
  border: 2px solid #ccc;
}
.recipeContent {
  margin: 40px auto;
}

.leftPhoto {
  float: left;
}

.stepContent {
  margin-bottom: 10px;
}

.rightDepict {
  width: 45%;
  float: left;
  margin-left: 140px;
  position: relative;
}

.rightDepict span {
  color: #aaa;
  font-size: 12px;
}

.depictIco {
  position: absolute;
  right: 0;
  top: 7px;
  font-size: 20px;
}

.depictIco > div {
  margin-left: 25px;
}

.depict {
  margin-top: 15px;
}
</style>
