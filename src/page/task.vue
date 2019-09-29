<template>
    <div class="wrapper">
        <div class="content">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item prop="name">
                    <el-input v-model="form.name" placeholder="请输入任务名称"></el-input>
                </el-form-item>
                <el-form-item prop="startTime">
                    <el-date-picker
                        v-model="form.startTime"
                        type="date"
                        format="yyyy-MM-dd"
                        :picker-options="selectStartTime"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="endTime">
                    <el-date-picker
                        v-model="form.endTime"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                         :picker-options="selectEndTime"
                        type="date"
                        placeholder="请选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="year">
                    <el-date-picker
                        v-model="form.year"
                        align="right"
                        type="year"
                        placeholder="请选择学生的入学年份">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="createTask">立即创建任务</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { createTask } from '@/api/leader'
export default {
    data(){
        const self = this;
        return {
            form:{
                name:"",
                startTime:"",
                endTime:""
            },
            selectStartTime: {
                disabledDate(time) {
                    if (!self.form.endTime) return false;

                    return new Date(time).getTime() >= new Date(self.form.endTime).getTime() - 86400000;
                }
            },
            selectEndTime: {
                disabledDate(time) {
                    if (!self.form.startTime) return false;
                    return new Date(time).getTime() <= new Date(self.form.startTime).getTime();
                }
            },
            rules: {
                name: [
                    { required: true, message: '请输入任务名称', trigger: 'blur' },

                ],
                startTime: [
                    { required: true, message: '请选择开始时间', trigger: 'blur' },

                ],
                endTime: [
                    { required: true, message: '请选择结束时间', trigger: 'blur' },

                ],
                year: [
                    { required: true, message: '请选择学生入学年份', trigger: 'blur' },

                ],
                
          
            }
        }
    },
    methods:{
        createTask(){
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    createTask({
                        year:this.form.year.getFullYear(),
                        startTime:this.form.startTime,
                        endTime:this.form.endTime,
                        name:this.form.name
                    }).then(res=>{
                        if(res.data.code != 1){
                            this.$message({
                                type:'fail',
                                message:"创建失败"
                            })
                            return;
                        }
                        this.$message({
                            type:'success',
                            message:"创建成功"
                        })
                        this.$store.commit("leader/TASK_INFO",{
                            year:this.form.year.getFullYear(),
                            startTime:this.form.startTime,
                            endTime:this.form.endTime,
                            name:this.form.name,                           
                        })

                        this.$router.replace({ path:"/index" });
                    })

                } else {
                    return false;
                }
            });
            
        }
    }
}
</script>
<style lang="less" scoped>
    .wrapper {
        position:absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        div.content {
            width: 400px;
            // height: 180px;
            box-sizing: border-box;
            padding: 30px 20px;
            border:1px solid #F1F3F4;
            box-shadow: 0px 0px 50px #F1F3F4;            
            // background: red;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -200px;
            margin-left: -200px;
            .el-button {
                display: block;
                width: 100%;
            }

        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner {
            width: 100%;
        }
        
    }
</style>

