import { defineStore } from "pinia";
import axios from "axios";

export const getHistory = defineStore('history',{
    state(){
        return{
            historyList:[
                {
                    "title": "",
                    "type": "",
                    "A": "",
                    "B": "",
                    "C": "",
                    "D": "",
                    "source": "",
                    "answer": "",
                    "analysis": "",
                    "time":'',
                    "myAnswer":'',
                    "isRight":''
                  }
            ]
        }
    },
    actions:{
        getHistoryList(){
            return new Promise((resolve,reject)=>{
                axios.get('http://localhost:8003/history').then(
                    res=>{
                        resolve(res.data)
                    }
                ).catch(
                    err=>{
                        reject(err.message)
                    }
                )
            })
        }
    }
})