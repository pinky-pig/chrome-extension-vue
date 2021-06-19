<template>
  <div style="height:80%">
    <Simplebar class=" px-6">
      <el-card class=" mt-4 mb-4" :class="[$style.todoList]" :style="{height:(fold === false ? '':'60px'),transition:'height 2s'}">
        <div slot="header" class="clearfix flex flex-row justify-between">
            <div class=" text-primary text-base"> Today</div>
            <div class=" cursor-pointer " @click="fold = !fold">
              <v-icon name="angle-up" v-if="fold === false"></v-icon>
              <v-icon name="angle-down" v-else></v-icon>
            </div>
        </div>
          <draggable group="people" @start="drag=true" @end="drag=false">
            <div class=" border-b border-gray-200" v-for="(item,index) in todoList" :key="index">
              {{item.name}}
            </div>
          </draggable>
      </el-card>

      <div class="mb-4">
        <el-card>
          <div>{{ time }}</div>
          <el-button type="text" @click="reset">重置</el-button>
        </el-card>
      </div>

    </Simplebar>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable,
  },
  data() {
    return {
      time: chrome.extension.getBackgroundPage().count ,
      fold:true,

      todoList:[
        {
          name:'zhangsan',
        }
      ]
    }
  },
  mounted() {
    this.timer();
  },
  methods:{
    timer() {
      setInterval(() => {
        ++this.time;
      }, 1000);
    },
    reset(){
      this.time = chrome.extension.getBackgroundPage().count = 0
    },


    // 新增事项
    addtodo(name,time,detail){
      this.todoList.push({'name':name,'time':time,'detail':detail})
    }
  }
}
</script>

<style lang='postcss' module>
.todoList{
  :global {
    .el-card__body{
      padding-top: 10px !important;
    }
    .el-collapse {
      border-top: none !important;
    }
    .el-carousel__container {
      height: 280px !important;
    }
    .el-collapse-item .el-collapse-item__wrap {
      border-bottom: none !important;
    }
    /* .el-card__header {
      border-bottom:0px;
    } */
  }
}
</style>