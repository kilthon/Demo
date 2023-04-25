<template>
    <h1>{{ $t('content',{route:locate}) }}</h1>
</template>

<script setup>
import {ref,watch} from 'vue'
import {useRouter} from 'vue-router'
const router=useRouter()
const locate=ref('AdminHome')

watch(
    ()=>router.currentRoute.value,
    ()=>locate.value=router.currentRoute.value.fullPath==='/'?'AdminHome':router.currentRoute.value.fullPath.slice(1),
    {immediate:true,deep:true}
)
</script>