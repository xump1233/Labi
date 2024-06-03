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

let h_nav = ref()
let lastPosition = 0;

function getHnav(e){
    if(e.target.scrollTop>lastPosition){
        h_nav.value.style.height = '0'
        h_nav.value.style.display = 'none'
    }
    else{
        h_nav.value.style.height = '80px'
        h_nav.value.style.display = 'flex'
    }
    lastPosition = e.target.scrollTop
}

const value2 = ref('')
const value = ref('')
const options = [
  {
    value: '常识判断',
    label: '常识判断',
  },{
    value: '言语理解与表达',
    label: '言语理解与表达',
  },{
    value: '数量关系',
    label: '数量关系',
  },{
    value: '判断推理',
    label: '判断推理',
  },{
    value: '资料分析',
    label: '资料分析',
  }
]
</script>

<template>
    <div class="history_nav" ref="h_nav">
        <div class="history_nav_item">
            <div>筛选</div>
        </div>
        <div class="history_nav_item">
            <div>范围（做题时间）：</div>
            <div>
                <el-date-picker
                    v-model="value2"
                    type="datetimerange"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    format="YYYY-MM-DD HH:mm:ss"
                    date-format="YYYY/MM/DD ddd"
                    time-format="A hh:mm:ss"
                    class="time_reset"
                />
            </div>
        </div>
        <div class="history_nav_item">
            <div>题型：</div>
            <div>
                <el-select
                    v-model="value"
                    clearable
                    placeholder="选择题型"
                    style="width: 240px"
                >
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
                
            </div>
        </div>
    </div>
    <div class="history_list" @scroll="getHnav($event)">
        <div v-for="item,index in historyList" :key="index" class="history_item">
            <div class="q_title" :style="{backgroundColor:item.myAnswer === item.answer?'rgba(181, 236, 156,0.1)':'rgba(210, 105, 30,0.1)'}">
                {{ index+1+"."+item.title }}
            </div>
            <div class="options" :style="{backgroundColor:item.myAnswer === item.answer?'rgba(181, 236, 156,0.1)':'rgba(210, 105, 30,0.1)'}">
                <div><span>A.</span>{{ item.A }}</div>
                <div><span>B.</span>{{ item.B }}</div>
                <div><span>C.</span>{{ item.C }}</div>
                <div><span>D.</span>{{ item.D }}</div>
            </div>
            <div class="answer" :style="{backgroundColor:item.myAnswer === item.answer?'rgba(181, 236, 156,0.1)':'rgba(210, 105, 30,0.1)'}">
                <div>我的答案：{{ item.myAnswer }}</div>
                <div>正确答案：{{ item.answer }}</div>
                <div>
                    作答时间：{{ item.time }}
                    <div class="result">
                        <img src="../../assets/images/true.png" alt="" v-if="item.myAnswer === item.answer">
                        <img src="../../assets/images/false.png" alt="" v-else>
                        <div :style="{color:item.myAnswer === item.answer?'#b5ec9c':'chocolate'}">{{ item.myAnswer === item.answer?'回答正确':'回答错误' }}</div>
                    </div>
                </div>
                
            </div>
            <div class="analysis" :style="{backgroundColor:item.myAnswer === item.answer?'rgba(181, 236, 156,0.1)':'rgba(210, 105, 30,0.1)'}">
                解析：{{ item.analysis }}
            </div>
            <hr>
        </div>
    </div>
</template>


<style scoped>
.history_nav{
    width: 100%;
    height: 80px;
    background-color: rgb(181, 236, 156);
    position: absolute;
    top:0;
    display: flex;
    z-index: 2;
    align-items: center;
    justify-content: space-around;
    transition: all 0.3s;
}
.history_nav_item{
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.history_nav_item>div:first-child{
    font-size: 18px;
    font-weight: bold;
    color: #66f;
}
.history_list{
    height: 100%;
    width: 100%;
    padding-top: 80px;
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
    padding:5px;
}
.history_item .q_title,.history_item .options{
    white-space: pre-wrap;
    border-radius: 5px;
    padding: 10px 5px;
}
.history_item .answer{
    display: flex;
    justify-content: space-around;
    position: relative;
    padding: 10px 5px;
    border-bottom: 1px #98bee1 solid;
    border-top: 1px #98bee1 solid;
}
.history_item .answer .result{
    position: absolute;
    font-size: 24px;
    font-weight: bold;
    display: flex;
    align-items: center;
    top:-150%;
    right: 10%;
}
.history_item .answer .result>img{
    width: 36px;
}
.history_item .answer .result>div{
    margin-left: 20px;
}
.history_item .analysis{
    white-space: pre-wrap;
    padding: 10px 5px;
}
.time_reset{
    transform: translateX(-39%);
}
</style>