<script setup>
import { onMounted,onBeforeUnmount,watch,ref } from 'vue';
import {getMistake} from '@/store/mistake_list'
import axios from 'axios';
import ContextMenu from '@/components/ContextMenu.vue';

let mistake = getMistake()

let mistakeList = ref(mistake.mistakeList)
mistake.getMistakeList().then(value=>{
    mistake.mistakeList = value.data
})
watch(mistake,()=>{
    mistakeList.value = mistake.mistakeList
})

const handlerInfo = {
    index:'',
    begin:'',
    end:'',
    color:'',
    tag:'',
    content:''
};

function handlerText(e){
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
        let node = selection.anchorNode;
        while(!node.dataset){
            node = node.parentNode;
        }
        handlerInfo.tag = node.dataset.tag;
        node = node.parentNode;
        while(!node.dataset || !node.dataset.marked){
            node = node.parentNode;
        }
        handlerInfo.index = node.dataset.marked;
        handlerInfo.begin = selection.anchorOffset;
        handlerInfo.end = selection.extentOffset;
        handlerInfo.content = selection.toString();
    }
    else{
        return;
    }
    
}

onMounted(()=>{
    window.addEventListener('mouseup',handlerText)
})

onBeforeUnmount(()=>{
    window.removeEventListener('mouseup',handlerText)
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

const colorList = [{
    label:'红色标记',
    color:'red'
},
{
    label:'绿色标记',
    color:'green'
},
{
    label:'黄色标记',
    color:'yellow'
},
{
    label:'黑色标记',
    color:'black'
}]

function selectColor(value){
    handlerInfo.color = value.color;
    let s = mistakeList.value[handlerInfo.index][handlerInfo.tag];
    s = s.slice(0,handlerInfo.begin) + `<span style="background-color:${handlerInfo.color};">` + handlerInfo.content + '</span>' + s.slice(handlerInfo.end);
    mistakeList.value[handlerInfo.index][handlerInfo.tag] = s;
}

</script>

<template>
    <div class="history_list">
        <div v-for="item,index in mistakeList" :key="item.id" class="history_item" :data-marked="index">
            <ContextMenu :list="colorList" @select="selectColor">
                <div class="q_title" v-html="item.title" data-tag="title">
                    
                </div>
                <div class="options">
                    <div>
                        <span>A.</span>
                        <span v-html="item.A" data-tag="A"></span>
                    </div>
                    <div>
                        <span>B.</span>
                        <span v-html="item.B" data-tag="B"></span>
                    </div>
                    <div>
                        <span>C.</span>
                        <span v-html="item.C" data-tag="C"></span>
                    </div>
                    <div>
                        <span>D.</span>
                        <span v-html="item.D" data-tag="D"></span>
                    </div>
                </div>
                <div class="answer">
                    <div>
                        <span>我的答案：</span>
                        <span v-html="item.myAnswer===''?'未作答':item.myAnswer" data-tag="myAnswer"></span>
                    </div>
                    <div>
                        <span>正确答案：</span>
                        <span v-html="item.answer" data-tag="answer"></span>
                    </div>
                    <div>
                        <span>作答时间：</span>
                        <span v-html="item.time" data-tag="time"></span>
                    </div>
                </div>
                <div class="analysis">
                    <span>解析：</span>
                    <span v-html="item.analysis" data-tag="analysis"></span>
                </div>
                <div class="mark">
                    <span>备注：</span>
                    <textarea name="" id="" :value="item.mark"></textarea>
                </div>
                <hr>
            </ContextMenu>
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