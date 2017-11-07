<template>
  <div class="m-header">
    <div class="icon"></div>
    <div class="text">Chicken Music</div>
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss">
  @import '../../common/style/mixin.scss';
  @import '../../common/style/variable.scss';
  .m-header {
    position: relative;
    height: 44px;
    text-align: center;
    color: $color-theme;
    .icon {
       display: inline-block;
      vertical-align: top;
      margin-top: 6px;
      width: 30px;
      height: 32px;
      margin-right: 9px;
      @include bg-image('logo');
      background-size: 30px 32px;
    }
    .text{
      display: inline-block;
      vertical-align: top;
      line-height:44px;
      font-size:$font-size-large;
    }
    .mine{
      position: absolute;
      top: 0;
      right: 5px;
      .icon-mine{
        display: block;
        padding: 12px;
        font-size: 20px;
        color: $color-theme;
      }
    }
  }
</style>


