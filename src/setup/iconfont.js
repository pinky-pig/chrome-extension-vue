import Vue from 'vue'
import { createFromIconfontCN } from '@/vhh/components/icon/Iconfont'

Vue.component('Icon', createFromIconfontCN({
  url: '',
  fontFamily: 'iconfont',
  classPrefix: 'icon-'
}))
