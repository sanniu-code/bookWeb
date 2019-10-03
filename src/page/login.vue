<template>
    <div class="wrapper">
        <div class="login">
            <p class="title">账号密码登录</p>
            <el-form ref="form" :model="form" :rules="rules" >
                <el-form-item prop="type">
                    <el-select v-model="form.type" placeholder="请选择角色" @change="change" >
                        <el-option label="学生" value="1"></el-option>
                        <el-option label="教师" value="2"></el-option>
                        <el-option label="管理员" value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item prop="username" >
                    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>

                <el-form-item  placeholder="请输入验证码" class="code" prop="code">
                    <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
                    <div class="img" @click="getCode">
                        <img :src="codeImg" alt="">
                    </div>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button type="primary" @click="login">登录</el-button>                   
                </el-form-item>
                
                <!-- <p class="forgetPass">忘记密码?</p>          -->
                
            </el-form>
        </div>
        <div class="header">
            <div class="img">
                <img src="../assets/logo.png" alt="">
                
            </div>
            <p>吕梁学院毕业论文管理系统</p>
        </div>
    </div>
</template>

<script>
import { getCode , login } from '@/api/user'
import { isExistTask } from '@/api/leader'
export default {
    name:"login",
    data(){
        return {
            form:{
                type:"",
                username:"",
                password:"",
                code:""
            },
            codeImg:"data:image/jpeg;base64,",
            rules:{
                type:[
                    { required: true, message: '请选择角色', trigger: 'blur' }
                ],
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                code:[
                    { required: true, message: '请输入验证码 ', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        change(){
            this.form.username = "";
            this.form.password = "";
            this.form.code = "";
            //重新
            this.getCode();
            
        },
        getCode(){
            getCode().then(res=>{
            
                console.log(res);
                //this.codeImg = 'data:image/png;base64,'+ res.data;
                
                let imgUrl = 'data:image/png;base64,' + btoa(new Uint8Array( res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
                this.codeImg = imgUrl;
            })
        },
        login(){
            this.$refs["form"].validate((valid) => {
            if (valid) {
                login(this.form).then(res=>{
                    console.log(res);
                    if(res.data.code == 1) {
                        this.$message({
                            showClose: true,
                            message: '登录成功',
                            type: 'success'
                        });
                        const d = res.data.returnData;
                        //保存当前用户的信息
                        this.$store.commit("USER_INFO",d);
                      
                        if(d.type == 3){
                            //判断当前是否存在有效的任务
                            isExistTask({
                                departId:d.departId
                            }).then(res=>{
                                //debugger;
                                if(res.data.code == 2){
                                   this.$router.replace({ name:"task" })
                                }else if(res.data.code == 1){
                                    this.$store.commit("leader/TASK_INFO",res.data.returnData)
                                    this.$router.replace({ name:"relativeData" })
                                }else {
                                    this.$message({
                                        type:"fail",
                                        message:"网络异常"
                                    })
                                    this.$store.commit("LOGIN_OUT")
                                }
                            }).catch(error=>{
                                this.$message({
                                    type:"fail",
                                    message:"网络异常"
                                })
                                this.$store.commit("LOGIN_OUT")
                            })
                        }else {
                            this.$router.replace({ name:"relativeData" })
                        }
                    }else {
                        this.$message({
                            showClose: true,
                            message: res.data.info,
                            type: 'error'
                        });
                    }
                    
                })
            } else {
                this.$message({
                    showClose: true,
                    message: '请输入数据',
                    type: 'warning'
                });
                return false;
            }
            });
            
        }
    },
    created(){
        this.getCode();
    }
}
</script>


<style lang="less" scoped>
    .wrapper {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-image: url("../assets/img/bcg.jpg");
        background-size:100% 100%;
        .header {
            margin:40px 0 0 40px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            &>p {
                margin:0;
                line-height: 100px;
                font-size: 40px;
                margin-left: 20px;
                font-family: "STXingkai";
            }
            .img {
                height: 100px;
                width: 100px;
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .login {
            position: absolute;
            box-sizing: border-box;
            width: 400px;
            height: 500px;
            border:1px solid #F1F3F4;
            top: 50%;
            right: 150px;
            margin-top: -250px;
            padding: 30px 30px;
            // box-shadow: 0px 0px 50px #F1F3F4;
            background: white;
            opacity: .95;
            p.title {
                font-size: 20px;
            }
            .el-select {
                display: block;
            }
            .el-form-item {
                margin-bottom: 20px;
            }
            /deep/ .code>div {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                
            }
            /deep/ .code .el-form-item__content .el-input {
                width: 200px;
                height: 45px;
                
            }
            
            /deep/ .el-input__inner {
                height: 45px;
                line-height: 45px;
            }
            /deep/ .btn .el-form-item__content {
                height: 45px;
                line-height: 45px;
                margin-top: 20px;
            }
            /deep/ .forgetPass{
                line-height: 10px;
                font-size: 13px;
                cursor: pointer;
                color: #CCC4D6;
            }
            /deep/ .code .el-form-item__content .img {
                width: 100px;
                height: 45px;
                margin-left: 37px;
                
                
                cursor: pointer;
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .el-button {
                width: 100%;
            }
        }
    }
</style>

