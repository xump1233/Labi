import { defineStore } from "pinia";
import axios from "axios";

export const getQuestion = defineStore('questions',{
    state(){
        return{
            isSuccess:false,
            target:0,
            questionList:[
                {
                  "id": '',
                  "title": "",
                  "type": "",
                  "A": "",
                  "B": "",
                  "C": "",
                  "D": "",
                  "source": "",
                  "answer": "",
                  "analysis": "",
                },]
        }
    },
    actions:{
        getQuestionList(){
            return new Promise((resolve,reject)=>{
                axios.get('http://localhost:8003/everyday').then(
                    res=>{
                        resolve(res.data)
                    }
                ).catch(
                    err=>{
                        reject(err.message)
                    }
                )
                })
        },
        nextQuestion() {
            if (this.target === this.questionList.length - 1) {
                return
            }
            this.target += 1
        },
        lastQuestion(){
            if(this.target<=0){
                return 
            }
            this.target--
        },
        redirectTo(value){
            this.target = value
        },
        selectItem(value,index){
            this.questionList[value].isSelected = index
        }
    }
})