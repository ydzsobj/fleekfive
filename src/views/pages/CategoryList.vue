<template>
    <div>
        <!-- <div class="navbar-div">
            <van-nav-bar :title="$t('classlist')"/>
        </div> -->
        <top-nav @nav_index="nav_index"  :keywords-val="keywords"></top-nav>
        <van-search :placeholder="$t('searchProducts')" v-model="keywords" shape="round" @search="onSearch" class='search left50'/>
        <div>
          <van-row>
              <van-col>
                  <!-- <div id="leftNav">
                       <ul>
                           <li @click="clickCategory(index,item.category_id)" :class="{categoryActice:categoryIndex==index}" v-for="(item , index) in category" :key="index">
                               {{item.name}}
                           </li>
                       </ul>
                  </div> -->
                  <!-- <van-sidebar v-model="categoryIndex" id="leftNav">
                    <van-sidebar-item :title="item.name" v-for="(item , index) in category" :key="index" @click.native="clickCategory(index,item.category_id)"/>
                  </van-sidebar> -->
                 
              </van-col>
              <!-- <van-col style="width: calc( 100% - 85px )"> -->
              <van-col style="width:100%">

                  <!-- <div class="tabCategorySub">
                      <van-tabs v-model="active" @click="onClickCategorySub">
                          <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">

                          </van-tab>
                      </van-tabs>
                  </div> -->
                  
                <div id="list-div">
                    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                        <van-list
                            v-model="loading"
                            :finished="finished"
                            @load="onLoad"
                            :error.sync="error"
                            :error-text="$t('errorText')"
                            :offset="10"
                            :finished-text="$t('outfloor')"
                        >
                            <!-- :immediate-check="false" -->
                            <div class="list-item" @click="goGoodsInfo(item.goodsId)" v-for="(item,index) in goodList" :key="index">
                                <div class="list-item-img">
                                    <img :src="item.image" 
                                    width="100%"
                                    :onerror="errorImg"                                    
                                     /> 
                                </div>
                                <div class="list-item-text">
                                    <div class="name">{{item.name}}</div>                                                                        
                                    <!-- <div>{{$store.state.money_sign}}{{ $store.state.lang ==='ind-BA' ? item.price | int : item.price | toDivide}}</div> -->
                                    <div v-if="$store.state.lang==='ind-BA'"><b>{{$store.state.money_sign}}{{item.price |num |toThousands}}</b></div>
                                    <div v-else><b>{{$store.state.money_sign}}{{item.price}}</b></div>
                                 </div>
                            </div>
        
                        </van-list>
                    </van-pull-refresh>
                </div>
              </van-col>
          </van-row>  
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    import topNav from '../component/topNav'
    import {toMoney ,toDivide, int,num,toThousands} from '@/filter/moneyFilter.js'
    export default {
        data() {
            return {
                error: false,
                loading: false,   //是否处于加载状态
                finished: false,  //是否已加载完所有数据
                isLoading: false,   //是否处于下拉刷新状态
                category: [],
                categoryIndex:0,
                active:0,    //激活标签的值
                page:1,        //商品列表的页数
                goodList:[],   //商品列表信息
                categorySubId:null, //商品子类ID
                errorImg:'this.src="'+require('@/assets/images/errorimg.png')+'"',
                thrott: true,
                keywords:'',
                value:''
            }
        },
        components:{topNav},
        filters:{
            moneyFilter(money){
                return toMoney(money)
            },
            toDivide(money){
                return toDivide(money)
            },
            int(money){
                return int(money)
            },
            num(money){
                return num(money)
            },
            toThousands(money){
              return toThousands(money)
           },
        },
        created(){
            this.keywords=this.$route.params.keywords
            // this.getCategory();
           
        },
        activated(){
            if( this.$route.params.categorySubId){
                this.keywords=''
                this.page=1
                this.categoryIndex=this.$route.params.index
                this.categorySubId=this.$route.params.categorySubId
                this.finished = false
                this.isLoading= false
                this.loading = false
                this.goodList= [] 
                //this.onLoad()
            }
            if(this.$route.params.keywords==''||this.$route.params.keywords){
                this.keywords=this.$route.params.keywords
                this.categorySubId=''
                this.page=1
                this.goodList= [] 
                this.finished = false
                this.isLoading = true
            }
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById("list-div").style.height=winHeight -100 +'px'
        },
        methods: {
            onSearch(v){
                this.keywords=v
                this.categorySubId=''
                this.page=1
                this.goodList= [] 
                this.finished = false
                this.isLoading = false
            },
            nav_index(categoryId){
                // console.log(categoryId)
                this.error = false
                    this.loading = true
                    this.keywords=''
                // if(this.thrott){
                    this.thrott= false
                    this.goodList= [] 
                   this.categoryIndex=categoryId
                   this.page=1
                   this.finished = false
                   this.isLoading = true
                   this.categorySubId = categoryId
                   this.onLoad(categoryId)
                // }
            },
            onLoad(index) {      //上拉加载
                    this.getGoodList(index)
            },
            onRefresh() {       //下拉刷新
                    this.goodList = []
                    this.finished = false;
                    this.isLoading = true;
                    this.loading = true
                    this.page = 1
                    this.onLoad()
            },
            getGoodList(index){
                var data ={}
                if(this.keywords==''&&this.categorySubId){
                    data={
                        category_id:this.categorySubId,
                        country_id:this.$store.state.country_id,
                        page:this.page
                    }
                }else{
                    data={
                        keywords:this.keywords,
                        country_id:this.$store.state.country_id,
                        page:this.page
                    }
                }
                  axios({
                      url:url.getGoodsListByCategorySubID,
                    method:'get',
                    params:data
                })
                .then(response=>{
                 this.page++
                    if(response.data.success  && response.data.data.data.length > 0){
                        if(index > -1){this.goodList = [];this.categoryIndex=index}
                        this.goodList=this.goodList.concat(response.data.data.data)
                    }else{
                        this.finished = true
                    }
                    this.loading = false
                    this.isLoading = false
                    this.thrott= true
                })
                .catch(error=>{
                    this.isLoading = false
                    this.loading = false
                    this.error = true
                    this.thrott= true
                    console.log(error)
                })
            },
            //跳转到商品详细页
            goGoodsInfo(id){
                this.$router.push({name:'Goods',query:{goodsId:id,lg: this.$store.state.lang}})
            }, 
        }
    }
</script>

<style scoped>
    #leftNav{
        background-color: #f8f8f8;
    }
    /* #leftNav ul li {
        line-height: 2rem;
        border-bottom: 1px solid #E4E7ED;
        padding:3px;
        font-size:0.8rem;
        text-align: center;
    } */
    .categoryActice{
        background-color: #fff;
    }


    .list-item{
        /* display: flex; */
        /* flex-direction: row; */
        width: 50%;
        float: left;    
        font-size:0.74rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
        box-sizing: border-box;
    }
    #list-div{
        overflow: scroll;
        background: #f0f0f0
    }
    .list-item-img{
        /* flex:8; */
    }
    .list-item-text{
        /* flex:16; */
        margin-top:10px;
        margin-left:10px;
    }
    .list-item-text .name{
        overflow: hidden;
    text-overflow: ellipsis;
    /* white-space: nowrap; */
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 1.9rem;
        color: #524e4e;
    }
    .van-list__finished-text{
        float: left;
    width: 100%;
    }
    .search{
        position: fixed;
        top: 45px;
        z-index: 1;
        width: 100%;
    }
   
</style>