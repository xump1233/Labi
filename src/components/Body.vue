<script setup lang="ts">

</script>

<template>
    <div class="bodyBox">
        <router-view></router-view>
    </div>
</template>

<style scoped>
.bodyBox{
    position:relative;
    display: flex;
    flex-direction: row;
    width: 75%;
    height: 75%;
    background-color: rgb(255, 255, 255,0.9);
    border-radius: 20px;
    align-items: center;
    justify-content: space-around;
    overflow: hidden;
    
}
</style>