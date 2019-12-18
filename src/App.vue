<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  created(){
    var obj={}
    location.search.substr(1).split('&').forEach(function(aa){
    obj[aa.split('=')[0]]=aa.split('=')[1]
    })
    var country_id =''

    if(obj.lg){
      if(obj.lg==='en-PHP'){
        country_id=2
      }else if(obj.lg==='ind-BA'){
          country_id=1
      }
    }else{
      obj.lg='en-PHP'
      country_id=2
    }
    console.log('laofan',obj,country_id)
    this.$i18n.locale = obj.lg 
    this.$store.state.lang = obj.lg 
    this.$store.state.country_id =  country_id
  }
}
</script>
<style>
#app {
  background-color: #f0f0f0;
}
 #list-div .van-list__finished-text{
        float: left;
    width: 100%;
    }
</style>
