/**
 * 
 * @param {Array} tasks - 为一个二维数组第一项为任务函数，第二项为任务参数
 * @param {Number} maxLen - 最大并发数量
 * @return {Promise} 
 */
function parallelTask(tasks,maxLen = 3){
    return new Promise((resolve,reject)=>{
        let taskIndex = 0; // 当前要执行的任务
        let taskCount = 0; // 当前完成的任务数
        let result = []; // 任务完成结果
        function run(){
            const task = tasks[taskIndex][0];
            const args = tasks[taskIndex][1];
            task(...args).then((value)=>{
                taskCount++;
                result.push(value);
                if(taskCount === tasks.length){
                    resolve(result);
                }
                if(taskIndex<tasks.length){
                    run();// 运行下一个任务
                }
            })
            taskIndex++;
        }
        for(let i=0;i<maxLen && i<tasks.length;i++){
            // 执行任务
            run();
        }
    })
}

export default parallelTask;