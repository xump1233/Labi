<script setup>
import Head from './components/Head.vue';
import Body from './components/Body.vue';
import { getQuestion } from './store/Questions';
import { onBeforeMount,watch } from 'vue';
const question = getQuestion()

onBeforeMount(()=>{
  question.getQuestionList().then(value=>{
    question.questionList.shift()
    question.questionList = value
    question.questionList.forEach(item=>{
      item.isSelected = false
    })
    question.isSuccess = true
  })
})
</script>

<template>
  <div class="appBox">
    <Head></Head>
    <Body></Body>
  </div>
</template>

<style>
html,body{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app{
  width: 100%;
  height: 100%;
  
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
}
.appBox{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

}
</style>
