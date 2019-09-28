<template>
    <div class="wrapper">
        <div class="operate">
            <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
                {{ $store.state.userInfo? $store.state.userInfo.name:"" }} <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
                <el-dropdown-item command="updatePass">修改密码</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </div>



        <div>
            <el-dialog
                title="修改密码"
                :visible.sync="updataPass"
                width="30%"
                :append-to-body="appendToBody"
                :close-on-click-modal="closeOnClickModal"
                :close-on-press-escape="closeOnClickModal"
                :show-close="showClose"
                center>
                <el-form ref="form" :model="form" :rules="rules" status-icon class="demo-ruleForm">
                    <el-form-item prop="oldPass">
                        <el-input v-model="form.oldPass" placeholder="请输入旧密码" type="password" ></el-input>
                    </el-form-item>
                    <el-form-item prop="newPass">
                        <el-input v-model="form.newPass" placeholder="请输入新密码" type="password"></el-input>
                    </el-form-item>
                    <el-form-item prop="repeatPass">
                        <el-input v-model="form.repeatPass" placeholder="请再一次输入新密码"  type="password"></el-input>
                    </el-form-item>
                    <div class="btn">
                        <el-button type="primary" @click="submit('form')">确定</el-button>
                        <el-button type="text" @click="resetForm('form')">取消</el-button>
                    </div>
                </el-form>
            </el-dialog>
        </div>

    </div>
    
</template>

<script>
import { loginOut,updatePass,judgePass } from '@/api/user'
export default {
    data(){
        //用来检查输入的旧密码是否正确
        const checkOldPass = (rule,value,callback)=>{
            if(value === ''){
                callback(new Error('请输入原密码'));
            }else {
                //调用接口 判断这个密码是否正确
                judgePass({
                    oldPass:value
                }).then(res=>{
                    if(res.data.code != 1){
                        callback(new Error('原密码错误'));
                    }else {
                        callback();
                    }
                })
            }
        }

        //用来检查第二次输入的密码是否正确
        const checkPass = (rule, value, callback)=>{
            if (value == '') {
                callback(new Error('请再次输入密码'));
            } else if (value != this.form.newPass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        }
        return {
            updataPass:false,
            closeOnClickModal: false,
            dialogFormVisible: false,
            appendToBody: true,
            showClose:false,
            form:{
                oldPass:"",
                newPass:"",
                repeatPass:""
            },
            rules:{
                oldPass:[
                    {
                        validator:checkOldPass, 
                        trigger: 'blur'
                    }
                ],
                newPass:[
                    {required: true, message: '请输入新密码', trigger: 'blur'}
                ],
                repeatPass:[
                    {
                        validator:checkPass,
                        trigger: 'blur'
                    }
                ],
            }
        }
    },
    methods:{
        handleCommand(command){
            if(command == "loginOut"){
                //退出登录
                this.$confirm('确定要退出吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.loginOut();
                }).catch(() => {
                    
                });
                return;
            }
            //修改密码
            this.updataPass = true;

        },
        loginOut(){
            console.log("**************");
            loginOut().then(res=>{
                if(res.data.code != 1){
                    this.$message({
                        type:"error",
                        message:"网络异常"
                    })
                    return;
                }

                this.$message({
                    type:"success",
                    message:"退出成功"
                })
                this.$store.commit("LOGIN_OUT");
                this.$router.replace({ name:"login" })
            })
        },
        submit(ref){
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    //调用接口
                    updatePass({
                        oldPass:this.form.oldPass,
                        password:this.form.newPass,
                        repeatPass:this.form.repeatPass,
                        type:this.$store.state.userInfo.type
                    }).then(res=>{
                        if(res.data.code != 1){
                            this.$message({
                                type:"error",
                                message:"密码修改失败"
                            })
                            return;
                        }
                        this.$message({
                            type:"success",
                            message:"密码修改成功"
                        })
                        /****  需要重新登录   */
                        this.$store.commit("LOGIN_OUT")
                        this.$router.replace({ name:"login" })
                    })
                } else {
                    
                    return false;
                }
            });
        },
        //点击取消按钮
        resetForm(ref){
            this.updataPass = false;
            this.$refs[ref].resetFields();

        }
    }
}
</script>


<style lang="less" scoped>
    .wrapper {
        background: #409EFF;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 100px;
        width: 100%;
        box-sizing: border-box;
        // background: red;
        border-bottom: 1px solid #E6E6E6;
        // padding:0 20px;
        .operate {
            position: absolute;
            
            right: 20px;
            bottom: 20px;
            // width: 100px;
            // height: 50px;
            cursor: pointer;
            .el-dropdown-link {
                font-size: 15px;
            }
            
        }     
    }
    .wrapper .operate .el-dropdown-link[data-v-af5d225e] {
        color: white;
    }
    .btn {
        // display: flex;
        // flex-direction: row;
        // justify-content: space-around;
        button {
            display: block;
            width: 100%;
            margin-bottom: 10px;
        }
    }
    .el-button+.el-button {
        margin-left: 0px;
        
    }
</style>
