import { defineStore } from "pinia";
import axios from "axios";

export const getMistake = defineStore('mistake',{
    state(){
        return {
            mistakeList:[]
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