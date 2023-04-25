<template>
    <h1>404 Not Found</h1>
</template>

<script>
import router from '../router/index.js'
import {onMounted} from 'vue'

onMounted(setTimeout(()=>{
        router.push({path:'/'})
    },1000))
</script>
