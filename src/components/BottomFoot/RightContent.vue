<script setup>
import QList from './QList.vue';
</script>

<template>
    <div class="rightBox">
        <QList></QList>
    </div>
</template>

<style scoped>
.rightBox{
    width: 20%;
    height: 95%;
    background-color: rgb(69, 188, 179);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>