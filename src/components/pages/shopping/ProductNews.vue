<template>
  <div>
    <h3 style="margin-top: 0">商品信息</h3>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品采购</el-breadcrumb-item>
      <el-breadcrumb-item>商品信息</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row>
      <el-col
        v-for="(product, index) in products"
        :key="product.name"
        :span="6"
        :offset="index > 0 ? 1 : 0"
      
      >
        <el-card :body-style="{ padding: '0px' }">
          <img :src="product.imageUrl" class="image" alt="Product Image" />
          <div style="padding: 15px">
            <span>{{ product.name }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ product.date }}</time>
              <el-button type="text" class="button">下单</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
  },
  data() {
    return {
      products: [
        {
          imageUrl: "https://image.baidu.com/search/down?tn=download&ipn=dwnl&word=download&ie=utf8&fr=result&url=https%3A%2F%2Fimage.cnhnb.com%2Fimage%2Fpng%2Fminiapp%2F2020%2F06%2F22%2Ff712988927dd4201a12e291ba1185fcf.png&thumburl=https%3A%2F%2Fimg2.baidu.com%2Fit%2Fu%3D271744238%2C3812312836%26fm%3D253%26fmt%3Dauto%26app%3D138%26f%3DJPEG%3Fw%3D570%26h%3D380",
          name: "农药",
          date: "2023-04-01",
          // 你可以添加更多属性，如价格、描述等
        },
        {
          imageUrl: "https://image.baidu.com/search/down?tn=download&ipn=dwnl&word=download&ie=utf8&fr=result&url=https%3A%2F%2Fimage.cnhnb.com%2Fimage%2Fpng%2Fminiapp%2F2020%2F06%2F22%2Ff712988927dd4201a12e291ba1185fcf.png&thumburl=https%3A%2F%2Fimg2.baidu.com%2Fit%2Fu%3D271744238%2C3812312836%26fm%3D253%26fmt%3Dauto%26app%3D138%26f%3DJPEG%3Fw%3D570%26h%3D380",
          name: "农药",
          date: "2023-04-02",
          // ...
        },
        {
          imageUrl: "https://image.baidu.com/search/down?tn=download&ipn=dwnl&word=download&ie=utf8&fr=result&url=https%3A%2F%2Fimage.cnhnb.com%2Fimage%2Fpng%2Fminiapp%2F2020%2F06%2F22%2Ff712988927dd4201a12e291ba1185fcf.png&thumburl=https%3A%2F%2Fimg2.baidu.com%2Fit%2Fu%3D271744238%2C3812312836%26fm%3D253%26fmt%3Dauto%26app%3D138%26f%3DJPEG%3Fw%3D570%26h%3D380",
          name: "农药",
          date: "2023-04-02",
          // ...
        },
       
        // 更多商品信息
      ],
      currentDate: new Date().toLocaleDateString(), // 假设你想展示当前日期
    };
  },
};
</script>
<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 17px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

</style>
