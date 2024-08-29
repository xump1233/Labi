<script setup>
import { watch,onMounted,onBeforeUnmount,nextTick } from 'vue'
import { getHistory } from '@/store/history_list';
import { ref } from 'vue';
import useDebounce from '@/utils/useDebounce';


let history = getHistory()
let historyList = ref(history.historyList)
history.getHistoryList().then(value=>{
    history.historyList = value
})
watch(history,()=>{
    historyList.value = history.historyList;
    nextTick(()=>{
        if(hlist.value){
            for(let i =0;i<hlist.value.children.length;i++){
                const obj = {
                    title:i+1+'. '+historyList.value[i].title.substring(0,10)+'...',
                    offset:hlist.value.children[i].offsetTop-90
                }
                offsetInfo.value.push(obj);
            }
            // console.log(offsetInfo.value)
        }
    })
    
})

const duration = ref('')
const type = ref('')
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

const hlist = ref();
const offsetInfo = ref([]);
const showItem = ref(0);

function moveTo(value){
    hlist.value.scrollTo({
        top:value,
        behavior:"smooth"
    })
}
function judgeInView(e){
    for(let i=0;i<offsetInfo.value.length;i++){
        if(offsetInfo.value[i].offset>=e.target.scrollTop){
            showItem.value = i;
            break;
        }
    }
}
const deJudgeInView = useDebounce(judgeInView);

onMounted(()=>{
    hlist.value.addEventListener('scroll',deJudgeInView);
    
})
onBeforeUnmount(()=>{
    hlist.value.removeEventListener('scroll',deJudgeInView);
})
</script>

<template>
    <div class="history_search">
        <div class="history_search_item">
            <div>筛选</div>
        </div>
        <div class="history_search_item">
            <div>范围（做题时间）：</div>
            <div>
                <el-date-picker
                    v-model="duration"
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
        <div class="history_search_item">
            <div>题型：</div>
            <div>
                <el-select
                    v-model="type"
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
    <div class="history_nav">
        <div
        v-for="item,index of offsetInfo"
        :key="index" class="nav_item"
        @click="moveTo(item.offset)"
        :style="{color:showItem===index?'#66f':'#fff'}"
        >
            {{ item.title }}
        </div>
    </div>
    <div class="history_list" ref="hlist">
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
                    <!-- <div class="result">
                        <img src="../../assets/images/true.png" alt="" v-if="item.myAnswer === item.answer">
                        <img src="../../assets/images/false.png" alt="" v-else>
                        <div :style="{color:item.myAnswer === item.answer?'#b5ec9c':'chocolate',opacity:0.3}">{{ item.myAnswer === item.answer?'回答正确':'回答错误' }}</div>
                    </div> -->
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
.history_search{
    width: 100%;
    height: 70px;
    background-color: rgb(181, 236, 156);
    position: absolute;
    top:0;
    display: flex;
    z-index: 2;
    align-items: center;
    justify-content: space-around;
    transition: all 0.3s;
}
.history_search_item{
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.history_search_item>div:first-child{
    font-size: 18px;
    font-weight: bold;
    color: #66f;
}
.history_nav{
    position: relative;
    width: 800px;
    color: white;
    height: calc(100% - 120px);
    background-color: #f66;
    margin-left: 20px;
    top: 30px;
    border-radius: 10px;
    overflow: auto;
}
.history_nav .nav_item{
    margin: 5px 4px;
    font-size: 14px;
    cursor: pointer;
}
.history_nav::-webkit-scrollbar{
    background-color: rgba(255, 255, 255,0.1);
    width: 10px;
}
.history_nav::-webkit-scrollbar-thumb {
  border-radius: 10px; /* 圆角 */
  width: 5px;
  background-color: rgba(212, 224, 236,0.5); /* 滑块颜色 */
  background-clip: padding-box; /* 保证滑块边缘不会超出滚动条的宽度 */
  border: 1px solid transparent; /* 可选，增加边框效果 */
}
.history_list{
    height: 100%;
    flex-grow: 1;
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