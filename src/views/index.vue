<style scoped>
    .index {
        width: 100%;
        position: absolute;
        /* top: 0;
        bottom: 0;
        left: 0; */
        text-align: center;
        /* margin: 20px; */
    }

    /* .index h1 {
        height: 150px;
    }

    .index h1 img {
        height: 100%;
    } */

    .index h2 {
        color: #666;
        margin-bottom: 20px;
    } 

    .index h2 p {
        margin: 0 0 50px;
    }
/* 
    .index .ivu-row-flex {
        height: 100%;
    } */
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <Col span="1"></Col>
            <Col span="22">
                <h1>
                    <img src="https://raw.githubusercontent.com/iview/iview/master/assets/logo.png">
                </h1>
                <h2>
                    <p>Welcome to your Query app!</p>
                </h2>
                <Form ref="formItem" :model="formItem" :rules="ruleValidate">
                    <h2>
                        <Select v-model="formItem.selectP">
                            <Option value="13">河北</Option>
                            <Option value="37">山东</Option>
                        </Select>
                    </h2>
                    <h2>
                        <Select v-model="formItem.selectT">
                            <Option value="1">理科</Option>
                            <Option value="2">文科</Option>
                        </Select>
                    </h2>
                    <h2>
                        <FormItem prop="inputS">
                            <Input type="text" v-model="formItem.inputS" placeholder="输入分数" number></Input>
                        </FormItem>
                    </h2>
                    <h2>
                        <FormItem>
                            <Button type="primary" @click="handleSubmit('formItem')">登录</Button>
                            <Button @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
                        </FormItem>
                    </h2>
                </Form>
                <!-- <Button type="ghost" @click="handleStart">Start iView</Button> -->
            </Col>
            <Col span="1"></Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                formItem: {
                    inputS: '',
                    selectP: '37',
                    selectT: '1',
                },
                ruleValidate: {
                    inputS: [{ required: true, type: 'integer', message: '请输入分数', trigger: 'blur'}]
                }
            }
        },
        methods: {
            handleStart() {
                this.$Modal.info({
                    title: 'Bravo',
                    content: 'Now, enjoy the convenience of iView.'
                });
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    // console.log(this.formItem.inputS)
                    if (valid) {
                        this.$router.push({ path: '/detail', query: this.formItem});
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
        }
    };
</script>