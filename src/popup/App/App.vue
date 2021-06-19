<template>
  <div :class="$style.main" >
    <div style="width:300px;height:500px;overflow:hidden">
      <!-- 标题 -->
      <div class="clearfix flex flex-row p-5">
          <div class=" w-7 h-7 rounded-full flex-0 flex flex-row items-center cursor-pointer hover:bg-gray-100">
            <v-icon name="bars" class=" text-gray-400 mx-auto"></v-icon>
          </div>
          <div class=" text-primary text-xl flex-1">
            <span class=" ml-3 -mt-4">Today</span>
          </div>
          <div class=" w-7 h-7 rounded-full flex-0 flex flex-row items-center  cursor-pointer">
            <el-dropdown size="medium" trigger="click">
              <span class="el-dropdown-link">
                <v-icon name="ellipsis-h" class=" text-gray-400 mx-auto hover:text-gray-300"></v-icon>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
                <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
      </div>

      <div class=" px-6 my-4 relative">
        <input v-model="addValue" placeholder="添加一个任务到Today" @keyup.enter="handleAdd" class=" pl-3 bg-gray-100 rounded-lg w-full h-10 border border-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent">

        <div class=" absolute flex flex-row justify-between text-gray-400" style="right:30px;top:12px;width:40px">
          <v-icon class="cursor-pointer hover:text-gray-500" name='calendar-alt'></v-icon>
          <div class=" bg-gray-400" style="width:1px;"></div>
          <v-icon class="cursor-pointer hover:text-gray-500" name='caret-down' ></v-icon>
        </div>

      </div>

      <!-- 内容 -->
      <Content ref="content"></Content>


    </div>
  </div>
</template>

<script>
import Content from '@/popup/App/Content'
export default {
  name: "app",
  components:{
    Content
  },
  data() {
    return {
      addValue:''
    };
  },
  mounted() {

  },
  methods: {
    handleAdd(){
      if (this.addValue != '') {
        this.$refs.content.addtodo(this.addValue,'','')
      }
    }
  },
};
</script>

<style lang='postcss' module>
.main{
  :global {
    .el-card__body{
      padding-top: 10px !important;
    }
    /* .el-card__header {
      border-bottom:0px;
    } */
  }

}
</style>
