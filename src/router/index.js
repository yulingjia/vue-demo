import Vue from 'vue'
import Router from 'vue-router'

// 首页
import Home from '@/components/Home'
import Login from '@/components/Login'

// 消息模块
import MessageSystem from '@/components/modules/message/MessageSystem'
import MessageMine from '@/components/modules/message/MessageMine'

// 系统模块
import SystemPermission from '@/components/modules/system/SystemPermission'
import SystemRole from '@/components/modules/system/SystemRole'
import SystemUser from '@/components/modules/system/SystemUser'
import SystemMenu from '@/components/modules/system/SystemMenu'
import SystemDictionary from '@/components/modules/system/SystemDictionary'
import SystemParameter from '@/components/modules/system/SystemParameter'

// 基础信息管理模块
import InformationCompany from '@/components/modules/information/InformationCompany'
import InformationCar from '@/components/modules/information/InformationCar'
import InformationPersonnel from '@/components/modules/information/InformationPersonnel'
import InformationAddress from '@/components/modules/information/InformationAddress'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/home',
      name: '首页',
      component: Home
    },
    {
      path: '/message/system',
      name: '系统消息',
      component: MessageSystem
    },
    {
      path: '/message/mine',
      name: '我的消息',
      component: MessageMine
    },
    {
      path: '/system/permission',
      name: '权限管理',
      component: SystemPermission
    },
    {
      path: '/system/role',
      name: '角色管理',
      component: SystemRole
    },
    {
      path: '/system/user',
      name: '用户管理',
      component: SystemUser
    },
    {
      path: '/system/menu',
      name: '菜单管理',
      component: SystemMenu
    },
    {
      path: '/system/dictionary',
      name: '字典管理',
      component: SystemDictionary
    },
    {
      path: '/system/parameter',
      name: '参数管理',
      component: SystemParameter
    },

    {
      path: '/information/company',
      name: '公司信息管理',
      component: InformationCompany
    },
    {
      path: '/information/car',
      name: '车辆信息管理',
      component: InformationCar
    },
    {
      path: '/information/personnel',
      name: '人员信息管理',
      component: InformationPersonnel
    },
    {
      path: '/information/address',
      name: '常用地址信息管理',
      component: InformationAddress
    }
  ]
})

export default router
