<script setup>
import { getQuestion } from '@/store/Questions';
import axios from 'axios';
import { watch } from 'vue';
let question = getQuestion()
let questionList = question.questionList
watch(question,()=>{
    questionList = question.questionList
})

function submit(){
    axios.post('http://localhost:8003/submit',{
        data:questionList
    }).then(()=>{
        console.log("发送成功")
    })

}

</script>

<template>
    <div class="qList">
        <div class="qListTitle">
            答题卡
        </div>
        <div v-for="item,index in questionList" class="qListItem" @click="question.redirectTo(index)" :class="item.isSelected?'qSelected':''">
            <span>{{ index+1 }}</span>
        </div>
    </div>
    <div class="qListBtn">
        <div>
            <button @click="question.lastQuestion">上一题</button>
            <button @click="question.nextQuestion">下一题</button>
        </div>
        <button @click="submit">交卷</button>
    </div>
</template>

<style scoped>
.qList{
    width: 90%;
    height: 60%;
    margin:0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.qListTitle{
    width: 100%;
    color: orange;
    font-size: 24px;
}
.qListItem{
    width: 50px;
    height: 50px;
    margin:0px 5px;
    border: 2px solid skyblue;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color:skyblue;
    font-size: 18px;
    cursor: pointer;
}
@media(max-width:1268px){
    .qListItem{
        width: 30px;
        height: 30px;
    }
}
.qSelected{
    color: whitesmoke;
    border-color: bisque;
}
.qListBtn{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.qListBtn>div{
    width: 60%;
    display: flex;
    justify-content: space-between;
}
.qListBtn>div>button{
    background-color: skyblue;
    border-radius: 2px;
    width: 45%;
    border:none;
    cursor: pointer;
    height: 30px;
    color:white;
    margin-bottom: 10px;
}
.qListBtn>button{
    background-color: skyblue;
    width: 60%;
    height: 40px;
    margin: 5px 0;
    border-radius: 2px;
    border:none;
    cursor: pointer;
    color:white;
}
</style>