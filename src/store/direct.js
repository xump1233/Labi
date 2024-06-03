import { defineStore } from "pinia";

export const getDirect = defineStore('direct',{
    state(){
        return {
            goal:1
        }
    },
    actions:{
        changeGoal(value){
            this.goal = value
        }
    }
})