<template>
    <div>
         <div class="floor">
            <div class="floor-title">{{floorTitle}}</div>
            <div class="floor-anomaly">
                <div class="floor-one">
                    <img :src="floorData0.image" @click="goGoodsPage(floorData0.goodsId)" width="100%" />
                </div>
                <div>
                    <div class="floor-two">
                        <img :src="floorData1.image" @click="goGoodsPage(floorData1.goodsId)" width="100%" />
                    </div>
                    <div>
                        <img :src="floorData2.image" @click="goGoodsPage(floorData2.goodsId)" width="100%" />
                    </div>
                </div>
            </div>
            <div class="floor-rule">
                <div v-for="(item, index) in floorData.slice(3)" :key="index">
                    <img :src="item.image" @click="goGoodsPage(item.goodsId)" width="100%"/>
                </div>
                <!-- <div >
                    <img :src="floorData2.image" @click="goGoodsPage(floorData2.goodsId)" width="100%"/>
                </div>
                <div >
                    <img :src="floorData2.image" @click="goGoodsPage(floorData2.goodsId)" width="100%"/>
                </div> -->

            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        props:['floorData','floorTitle'],
        data() {
            return {
                floorData0:{},
                floorData1:{},
                floorData2:{}
            }
        },
        created(){
            // console.log(this.floorData)
            this.floorData0 = this.floorData[0]
                this.floorData1 = this.floorData[1]
                this.floorData2 = this.floorData[2]
        },
        // watch:{
        //     floorData:function(val){
        //         console.log(this.floorData)
        //         this.floorData0 = this.floorData[0]
        //         this.floorData1 = this.floorData[1]
        //         this.floorData2 = this.floorData[2]
        //     }
        // },
        methods:{
            goGoodsPage(id) {
                this.$router.push({name:'Goods',query:{goodsId: id,lg: this.$store.state.lang}})
            }
        }
    }
</script>

<style scoped>
    .floor-title{
        text-align: center;
        font-size:14px;
        height:1.8rem;
        line-height: 1.8rem;
        color:#ef3470
    }
    .floor-anomaly{
        display: flex;
        flex-direction:row;
        background-color: #fff;
        border-bottom:1px solid #ddd;
    }
    .floor-anomaly>div{
        width:50%;
        box-sizing:border-box;
        -webkit-box-sizing: border-box;
    }
    .floor-anomaly>div img{
        display: block
    }
    .floor-one{
        border-right:1px solid #ddd;
    }
    .floor-two{
        border-bottom:1px solid #ddd;
    }
    .floor-rule{
        display: flex;
        flex-direction: row;
        flex-wrap:wrap;
        background-color: #fff;
    }
    .floor-rule div{
        -webkit-box-sizing:border-box;
        box-sizing:border-box;
        width:10rem;
        border-bottom:1px solid #ddd;
    }
    .floor-rule div:nth-child(odd){
        border-right:1px solid #ddd;
    }
</style>