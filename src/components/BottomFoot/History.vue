<script setup>
import { watch,onMounted } from 'vue'
import { getHistory } from '@/store/history_list';
import { ref } from 'vue';

let history = getHistory()

let historyList = ref(history.historyList)

onMounted(()=>{
    history.getHistoryList().then(value=>{
        history.historyList = value
    })
})

watch(history,()=>{
    historyList.value = history.historyList
})


</script>

<template>
    <div class="history_nav">
        <div>
            筛选
        </div>
        <div>
            范围
        </div>
        <div>
            题型
        </div>
    </div>
    <div class="history_list">
        <div v-for="item,index in historyList" :key="index" class="history_item">
            <div class="q_title">
                {{ index+1+"."+item.title }}
            </div>
            <div class="options">
                <div>{{ item.A }}</div>
                <div>{{ item.B }}</div>
                <div>{{ item.C }}</div>
                <div>{{ item.D }}</div>
            </div>
            <div>
                <div>我的答案：{{ item.myAnswer }}</div>
                <div>正确答案：{{ item.answer }}</div>
                <div>作答时间：{{ item.time }}</div>
            </div>
            <div>
                解析：{{ item.analysis }}
            </div>
        </div>
    </div>
</template>


<style scoped>
.history_nav{
    width: 100%;
    height: 70px;
    background-color: gainsboro;
    position: absolute;
    top:0;
    display: flex;
    z-index: 2;
}
.history_list{
    height: 100%;
    width: 100%;
    padding-top: 100px;
    overflow-y: scroll;
}

.history_item{
    margin:10px 20px 20px 20px;
}

.q_title{
    white-space: pre-wrap;
}
</style>