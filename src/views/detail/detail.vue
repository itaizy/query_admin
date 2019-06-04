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
        margin-top: 10px;
    }
    .ivu-card-body {
        padding:0px;
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
                <Select v-model="formItem.selectP" :key="formItem.selectP">
                    <Option value="13">河北</Option>
                    <Option value="37">山东</Option>
                </Select>
            </Col>
            <Col span="1"></Col>
            <Col span="6">
                <Select v-model="formItem.selectT" :key="formItem.selectT">
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
                {{or[0]}}年全省排{{or[1]}}名 &nbsp;
            </h3>
        </Row>
        <Row class-name="rowc" type="flex" justify="center" align="middle">
            <h2>共有&nbsp; <font style='color:red;font-size:30px'>{{counta}}</font>&nbsp;条专业数据可供参考</h2>
        </Row>
        <!-- <Scroll :on-reach-bottom="handleReachBottom" :distance-to-edge=20 :height="tableHeight" ref="table"> -->
            <Row class-name="rowc" v-for="(one,idx) in scoreDetail" :key="idx">
                <Card :padding=0>
                    <!-- <p slot="title">{{one.uname}}</p> -->
                    {{one.uname}}
                    <p></p>
                    <div style="display:inline">
                    <span>位于{{one.province}}&nbsp;|&nbsp; 全国{{one.nrank}}名 &nbsp;|&nbsp;</span> <span v-if="one.f211==1">211 &nbsp;|&nbsp;</span><span v-if="one.f985==1">985 &nbsp;|&nbsp;</span><span v-if="one.dual_class_name"> {{one.dual_class_name}} &nbsp;|&nbsp; </span>数据：{{one.year}} 年
                    </div>
                    <Table type="width=100%" :loading="loading" stripe :columns="columns1" :data="one.uscore"></Table>
                </Card>
            </Row>
        <!-- </Scroll> -->
        <Row style="background:#eee;padding:20px">
            <Card :bordered="false">
                <p slot="title">加入VIP享受更多服务</p>
                <Select value="1">
                    <Option value="1">华北</Option>
                    <Option value="2">东北</Option>
                    <Option value="3">华东</Option>
                    <Option value="4">华南</Option>
                    <Option value="5">西北</Option>
                    <Option value="6">西南</Option>
                </Select>
                <Select value="3">
                    <Option value="1">最优排序</Option>
                    <Option value="2">历史对照</Option>
                    <Option value="3">录取概率</Option>
                </Select>
                <Button type="primary" shape="circle" disabled icon="ios-search">加入</Button>
            </Card>
        </Row>
        <Row>

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
                        title: '最高',
                        key: 'max',
                        // className: 'demo-table-info-cell-address',
                        minWidth: 60
                    },
                    {
                        title: '最低',
                        key: 'min',
                        // className: 'demo-table-info-cell-age',
                        minWidth: 60
                    }
                ],
                scoreDetail: [
                    {
                    'uname': '北京交通大学',
                    'province': '北京',
                    'year': 2017,
                    'nrank': 'sp',
                    'f211': 1,
                    'f985': 1,
                    'dual_class_name': '',
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
                        'nrank': 'sp',
                        'f211': 1,
                        'f985': 1,
                        'dual_class_name': '',
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
                    this.scoreDetail = JSON.parse('{"sd": '+ kp.replace(new RegExp('\'','g'),'"').replace(/-1/g, '\"-\"') +'}')['sd']
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
                        // this.tableHeight = window.innerHeight
                        axios.get('/serverapi/qqscorefree', {
                            params: {
                                score:this.formItem.inputS,
                                local_type_id:this.formItem.selectT,
                                province_id: this.formItem.selectP 
                                }
                            }).then(response => {
                            let kp = response.data.data
                            this.scoreDetail = JSON.parse('{"sd": '+ kp.replace(new RegExp('\'','g'),'"').replace(/-1/g, '\"-\"') +'}')['sd']
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
            // this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 40
            // this.tableHeight = window.innerHeight
            axios.get('/serverapi/qqscorefree', { 
                params: { 
                    score: this.formItem.inputS, 
                    local_type_id: this.formItem.selectT,
                    province_id: this.formItem.selectP 
                    }
                }).then(response => {
                let kp = response.data.data
                this.scoreDetail = JSON.parse('{"sd": '+ kp.replace(new RegExp('\'','g'),'"').replace(/-1/g, '\"-\"') +'}')['sd']
                this.srank = response.data.srank
                this.counta = _.sumBy(response.data.counts, function(o) {console.log(o); return o[1]})
                // this.scoreDetail = JSONArray.fromObject(response.data.data);
            })
        },
        created() {
            
        },
    };
</script>