<script setup lang="ts">
import LeftContent from './BottomFoot/LeftContent.vue';
import RightContent from './BottomFoot/RightContent.vue';
</script>

<template>
    <div class="bodyBox">
        <LeftContent></LeftContent>
        <RightContent></RightContent>
    </div>
</template>

<style scoped>
.bodyBox{
    display: flex;
    width: 75%;
    height: 75%;
    background-color: seagreen;
    border-radius: 20px;
    align-items: center;
    justify-content: space-around;
    
}
</style>