<script setup>
import { ref,onMounted,onBeforeUnmount,nextTick,watch,watchEffect } from 'vue';
const fileBox = ref();
const edit = ref();
const image = ref();
const canvas = ref();

const imgUrl = ref('');
const classList = ref({
    "select-box":true,
    "showIcon":true,
    "showPreview":false
})
const direction = ref({
    minTop:0,
    minLeft:0,
    maxLeft:0,
    maxTop:0,
    maxHeight:0,
    offsetX:0,
    offsetY:0
});
const editInfo = ref({
    width:50+'px',
    height:50+'px',
    left: 0,
    top: 0
});

watch(()=>editInfo.value.width,(oldValue,newValue)=>{
    let start = parseInt(oldValue);
    let end = parseInt(newValue);
    if(start-end>0){
        direction.value.maxLeft -= 2;
        direction.value.maxTop -= 2;
    }
    else if(start - end ===0){
        return;
    }
    else{
        direction.value.maxLeft += 2;
        direction.value.maxTop += 2;
    }
    
})

function selectImg(){
    fileBox.value.click();
}

function showImg(e){
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load',()=>{
        imgUrl.value = reader.result;
        classList.value.showIcon = false;
        classList.value.showPreview = true;
        nextTick(()=>{
            let rectImg = image.value.getBoundingClientRect();
            direction.value.minLeft = 0;
            direction.value.minTop = rectImg.top-1.6;
            direction.value.maxLeft = rectImg.width-parseInt(editInfo.value.width)-2;
            direction.value.maxTop = rectImg.top + rectImg.height-parseInt(editInfo.value.height)-4;
            direction.value.maxHeight = rectImg.height+direction.value.minTop-4;
            let centerX = (direction.value.maxLeft+direction.value.minLeft)/2;
            let centerY = (direction.value.maxTop+direction.value.minTop)/2;
            editInfo.value.top = centerY+'px';
            editInfo.value.left = centerX+'px';
        })
    })
}

function biggerEdit(e){
    e.preventDefault();
    let width = parseInt(editInfo.value.width);
    let left = parseInt(editInfo.value.left);
    let height = parseInt(editInfo.value.height);
    let top = parseInt(editInfo.value.top);
    let step = 2;
    if (e.deltaY < 0) {
        if(height+top>=direction.value.maxHeight){
            return;
        }
        width+=step;
        height+=step;
    } else if (e.deltaY > 0) {
        width-=step;
        height-=step;
    }
    editInfo.value.width = width+'px';
    editInfo.value.height = height+'px';
}

let lastX = -999;
let lastY = -999;
function moveEdit(e){ 
    let offsetLeft = 0;
    let offsetTop = 0;
    if(lastX === -999 || lastY === -999){
        lastX = e.clientX;
        lastY = e.clientY;
    }
    else{
        offsetLeft = e.clientX - lastX;
        offsetTop = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
    }
    let finLeft = parseInt(editInfo.value.left)+offsetLeft;
    let finTop = parseInt(editInfo.value.top)+offsetTop;
    if(finLeft>direction.value.maxLeft){
        return;
    }
    else if(finLeft<direction.value.minLeft){
        return;
    }
    if(finTop>direction.value.maxTop){
        return;
    }
    else if(finTop<direction.value.minTop){
        return;
    }
    editInfo.value.left = finLeft+'px';
    editInfo.value.top = finTop+'px';
}
function downEdit(e){
    direction.value.offsetX = e.offsetX;
    direction.value.offsetY = e.offsetY;
    window.addEventListener('mousemove',moveEdit);
    window.addEventListener('mouseup',upEdit);
}
function upEdit(){
    window.removeEventListener('mousemove',moveEdit);
    window.removeEventListener('mouseup',upEdit);
}

function handlerCanvas(){
    canvas.value.width = 200;
    canvas.value.height = 200;
    const ctx = canvas.value.getContext('2d');
    ctx.drawImage(image.value,parseInt(editInfo.value.left),parseInt(editInfo.value.top),parseInt(editInfo.value.width),parseInt(editInfo.value.height),0,0,200,200);

}

watchEffect(()=>{
    if(canvas.value){
        let rate = image.value.naturalWidth/image.value.width;
        const ctx = canvas.value.getContext('2d');
        ctx.drawImage(
            image.value,
            parseInt(editInfo.value.left)*rate,
            (parseInt(editInfo.value.top)-direction.value.minTop)*rate,
            parseInt(editInfo.value.width)*rate,
            parseInt(editInfo.value.height)*rate,
            0,0,canvas.value.width,canvas.value.height,
        );
    }
})

onMounted(()=>{
    fileBox.value.addEventListener('change',showImg);
    edit.value.addEventListener('wheel',biggerEdit);
    edit.value.addEventListener('mousedown',downEdit);
    canvas.value.width = 200;
    canvas.value.height = 200;
    
})
onBeforeUnmount(()=>{
    fileBox.value.removeEventListener('change',showImg);
    edit.value.removeEventListener('wheel',biggerEdit);
    edit.value.removeEventListener('mousedown',downEdit);
})

</script>

<template>
    <div :class="classList">
        <div class="select-icon">
            <svg @click="selectImg" t="1723257300093" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7559" width="48" height="48"><path d="M925.696 384q19.456 0 37.376 7.68t30.72 20.48 20.48 30.72 7.68 37.376q0 20.48-7.68 37.888t-20.48 30.208-30.72 20.48-37.376 7.68l-287.744 0 0 287.744q0 20.48-7.68 37.888t-20.48 30.208-30.72 20.48-37.376 7.68q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-37.888l0-287.744-287.744 0q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-37.888q0-19.456 7.68-37.376t20.48-30.72 30.208-20.48 37.888-7.68l287.744 0 0-287.744q0-19.456 7.68-37.376t20.48-30.72 30.208-20.48 37.888-7.68q39.936 0 68.096 28.16t28.16 68.096l0 287.744 287.744 0z" p-id="7560" fill="#cdcdcd"></path></svg>
            <span>选择你要上传的图片</span>
        </div>
        <div class="select-preview">
            <img :src="imgUrl" ref="image">
            <div class="mask"></div>
            <div class="edit-box" ref="edit" :style="editInfo"></div>
        </div>
    </div>
    <input type="file" class="file-box" ref="fileBox">
    <div style="margin: 0 20px;">
        <canvas ref="canvas"></canvas>
    </div>
</template>

<style scoped>
.select-box{
    --size:300px;
    width: var(--size);
    height: var(--size);
    border:2px dashed black;
    border-radius: 5px;
}
.showIcon>.select-icon{
    display: flex;
}
.showPreview>.select-preview{
    display: flex;
}
.select-icon{
    display: none;
    width: var(--size);
    height: var(--size);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* font-size: 64px; */
    color: #bbb;
}
.select-icon>svg{
    cursor: pointer;
}
.select-preview{
    display: none;
    width: var(--size);
    height: var(--size);
    justify-content: center;
    align-items: center;
    position: relative;
}
.select-preview>img{
    position: relative;
    width:var(--size) ;
}
.select-preview>.mask{
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: var(--size);
    height: var(--size);
    background-color: rgba(186, 186, 186,0.5);
}
.file-box{
    display: none;
}

.edit-box{
    position: absolute;
    border:2px dashed #6f6;
    cursor:move;
    /* cursor:move; nw-resize sw-resize*/
}
</style>