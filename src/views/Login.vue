<template>
    <a-select v-model:value="user" style="width:120px" @change="handleChange">
    <a-select-option value="0">admin</a-select-option>
    <a-select-option value="1">user1</a-select-option>
    <a-select-option value="2">user2</a-select-option>
  </a-select>
  <a-button @click="handleLogin">登录</a-button>
</template>

<script setup>
import {ref} from 'vue'
import {useStore} from 'vuex'

const store=useStore()
const user=ref('admin')
const role=ref(0)

const handleChange=function(val){
    role.value=val
}

const handleLogin=function(){
    store.dispatch('userChange',role.value)
}

</script>
