<template>
    <div>
        <van-nav-bar @click-left="onClickNavLeft" left-arrow :fixed="bar_fixed" :z-index=3 class="left50"  >
                <van-icon name="wap-nav" slot="left" />
                <img src="../../assets/images/ydzstou.png" slot="title" style="max-height:30px;margin-top:6px">
                <van-icon name="cart" slot="right" size="20px" :info="cartNumCount" @click.native="tocart" />
        </van-nav-bar>
        <div id="navLeft" class="left50" v-show="navLeft_show">
            <van-cell size="large" is-link  :title="$t('home')" @click="golistPage('home')" />
            <van-cell size="large" is-link  :title="cate.mallCategoryName" v-for="(cate,index) in category" :key="index"  @click="golistPage(cate.mallCategoryId,index)" />
        </div>
        <van-overlay 
        z-index="2"
        :show="show"
        @click="show = false,navLeft_show=false"
        />
        <!-- <van-search placeholder="请输入搜索关键词" v-model="value" shape="round" @search="onSearch" class='search left50'/> -->
        <div style="height:100px"></div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { stringify } from 'querystring'
export default {
    data(){
        return {
            value:'',
            category:[],
            bar_fixed:true,
            navLeft_show:false,
            activeKey:9999999,
            show:false,
        }
    },
    props:{
        keywordsVal : String
    },
    // watch:{
    //     keywordsVal:{
    //         handle(){
    //             console.log(this.keywordsVal)
    //             this.value=this.keywordsVal
    //         }
    //     }
    // },
    
    // props:['keywordsVal'],
    methods:{
        cartNumFun() {
            this.cartNum = localStorage.cartInfo ? (JSON.parse(localStorage.cartInfo).length===0?'':JSON.parse(localStorage.cartInfo).length) : ''
        },
        onClickNavLeft(){
            this.show=!this.show
            this.navLeft_show=!this.navLeft_show
        },
        tocart(){
            this.$router.push({name:'Cart',query:{lg: this.$store.state.lang}})
        },
        // onSearch(v){
        //     // console.log(v)
        //     if(this.$route.name !='CategoryList'&&v!=''){
        //         this.$router.push({name:'CategoryList',params:{keywords:v}})
        //         this.$emit('nav_Search',v)
        //     }else{
        //         this.$emit('nav_Search',v)
        //     }
        // },
        golistPage(id,index) {
            this.show=false
            this.navLeft_show=false
            // console.log(this.$route.name)
            if(this.$route.name !='CategoryList'&&id!='home'){
                this.$router.push({name:'CategoryList',params:{categorySubId:id,index:index},query:{lg: this.$store.state.lang}})
            }else if(id=='home'){
                this.$router.push({name:'ShoppingMall',query:{lg: this.$store.state.lang} })
            }else{
                this.$emit('nav_index',id)
            }
        },
        onClickNavLeft(){
            this.show=!this.show
            this.navLeft_show=!this.navLeft_show
        },
    },
    created(){
        // console.log(this.keywordsVal,this.keywordsValue)
        // this.value=this.keywordsVal
        axios({
            url:url.getShopingMallInfo,
            method:'get',
            params: {country_id:this.$store.state.country_id}
        })
        .then(response=>{
            // console.log(response)
            if(response.status==200){
                this.category=response.data.data.category;
            }
        })
        .catch(error=>{
            console.log(error)
        })
    },
    computed: {
        cartNumCount() {
            return this.$store.state.cartNum
        },
        //            keywordsValue() {
        //      return this.keywordsVal
        //    }
        
    },
    mounted(){
        // console.log(this.keywordsVal,this.keywordsValue)
        let winHeight = document.documentElement.clientHeight
        document.getElementById("navLeft").style.height=winHeight -46 +'px'
    },
}
</script>

<style scoped>
    .van-sidebar-item--select {
        border-color: #f8f8f8;
        background-color: #f8f8f8;
        color: #7d7e80;
    }
    .van-nav-bar .van-icon {
        font-size: 26px;
        /* color:#ef3470 */
    }
    .hot-title{
        color:#ef3470
    }
    #navLeft{
        position: fixed;
        top: 46px;
        left: 0;
        z-index: 3;
        background: #f8f8f8;
        overflow-y: auto;
        width:80%;
        max-width: 480px
    }
    .search{
        position: fixed;
        top: 45px;
        z-index: 1;
        width: 100%;
    }
</style>
