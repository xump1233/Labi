<script setup lang="ts">
import LeftContent from './BottomFoot/LeftContent.vue';
import RightContent from './BottomFoot/RightContent.vue';
import History from './BottomFoot/History.vue';
import Mistake from './BottomFoot/Mistake.vue';
import { getDirect } from '@/store/direct';
import { ref,watch } from 'vue';
let direct = getDirect()
let goal = ref(direct.goal)
watch(direct,()=>{
    goal.value = direct.goal
})
</script>

<template>
    <div class="bodyBox">
        <LeftContent v-if="goal === 1"></LeftContent>
        <RightContent v-if="goal === 1"></RightContent>
        <History v-if="goal === 2"></History>
        <Mistake v-if="goal === 3"></Mistake>
    </div>
</template>

<style scoped>
.bodyBox{
    position:relative;
    display: flex;
    width: 75%;
    height: 75%;
    background-color: rgb(255, 255, 255,0.9);
    border-radius: 20px;
    align-items: center;
    justify-content: space-around;
    overflow: hidden;
    
}
</style>