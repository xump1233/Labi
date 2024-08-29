<template>
    <div class="history_search" ref="h_search">
        <div class="history_search_item">
            <div>筛选</div>
        </div>
        <div class="history_search_item">
            <div>范围（做题时间）：</div>
            <div>
                <el-date-picker
                    v-model="value2"
                    type="datetimerange"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    format="YYYY-MM-DD HH:mm:ss"
                    date-format="YYYY/MM/DD ddd"
                    time-format="A hh:mm:ss"
                    class="time_reset"
                />
            </div>
        </div>
        <div class="history_search_item">
            <div>题型：</div>
            <div>
                <el-select
                    v-model="value"
                    clearable
                    placeholder="选择题型"
                    style="width: 240px"
                >
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
                
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.history_search{
    width: 100%;
    height: 80px;
    background-color: rgb(181, 236, 156);
    position: absolute;
    top:0;
    display: flex;
    z-index: 2;
    align-items: center;
    justify-content: space-around;
    transition: all 0.3s;
}
.history_search_item{
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.history_search_item>div:first-child{
    font-size: 18px;
    font-weight: bold;
    color: #66f;
}
</style>