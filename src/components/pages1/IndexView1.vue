<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="imge">
            <template>
              <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in imageUrls" :key="item.id">
                  <img :src="item.view" alt="Carousel Image" class="carousel-image" />
                </el-carousel-item>
              </el-carousel>
            </template>
          </div>
        </el-card>
      </el-col>
    </el-row>


    <el-row>
      <el-col :span="12">
        <el-card class="box-card system_bulletin" style="margin-top: 20px">
          <div slot="header" class="rent">
            <span>农业信息公告</span>
          </div>
          <div v-for="item in systemData" :key="item.id" class="system_context item">
            <div>
              {{ item.title }}
            </div>
            <div>
              <i :class="['el-icon-' + item.icon]">{{ item.data }}</i>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card system_bulletin" style="margin-top: 20px; margin-left: 10px;">
          <div slot="header" class="employ">
            <span>农产品收购</span>
          </div>
          <div v-for="item in soldData" :key="item.id" class="system_context item">
            <div>
              {{ item.title }}
            </div>
            <div>
              <i :class="['el-icon-' + item.icon]">{{ item.data }}</i>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-card class="box-card system_bulletin" style="margin-top: 20px">
          <div slot="header" class="rent">
            <span>农具出租</span>
          </div>
          <div v-for="item in sentData" :key="item.id" class="system_context item">
            <div  @click="rent(item.id,item.productName)">
              {{ item.productName }}
            </div>
            <div>
              <i :class="['el-icon-' + item.icon]">{{ item.quantity }}</i>
              <el-form-item>
                <el-button type="primary" @click="rent(item.id)">搜索</el-button>
              </el-form-item>
            </div>

          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card system_bulletin" style="margin-top: 20px; margin-left: 10px;">
          <div slot="header" class="employ">
            <span>招工信息</span>
          </div>
          <div v-for="item in employData" :key="item.id" class="system_context item">
            <div @click="employ(item.id,item.recruitmentTitle)">
              {{ item.recruitmentTitle }}
            </div>
            <div>
              <i :class="['el-icon-' + item.icon]">{{ item.recruitmentQuantity }}</i>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>
<script>
export default {
  name: "IndexView",
  created() {
    this.getRentList();
    this.getemployList();
  },

  data() {

    return {
      imageUrls: [
        { id: 0, view: require("@/assets/1.png") },
        { id: 1, view: require("@/assets/2.jpg") },
        { id: 2, view: require("@/assets/3.jpg") }
        // ... 更多图片 URL
      ],

      systemData: [
        {
          id: 1,
          data: "2024-2-8 8:00",
          title: "【公共咨询】种植好小麦的关键原来是它",
          icon: "timer",
        },
        {
          id: 2,
          data: "2024-2-8 8:00",
          title: "【农业政策】国家新出政策:农业以后要...",
          icon: "timer",
        },
        {
          id: 3,
          data: "2024-2-8 8:00",
          title: "【技术指导】种植好小麦的关键原来是它",
          icon: "timer",
        },
        {
          id: 4,
          data: "2024-2-8 8:00",
          title: "【公共咨询】种植好小麦的关键原来是它",
          icon: "timer",
        },
      ],
      soldData: [
        {
          id: 1,
          data: "2024-2-8 8:00",
          title: "【收购小麦】收购详情请点击",
          icon: "timer",
        },
        {
          id: 2,
          data: "2024-2-8 8:00",
          title: "【收购小麦】收购详情请点击",
          icon: "timer",
        },
        {
          id: 3,
          data: "2024-2-8 8:00",
          title: "【收购小麦】收购详情请点击",
          icon: "timer",
        },
        {
          id: 4,
          data: "2024-2-8 8:00",
          title: "【收购小麦】收购详情请点击",
          icon: "timer",
        },
      ],
      sentData: [
      ],
      employData: [
       
      ],
    };
  },

  methods: {
    async rent(productId,productNamne){  
      alert(productNamne+"_"+productId);
      let user = window.sessionStorage.getItem('user');
      let userObj = JSON.parse(user);
      const { data: aa } = await this.$http.post("/api/product/rentProduct",{userId:userObj.id,productId:productId, productCount:1});
      console.log(aa)
      if(aa.status === 0) {
        this.$message.success("租赁完成，请跳转订单展示");
      } else {
        this.$message.success("租赁完成");
      }
    },
    async employ(id,recruitmentTitle){  
      alert(id+"_"+recruitmentTitle);
      let user = window.sessionStorage.getItem('user');
      let userObj = JSON.parse(user);
      const { data: aa } = await this.$http.post("/api/recruitment/applyRecruitment",{applyUserId:userObj.id,recruitmentInfoId:id});
      console.log(aa)
      if(aa.status === 0) {
        this.$message.success("报名完成，请跳转报名列表");
      } else {
        this.$message.success("报名失败"+aa.message);
      }
    },


    async getemployList() {
      // let user = window.sessionStorage.getItem('user');
      // let userObj = JSON.parse(user);
      const { data: aa } = await this.$http.post("/api/recruitment/selectAllRecruitmentInfo");   //selectRecruitmentInfoByRecruitmentUserId对不？
      console.log(aa)
      this.employData = aa.data;
    },

    async getRentList() {
      // let user = window.sessionStorage.getItem('user');
      // let userObj = JSON.parse(user);
      const { data: aa } = await this.$http.post("/api/product/getAllRentProduct");
      console.log(aa)
      this.sentData.push(aa.data[0]);
      this.sentData.push(aa.data[1]);
      this.sentData.push(aa.data[2]);
      this.sentData.push(aa.data[3]);
      // this.sentData = aa.data;
    },
  }

};
</script>
<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  width: 200px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.system_bulletin {
  .system_title {
    font-size: 22px;
    color: #000000;
  }

  .system_context {
    padding-bottom: 10px;
    border-bottom: 1px #f2f2f2 solid;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

}
</style>
