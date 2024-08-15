<script setup>
import Head from './views/Head.vue';
import { getQuestion } from './store/Questions';
import { onBeforeMount} from 'vue';

const question = getQuestion()


onBeforeMount(()=>{
  question.getQuestionList().then(value=>{
    question.questionList.shift()
    question.questionList = value
    question.questionList.forEach(item=>{
      item.isSelected = ''
    })
    question.isSuccess = true
  })
  
})
</script>

<template>
  <div class="appBox">
    <Head></Head>
    <router-view></router-view>
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
  border-radius: 10px;
  margin: 1px;
  box-sizing: border-box;
  /* background: linear-gradient(to right, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%), url('./assets/images/bg.jpg');
  background-size: cover;
  background-repeat: no-repeat; */
  background-color: #f9efef;
}
</style>
