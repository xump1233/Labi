<script setup lang="ts">
import UserPart from './TopHead/UserPart.vue';
</script>


<template>
    <div class="headBox">
        <div>
            蜡笔Mark
        </div>
        <UserPart></UserPart>
    </div>
</template>

<style scoped>
.headBox{
    display: flex;
    justify-content: space-between;
    width: 75%;
    height: 15%;
    background-color: skyblue;
    border-radius: 20px;
}
</style>