// const BASEURL = "https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/"

if(process.env.NODE_ENV === 'development'){
    var LOCALURL =  "http://www.website-m.cc/"
}else if(process.env.NODE_ENV === 'test'){
    var LOCALURL =  "http://www.website.cc/"
}else{
    var LOCALURL =  ""
    var host = location.host

     if(host==='fleekfly.xyz'){
         LOCALURL =  "http://shop.fleekfly.xyz/"
     }else if(host==='www.global-shop-id.com'){
         LOCALURL =  "http://globalshop.fleekfly.xyz/"
     }else if(host==='www.perbelanjaan-id.com'){
        LOCALURL =  "http://perbelanjaan.fleekfly.xyz/"
    }else if(host==='www.crystalmarket-id.com'){
        LOCALURL =  "http://crystalmarket.fleekfly.xyz/"
    }else if(host==='www.daily-shopping-mall.com'){
        LOCALURL =  "http://dailyshop.fleekfly.xyz/"
    }else if(host==='www.richard-market.com'){
        LOCALURL =  "http://richardmarket.fleekfly.xyz/"
    }else if(host==='www.watchmall-id.com'){
        LOCALURL =  "http://watchmall.fleekfly.xyz/"
    }else if(host==='www.crystalmarket.sg'){
        LOCALURL =  "http://crystalsg.fleekfly.xyz/"
    }
    else if(host==='www.joyelikeyoga.com'){
        LOCALURL =  "http://joyelikeyoga.fleekfly.xyz/"
    }else{
        LOCALURL =  "http://shop.fleekfly.xyz/"
    }
}
console.log(process.env.NODE_ENV,location.host)
const URL ={
    getShopingMallInfo : LOCALURL+'api/user/index',    //商城首页所有信息
    // getGoodsInfo : BASEURL+'getGoodsInfo', 
    registerUser : LOCALURL+'user/register',  //用户注册接口
    login : LOCALURL+'user/login',  //用户登录接口

    getDetailGoodsInfo : LOCALURL+'api/user/goods',  //获取商品详情
    getLang : LOCALURL+'api/user/configs',  //获取语言
    sedGood_comments : LOCALURL+'api/user/good_comments',
    sendDecicedata : LOCALURL+'api/user/trace_logs',
    
    getCateGoryList : LOCALURL+'api/user/good_categories',  //得到大类信息
    getCateGorySubList : LOCALURL+'goods/getCategorySubList',  //得到小类信息
    getGoodsListByCategorySubID : LOCALURL+'api/user/goods',  //得到小类商品信息
    sendOrderInfo: LOCALURL+'api/user/good_orders',
    getNotice: LOCALURL+'api/user/order_notice',
    sendCoupon: LOCALURL+'api/user/check_coupon_code'
}

module.exports = URL
