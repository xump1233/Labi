<script setup>
import Head from './components/Head.vue';
import Body from './components/Body.vue';
import { getQuestion } from './store/Questions';

const question = getQuestion()

question.getQuestionList().then(value=>{
  question.questionList.shift()
  question.questionList = value
  question.questionList.forEach(item=>{
    item.isSelected = ''
  })
  question.isSuccess = true
})

</script>

<template>
    <Head></Head>
    <Body></Body>
</template>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
}
#app{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9efef;
}

/* .appBox{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  margin: 1px;
  box-sizing: border-box; */
  /* background: linear-gradient(to right, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%), url('./assets/images/bg.jpg');
  background-size: cover;
  background-repeat: no-repeat; */
  /* background-color: #f9efef;
} */
</style>
