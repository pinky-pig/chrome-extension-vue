import Vue from "vue";
import AppComponent from "./App/App.vue";
Vue.component("app-component", AppComponent);
// 引入默认样式
import '@/style/index.css'
import '@/setup'

// 引入iconfont
import '@/assets/icon/iconfont'

import {
  Card,
  Button
} from 'element-ui';

Vue.use(Card);
Vue.use(Button);

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
