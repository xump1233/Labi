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

</script>

<template>
    <div class="leftBox">
        <div class="qTitle">
            <span>{{ target + 1 + '.' }}</span>{{ questionList[target].title }}
        </div>
        <div class="qSelect" @click="question.nextQuestion()">
            <div class="qSelectItem">
                <div>A</div>
                <div>{{ questionList[target].A }}</div>
            </div>
            <div class="qSelectItem">
                <div>B</div>
                <div>{{ questionList[target].B }}</div>
            </div>
            <div class="qSelectItem">
                <div>C</div>
                <div>{{ questionList[target].C }}</div>
            </div>
            <div class="qSelectItem">
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
    background-color: salmon;
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
</style>