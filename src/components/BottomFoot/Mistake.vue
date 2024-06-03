<script setup>
import { onMounted,watch,ref } from 'vue';
import {getMistake} from '@/store/mistake_list'
import axios from 'axios';

let mistake = getMistake()

let mistakeList = ref(mistake.mistakeList)

onMounted(()=>{
    mistake.getMistakeList().then(value=>{
        mistake.mistakeList = value.data
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
    <div class="history_list">
        <div v-for="item in mistakeList" :key="item.id" class="history_item">
            <div class="q_title">
                {{ item.title }}
            </div>
            <div class="options">
                <div><span>A.</span>{{ item.A }}</div>
                <div><span>B.</span>{{ item.B }}</div>
                <div><span>C.</span>{{ item.C }}</div>
                <div><span>D.</span>{{ item.D }}</div>
            </div>
            <div class="answer">
                <div>我的答案：{{ item.myAnswer }}</div>
                <div>正确答案：{{ item.answer }}</div>
                <div>作答时间：{{ item.time }}</div>
            </div>
            <div class="analysis">
                解析：{{ item.analysis }}
            </div>
            <div class="mark">
                标记：<textarea name="" id="" :value="item.mark"></textarea>
            </div>
            <hr>
        </div>
    </div>
</template>

<style scoped>
.history_list{
    height: 100%;
    width: 100%;
    padding-top: 20px;
    overflow-y: scroll;
}
.history_list::-webkit-scrollbar{
    background-color: rgba(255, 255, 255,0.1);
}
.history_list::-webkit-scrollbar-thumb {
  border-radius: 6px; /* 圆角 */
  background-color: #98bee1; /* 滑块颜色 */
  background-clip: padding-box; /* 保证滑块边缘不会超出滚动条的宽度 */
  border: 2px solid transparent; /* 可选，增加边框效果 */
}
.history_item{
    margin:10px 20px 20px 20px;
    /* background-color: #fff; */
    border-radius: 5px;
    padding: 5px;
}
.history_item .q_title,.history_item .options{
    white-space: pre-wrap;
    background-color: rgba(205, 194, 194,0.1);
    border-radius: 5px;
}
.history_item .answer{
    display: flex;
    justify-content: space-around;
    margin: 5px 0;
    background-color: rgba(202, 195, 195, 0.1);
}
.history_item .analysis{
    margin: 5px 0;
    white-space: pre-wrap;
    background-color: rgba(212, 209, 209, 0.1);
}
.history_item .mark textarea{
    width: 100%;
    border:2px #98bee1 solid;
    border-radius: 5px;
    height: 100px;
}
textarea:focus{
    border: 2px salmon solid !important;
}
textarea:focus-visible{
    border: 2px salmon solid;
}
.time_reset{
    transform: translateX(-39%);
}
</style>