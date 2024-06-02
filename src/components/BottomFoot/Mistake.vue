<script setup>
import { onMounted,watch,ref } from 'vue';
import {getMistake} from '@/store/mistake_list'
import axios from 'axios';

let mistake = getMistake()

let mistakeList = ref(mistake.mistakeList)

onMounted(()=>{
    mistake.getMistakeList().then(value=>{
        mistake.mistakeList = value
    })
})

watch(mistake,()=>{
    mistakeList.value = mistake.mistakeList
})
function submit_mistake_update(index){
    let target = mistakeList.value.data[index]
    let id = target.id
    let mark = target.mark
    axios.post('http://127.0.0.1:8003/mistake_update',{
        id,
        mark
    }).then((res)=>{
        console.log(res.data)
    })
}


</script>

<template>
    <div class="mistake_list">
        
    </div>
</template>