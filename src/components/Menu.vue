<template>
    <a-menu
      style="width: 256px"
      mode="inline"
      @click="handleClick"
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
    >
      <template v-for="item in menuList">
          <a-sub-menu  v-if="item.children" :key="'sub'+item.path">
              <template #title>{{ $t('menuName',{user:curUser,id:item.id+1}) }}</template>
              <a-menu-item-group>
                  <a-menu-item v-for="i in item.children" :key="item.path+i.path">{{ $t('menuName',{user:curUser,id:i.id}) }}</a-menu-item>
              </a-menu-item-group>
          </a-sub-menu>
          <a-menu-item v-else :key="item.path">{{ $t('menuName',{user:curUser,id:item.id+1}) }}</a-menu-item>
      </template>
    </a-menu>
</template>

<script setup>
import {ref,watch} from 'vue'
import router from '../router'
import { useStore } from 'vuex'

const store=useStore()

const menuList=ref([])
const curUser=ref('')
const selectedKeys=ref([])
const openKeys=ref([])

watch(
    ()=>router.currentRoute.value,
    ()=>selectedKeys.value=[router.currentRoute.value.fullPath],
    {immediate:true,deep:true}
)

const handleClick=function(item){
  router.push(item.key)
}

const openSubMenu=()=>{
    let curRoute=router.currentRoute.value.fullPath
    let str=curRoute.slice(0,curRoute.indexOf('/',curRoute.indexOf('/')+1))
    openKeys.value=['sub'+str]
}

const created=()=>{
  menuList.value=store.getters.menu
  curUser.value=store.getters.userInfo.userName
  openSubMenu()
}

created()
</script>