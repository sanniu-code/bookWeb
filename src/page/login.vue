<template>
    <div class="wrapper">
        <div class="login">
            <p class="title">账号密码登录</p>
            <el-form ref="form" :model="form" >
                <el-form-item >
                    <el-select v-model="form.role" placeholder="请选择角色">
                        <el-option label="学生" value="1"></el-option>
                        <el-option label="教师" value="2"></el-option>
                        <el-option label="管理员" value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item >
                    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>

                <el-form-item >
                    <el-input v-model="form.password" placeholder="请输入密码"></el-input>
                </el-form-item>

                <el-form-item  placeholder="请输入验证码" class="code">
                    <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
                    <div class="img" @click="getCode">
                        <img :src="codeImg" alt="">
                    </div>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button type="primary" >登录</el-button>                   
                </el-form-item>
                
                <p class="forgetPass">忘记密码?</p>         
                
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
import { getCode } from '@/api/user'
export default {
    name:"login",
    data(){
        return {
            form:{
                role:"",
                username:"",
                password:"",
                code:""
            },
            codeImg:"data:image/jpeg;base64,"
        }
    },
    methods:{
        getCode(){
            getCode().then(res=>{
            
                console.log(res);
                //this.codeImg = 'data:image/png;base64,'+ res.data;
                
                let imgUrl = 'data:image/png;base64,' + btoa(new Uint8Array( res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
                this.codeImg = imgUrl;
            })
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
            padding: 50px 30px;
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
                margin-bottom: 10px;
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

