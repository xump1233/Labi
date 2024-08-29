<script setup>

import { ref,watch} from 'vue';
import { getQuestion } from '@/store/Questions';

let question = getQuestion()

let questionList = ref(question.questionList)
let target = ref(question.target)
watch(question,()=>{
    questionList.value = question.questionList
    target.value = question.target
})

function choiseItem(value){
    question.selectItem(target.value,value)
    setTimeout(() => {
        question.nextQuestion()
    }, 300);
}

</script>

<template>
    <div class="leftBox">
        <div class="qTitle">
            <span>{{ target + 1 + '.' }}</span>{{ questionList[target].title }}
        </div>
        <div class="qSelect" @click="">
            <div class="qSelectItem" @click="choiseItem('A')" :class=" questionList[target].isSelected=='A'?'item_selected':''">
                <div>A</div>
                <div>{{ questionList[target].A }}</div>
            </div>
            <div class="qSelectItem" @click="choiseItem('B')" :class=" questionList[target].isSelected=='B'?'item_selected':''">
                <div>B</div>
                <div>{{ questionList[target].B }}</div>
            </div>
            <div class="qSelectItem" @click="choiseItem('C')" :class=" questionList[target].isSelected=='C'?'item_selected':''">
                <div>C</div>
                <div>{{ questionList[target].C }}</div>
            </div>
            <div class="qSelectItem" @click="choiseItem('D')" :class=" questionList[target].isSelected=='D'?'item_selected':''">
                <div>D</div>
                <div>{{ questionList[target].D }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.leftBox {
    width: 75%;
    height: 95%;
    background-color: rgba(250, 128, 114,0.8);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.qTitle,
.qSelect {
    width: 90%;
    height: auto;
    margin-top: 2%;
    font-size: 18px;
    position: relative;
}

.qTitle {
    white-space: pre-wrap;
}

.qTitle>span {
    position: absolute;
    left: -5%;
    top: 0;
    font-weight: bold;
    width: 3%;
}

.qSelectItem {
    display: flex;
    margin: 2% 0;
    position: relative;
    cursor: pointer;
}
.qSelectItem>div:first-child{
    position: absolute;
    /* transform: translateY(-50%); */
    width: 35px;
    height: 35px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid skyblue;
    border-radius: 50%;
}
.qSelectItem>div:last-child {
    flex-grow: 1;
    min-height: 35px;           
    margin-left: 50px;
    display: flex;
    align-items: center;
}

.item_selected {

}
.item_selected>div:first-child{
    background-color: skyblue;
    color: burlywood;
}

</style>