<script setup>
import { ref,watchEffect,defineProps} from 'vue';
import { useContextMenu } from '../hooks/useContextMenu';


const box = ref(null);
const menu = ref(null);
const info = useContextMenu(box);
const porps = defineProps(['list']);
let list = porps.list;
if(!list){
    list = [{
        label:'你还没指定菜单内容哦'
    }]
}


watchEffect(()=>{
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const isShow = info.isVisible.value?'block':'none';
    let x,y;
    if(menu.value){
        menu.value.style.display = isShow;
        let h = menu.value.clientHeight;
        let w = menu.value.clientWidth;
        if(info.x.value+w>=viewportWidth){
            x = info.x.value-w;
        }
        else{
            x = info.x.value
        }
        if(info.y.value+h>=viewportHeight){
            y = info.y.value-h;
        }
        else{
            y = info.y.value
        }
        menu.value.style.left = x + 'px';
        menu.value.style.top = y + 'px';
    }
    

})

</script>

<template>
    <div class="container" ref="box">
        <slot></slot>
        <Teleport to="body">
            <div class="context-menu" ref="menu" v-if="info.isVisible">
                <div class="context-menu-item" v-for="item of list" @click="$attrs.onSelect(item)">{{ item.label }}</div>
            </div>
        </Teleport>
    </div>
</template>

<style scoped>
.container{
    width: auto;
    height: auto;
}
.context-menu{
    position: fixed;
    background-color: #bff;
    padding: 10px;
    min-width: 100px;
    width: auto;
    border-radius: 5px;
}
.context-menu .context-menu-item{
    padding:5px 3px;
    padding-right: 20px;
    border-radius: 5px;
    cursor: pointer;
    width: auto;
    font-size: 16px;
    white-space: nowrap;
}
.context-menu .context-menu-item:hover{
    background-color: #f99;
}
</style>