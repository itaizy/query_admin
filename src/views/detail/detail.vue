<style>
    .index {
        width: 100%;
        /* position: absolute; */
        /* top: 0;
        bottom: 0;
        left: 0; */
        text-align: center;
        /* margin-bottom: 20px; */
    }
    .rowc {
        margin-top: 20px;
    }
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <Col span="24">
                <h2>
                    <p>欢迎使用"金状元"</p>
                </h2>
            </Col>
        </Row>
        <Row class-name="rowc" type="flex" justify="center" align="middle">
            <Col span="2"></Col>
            <Col span="6">
                <Select v-model="formItem.selectP">
                    <Option value="13">河北</Option>
                    <Option value="37">山东</Option>
                </Select>
            </Col>
            <Col span="1"></Col>
            <Col span="6">
                <Select v-model="formItem.selectT">
                    <Option value="1">理科</Option>
                    <Option value="2">文科</Option>
                </Select>
            </Col>
            <Col span="1"></Col>
            <Col span="6">
                <Input v-model="formItem.inputS" placeholder="输入分数" icon="ios-search" @click.native="handleSubmit('formItem')" number>
                    <Icon type="ios-search" slot="suffix" />
                </Input>
            </Col>
            <Col span="2"></Col>
            <Col span="1"></Col>
        </Row>
        <Row class-name="rowc" type="flex" justify="center" align="middle">
            <h3 v-for="(or,idx) in srank" :key="idx">
                您的成绩在{{or[0]}}年，全省排名：{{or[1]}} 名
            </h3>
        </Row>
        <Row class-name="rowc" type="flex" justify="center" align="middle">
            <h2>共有&nbsp; <font style='color:red;font-size:30px'>{{counta}}</font>&nbsp;条专业可供选择</h2>
        </Row>
        <Scroll :on-reach-bottom="handleReachBottom" :distance-to-edge=20 :height="tableHeight" ref="table">
            <Row class-name="rowc" v-for="(one,idx) in scoreDetail" :key="idx">
                <h2><p align="left">&nbsp; 
                    {{one.uname}} &nbsp; {{one.province}} &nbsp; {{one.year}}</p></h2>
                <Table type="width=100%" :loading="loading" stripe :columns="columns1" :data="one.uscore"></Table>
            </Row>
        </Scroll>
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
                loading: false,
                srank: [],
                counta: 100,
                tableHeight: 200,
                columns1: [
                    {
                        title: '名称',
                        key: 'spname',
                        // className: 'demo-table-info-cell-name',
                        minWidth: 250
                    },
                    {
                        title: '最低',
                        key: 'min',
                        // className: 'demo-table-info-cell-age',
                        minWidth: 60
                    },
                    {
                        title: '最高',
                        key: 'max',
                        // className: 'demo-table-info-cell-address',
                        minWidth: 60
                    }
                ],
                scoreDetail: [
                    {
                    'uname': '北京交通大学',
                    'province': '北京',
                    'year': 2017,
                    'uscore': [
                        { 'spname': '电子信息类（通信与控制）', 'min': 635, 'max': 640 },
                        { 'spname': '电气工程及其自动化', 'min': 632, 'max': 639 },
                        { 'spname': '软件工程', 'min': 630, 'max': 640 },
                        { 'spname': '计算机类', 'min': 630, 'max': 640 },
                        { 'spname': '文科试验班类（语言与传播）', 'min': 630, 'max': 640 }]
                    },
                    {
                        'uname': '北京科技大学',
                        'province': '北京',
                        'year': 2017,
                        'uscore': [
                        { 'spname': '理科试验班', 'min': 630, 'max': 640 },
                        { 'spname': '经济与贸易类', 'min': 626, 'max': 640 },
                        { 'spname': '工科试验班类（卓越计划）', 'min': 625, 'max': 640 }]
                    }
                ]
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
                // console.log(name)
                // this.$Message.success('输入分数为:' + this.formItem.inputS);
                axios.get('/serverapi/qqscorefree', {
                    params: {
                        score:this.formItem.inputS,
                        local_type_id:this.formItem.selectT,
                        province_id: this.formItem.selectP 
                        }
                    }).then(response => {
                    let kp = response.data.data
                    this.scoreDetail = JSON.parse('{"sd": '+ kp.replace(new RegExp('\'','g'),'"') +'}')['sd']
                    // this.scoreDetail = JSONArray.fromObject(response.data.data);
                    this.srank = response.data.srank
                    this.counta = _.sumBy(response.data.counts, function(o) {console.log(o); return o[1]})
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            clear () {
                this.formItem.inputS = ''
            },
            handleReachBottom () {
                return new Promise(resolve => {
                    setTimeout(() => {
                        axios.get('/serverapi/qqscorefree', {
                            params: {
                                score:this.formItem.inputS,
                                local_type_id:this.formItem.selectT,
                                province_id: this.formItem.selectP 
                                }
                            }).then(response => {
                            let kp = response.data.data
                            this.scoreDetail = JSON.parse('{"sd": '+ kp.replace(new RegExp('\'','g'),'"') +'}')['sd']
                            // this.scoreDetail = JSONArray.fromObject(response.data.data);
                            this.srank = response.data.srank
                            this.counta = _.sumBy(response.data.counts, function(o) {console.log(o); return o[1]})
                        })
                        resolve();
                    }, 2000);
                });
            }
        },
        mounted: function () {
            this.formItem = _.cloneDeep(this.$route.query);
            this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 40
            axios.get('/serverapi/qqscorefree', { 
                params: { 
                    score: this.formItem.inputS, 
                    local_type_id: this.formItem.selectT,
                    province_id: this.formItem.selectP 
                    }
                }).then(response => {
                let kp = response.data.data
                this.scoreDetail = JSON.parse('{"sd": '+ kp.replace(new RegExp('\'','g'),'"') +'}')['sd']
                this.srank = response.data.srank
                this.counta = _.sumBy(response.data.counts, function(o) {console.log(o); return o[1]})
                // this.scoreDetail = JSONArray.fromObject(response.data.data);
            })
        },
        created() {
            
        },
    };
</script>