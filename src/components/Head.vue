<script setup lang="ts">

</script>


<template>
    <div class="headBox">
        <div class="header_title">
            <img src="../assets/images/big_logo.png" alt="">蜡笔Mark
        </div>
        <div class="header_content">
            <div>...占位信息。。。</div>
            <div class="header_nav">
                <router-link to="/" class="header_nav_item" active-class="active">Everyday</router-link>
                <router-link to="/history" class="header_nav_item" active-class="active">历史记录</router-link>
                <router-link to="/mistake" class="header_nav_item" active-class="active">我的错题</router-link>
            </div>
        </div>
        <!-- <UserPart></UserPart> -->
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
    margin:30px 0px 20px 0px;
}
.header_title{
    width: 30%;
    font-size: 36px;
    color:rgba(255, 255, 255,1);
    text-shadow: 
        -1px -1px 0 #000,
         1px -1px 0 #000,
        -1px  1px 0 #000, 
         1px  1px 0 #000,
         2px  2px 0px #f66; 
    display: flex;
    align-items: center;
    padding-left:10px ;
}
.header_content{
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.header_nav{
    width: 100%;
    height: 45%;
    display: flex;
    justify-content: space-between;
}
.header_nav_item{
    font-size: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    font-weight: bold;
    transition: all 0.2s;
}
.active{
    color:#f66;
    font-size: 24px
}
</style>