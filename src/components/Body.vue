<script setup lang="ts">
// import LeftContent from './BottomFoot/LeftContent.vue';
// import RightContent from './BottomFoot/RightContent.vue';
// import History from './BottomFoot/History.vue';
import Mistake from './BottomFoot/Mistake.vue';
</script>

<template>
    <div class="bodyBox">
        <!-- <LeftContent></LeftContent> -->
        <!-- <RightContent></RightContent> -->
        <!-- <History></History> -->
        <Mistake></Mistake>
    </div>
</template>

<style scoped>
.bodyBox{
    position:relative;
    display: flex;
    width: 75%;
    height: 75%;
    background-color: seagreen;
    border-radius: 20px;
    align-items: center;
    justify-content: space-around;
    overflow: hidden;
    
}
</style>