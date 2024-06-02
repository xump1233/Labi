import { defineStore } from "pinia";
import axios from "axios";

export const getMistake = defineStore('mistake',{
    state(){
        return {
            mistakeList:[{
                "id":'',
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
                "mark":''
            }]
        }
    },
    actions:{
        getMistakeList(){
            return new Promise((resolve,reject)=>{
                axios.get('http://localhost:8003/mistake').then(
                    res=>{
                        resolve(res)
                    }
                )
            })
        }
    }
})