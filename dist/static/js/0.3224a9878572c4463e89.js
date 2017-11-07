webpackJsonp([0],{"/vD/":function(t,i,s){"use strict";var n=s("4YfN"),e=s.n(n),a=s("kvay"),A=s("HVJf"),o=s("gyMJ"),l=s("T452"),r=s("PvFA");i.a={data:function(){return{songs:[],rank:!0}},computed:e()({},s.i(A.a)(["topList"]),{title:function(){return this.topList.topTitle},bgImage:function(){return this.songs.length?this.songs[0].image:""}}),created:function(){this.getTopMusicList()},methods:{getTopMusicList:function(){var t=this;s.i(o.c)(this.topList.id).then(function(i){i.code===l.a&&(t.songs=t.normalizeSongs(i.songlist))})},normalizeSongs:function(t){var i=[];return t.forEach(function(t){t.data.songid&&t.data.albumid&&i.push(s.i(r.b)(t.data))}),i}},components:{musicList:a.a}}},"4uUk":function(t,i,s){"use strict";var n=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"music-list"},[s("div",{staticClass:"back",on:{click:t.back}},[s("i",{staticClass:"icon-back"})]),t._v(" "),s("h1",{ref:"title",staticClass:"title",domProps:{innerHTML:t._s(t.title)}}),t._v(" "),s("div",{ref:"bgImage",staticClass:"bg-image",style:t.bgStyle},[s("div",{staticClass:"play-wrapper"},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.songs.length>0,expression:"songs.length>0"}],ref:"playBtn",staticClass:"play",on:{click:t.randomAll}},[s("i",{staticClass:"icon-play"}),t._v(" "),s("span",{staticClass:"text"},[t._v("随机播放全部")])])]),t._v(" "),s("div",{ref:"filter",staticClass:"filter"})]),t._v(" "),s("div",{ref:"layer",staticClass:"bg-layer"}),t._v(" "),s("scroll",{ref:"list",staticClass:"list",attrs:{data:t.songs,"listen-scroll":t.listenScroll,"probe-type":t.probeType},on:{scroll:t.scroll}},[s("div",{staticClass:"song-list-wrapper"},[s("songs-list",{attrs:{songs:t.songs,rank:t.rank},on:{select:t.selectItem}})],1)]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.songs.length,expression:"!songs.length"}],staticClass:"loading-container"},[s("loading")],1)],1)},e=[],a={render:n,staticRenderFns:e};i.a=a},"5uuw":function(t,i,s){var n=s("hdbk");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);s("8bSs")("f40b4736",n,!0)},ORar:function(t,i,s){"use strict";var n=s("4YfN"),e=s.n(n),a=s("qwAB"),A=s("ZV4u"),o=s("3Q4o"),l=s("y/jF"),r=s("HVJf"),c=s("F4+m"),p=s.i(o.a)("transform"),g=s.i(o.a)("backdrop-filter");i.a={mixins:[c.c],data:function(){return{scrollY:""}},props:{title:{type:String,default:""},bgImage:{type:String,default:""},songs:{type:Array,default:[]},rank:{type:Boolean,default:!1}},created:function(){this.probeType=3,this.listenScroll=!0},computed:{bgStyle:function(){return"background-image:url("+this.bgImage+")"}},mounted:function(){this.RESERVED_HEIGHT=this.$refs.title.clientHeight,this.imageHeight=this.$refs.bgImage.clientHeight,this.$refs.list.$el.style.top=this.imageHeight+"px",this.minTransalteY=-this.imageHeight+this.RESERVED_HEIGHT},methods:e()({handlePlayList:function(t){var i=t.length>0?"60px":"";this.$refs.list.$el.style.bottom=i,this.$refs.list.refresh()},back:function(){this.$router.back()},scroll:function(t){this.scrollY=t.y}},s.i(r.c)(["setPlay","setRandomPlayAll"]),{selectItem:function(t,i){this.setPlay({list:this.songs,index:i})},randomAll:function(){this.setRandomPlayAll({list:this.songs})}}),watch:{scrollY:function(t){var i=Math.max(this.minTransalteY,t),s=0,n=1,e=0;this.$refs.layer.style[p]="translate3d(0,"+i+"px,0)";var a=Math.abs(t/this.imageHeight);t>0?(n=1+a,s=10):e=Math.min(20,20*a),this.$refs.filter.style[g]="blur("+e+"px)",t<this.minTransalteY?(s=10,this.$refs.bgImage.style.paddingTop=0,this.$refs.bgImage.style.height=this.RESERVED_HEIGHT+"px",this.$refs.playBtn.style.display="none"):(this.$refs.bgImage.style.paddingTop="70%",this.$refs.bgImage.style.height=0,this.$refs.playBtn.style.display=""),this.$refs.bgImage.style.zIndex=s,this.$refs.bgImage.style[p]="scale("+n+")"}},components:{Scroll:a.a,SongsList:A.a,loading:l.a}}},Vqin:function(t,i,s){var n=s("bXBQ");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);s("8bSs")("6ab02b6c",n,!0)},bXBQ:function(t,i,s){i=t.exports=s("BkJT")(!0),i.push([t.i,".slide-enter-active,.slide-leave-active{-webkit-transition:all .3s ease;transition:all .3s ease}.slide-enter,.slide-leave-to{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}","",{version:3,sources:["C:/Users/hxsd/Desktop/vuemusic/src/components/top-list/top-list.vue"],names:[],mappings:"AACA,wCACE,gCAAkC,AAClC,uBAA0B,CAC3B,AACD,6BACE,wCAA2C,AACnC,+BAAmC,CAC5C",file:"top-list.vue",sourcesContent:["\n.slide-enter-active, .slide-leave-active {\n  -webkit-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n.slide-enter, .slide-leave-to {\n  -webkit-transform: translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0);\n}\n"],sourceRoot:""}])},bp8x:function(t,i,s){"use strict";var n=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("transition",{attrs:{name:"slide"}},[s("music-list",{attrs:{title:t.title,rank:!0,songs:t.songs,bgImage:t.bgImage}})],1)},e=[],a={render:n,staticRenderFns:e};i.a=a},hdbk:function(t,i,s){i=t.exports=s("BkJT")(!0),i.push([t.i,".music-list{position:fixed;z-index:100;top:0;left:0;bottom:0;right:0;background:#222}.music-list .back{position:absolute;top:0;left:6px;z-index:50}.music-list .back .icon-back{display:block;padding:10px;font-size:22px;color:#ffcd32}.music-list .title{position:absolute;top:0;left:10%;z-index:40;width:80%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;text-align:center;line-height:40px;font-size:18px;color:#fff;font-weight:400}.music-list .bg-image{position:relative;width:100%;height:0;padding-top:70%;-webkit-transform-origin:top;transform-origin:top;background-size:cover}.music-list .bg-image .play-wrapper{position:absolute;bottom:20px;z-index:50;width:100%}.music-list .bg-image .play-wrapper .play{-webkit-box-sizing:border-box;box-sizing:border-box;width:135px;padding:7px 0;margin:0 auto;text-align:center;border:1px solid #ffcd32;color:#ffcd32;border-radius:100px;font-size:0}.music-list .bg-image .play-wrapper .play .icon-play{display:inline-block;vertical-align:middle;margin-right:6px;font-size:16px}.music-list .bg-image .play-wrapper .play .text{display:inline-block;vertical-align:middle;font-size:12px}.music-list .bg-image .filter{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(7,17,27,.4)}.music-list .bg-layer{position:relative;height:100%;background:#222}.music-list .list{position:fixed;top:0;bottom:0;width:100%;background:#222}.music-list .list .song-list-wrapper{padding:20px 30px}.music-list .loading-container{position:absolute;width:100%;top:60%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}","",{version:3,sources:["C:/Users/hxsd/Desktop/vuemusic/src/components/music-list/music-list.vue"],names:[],mappings:"AACA,YACE,eAAgB,AAChB,YAAa,AACb,MAAO,AACP,OAAQ,AACR,SAAU,AACV,QAAS,AACT,eAAiB,CAClB,AACD,kBACI,kBAAmB,AACnB,MAAO,AACP,SAAU,AACV,UAAY,CACf,AACD,6BACM,cAAe,AACf,aAAc,AACd,eAAgB,AAChB,aAAe,CACpB,AACD,mBACI,kBAAmB,AACnB,MAAO,AACP,SAAU,AACV,WAAY,AACZ,UAAW,AACX,uBAAwB,AACxB,gBAAiB,AACjB,mBAAoB,AACpB,kBAAmB,AACnB,iBAAkB,AAClB,eAAgB,AAChB,WAAY,AACZ,eAAoB,CACvB,AACD,sBACI,kBAAmB,AACnB,WAAY,AACZ,SAAU,AACV,gBAAiB,AACjB,6BAA8B,AACtB,qBAAsB,AAC9B,qBAAuB,CAC1B,AACD,oCACM,kBAAmB,AACnB,YAAa,AACb,WAAY,AACZ,UAAY,CACjB,AACD,0CACQ,8BAA+B,AACvB,sBAAuB,AAC/B,YAAa,AACb,cAAe,AACf,cAAe,AACf,kBAAmB,AACnB,yBAA0B,AAC1B,cAAe,AACf,oBAAqB,AACrB,WAAa,CACpB,AACD,qDACU,qBAAsB,AACtB,sBAAuB,AACvB,iBAAkB,AAClB,cAAgB,CACzB,AACD,gDACU,qBAAsB,AACtB,sBAAuB,AACvB,cAAgB,CACzB,AACD,8BACM,kBAAmB,AACnB,MAAO,AACP,OAAQ,AACR,WAAY,AACZ,YAAa,AACb,2BAAiC,CACtC,AACD,sBACI,kBAAmB,AACnB,YAAa,AACb,eAAiB,CACpB,AACD,kBACI,eAAgB,AAChB,MAAO,AACP,SAAU,AACV,WAAY,AACZ,eAAiB,CACpB,AACD,qCACM,iBAAmB,CACxB,AACD,+BACI,kBAAmB,AACnB,WAAY,AACZ,QAAS,AACT,mCAAoC,AAC5B,0BAA4B,CACvC",file:"music-list.vue",sourcesContent:["\n.music-list {\n  position: fixed;\n  z-index: 100;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: #222;\n}\n.music-list .back {\n    position: absolute;\n    top: 0;\n    left: 6px;\n    z-index: 50;\n}\n.music-list .back .icon-back {\n      display: block;\n      padding: 10px;\n      font-size: 22px;\n      color: #ffcd32;\n}\n.music-list .title {\n    position: absolute;\n    top: 0;\n    left: 10%;\n    z-index: 40;\n    width: 80%;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    white-space: nowrap;\n    text-align: center;\n    line-height: 40px;\n    font-size: 18px;\n    color: #fff;\n    font-weight: normal;\n}\n.music-list .bg-image {\n    position: relative;\n    width: 100%;\n    height: 0;\n    padding-top: 70%;\n    -webkit-transform-origin: top;\n            transform-origin: top;\n    background-size: cover;\n}\n.music-list .bg-image .play-wrapper {\n      position: absolute;\n      bottom: 20px;\n      z-index: 50;\n      width: 100%;\n}\n.music-list .bg-image .play-wrapper .play {\n        -webkit-box-sizing: border-box;\n                box-sizing: border-box;\n        width: 135px;\n        padding: 7px 0;\n        margin: 0 auto;\n        text-align: center;\n        border: 1px solid #ffcd32;\n        color: #ffcd32;\n        border-radius: 100px;\n        font-size: 0;\n}\n.music-list .bg-image .play-wrapper .play .icon-play {\n          display: inline-block;\n          vertical-align: middle;\n          margin-right: 6px;\n          font-size: 16px;\n}\n.music-list .bg-image .play-wrapper .play .text {\n          display: inline-block;\n          vertical-align: middle;\n          font-size: 12px;\n}\n.music-list .bg-image .filter {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      background: rgba(7, 17, 27, 0.4);\n}\n.music-list .bg-layer {\n    position: relative;\n    height: 100%;\n    background: #222;\n}\n.music-list .list {\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    width: 100%;\n    background: #222;\n}\n.music-list .list .song-list-wrapper {\n      padding: 20px 30px;\n}\n.music-list .loading-container {\n    position: absolute;\n    width: 100%;\n    top: 60%;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%);\n}\n"],sourceRoot:""}])},kvay:function(t,i,s){"use strict";function n(t){s("5uuw")}var e=s("ORar"),a=s("4uUk"),A=s("0HdQ"),o=n,l=A(e.a,a.a,!1,o,null,null);i.a=l.exports},s3x3:function(t,i,s){"use strict";function n(t){s("Vqin")}Object.defineProperty(i,"__esModule",{value:!0});var e=s("/vD/"),a=s("bp8x"),A=s("0HdQ"),o=n,l=A(e.a,a.a,!1,o,null,null);i.default=l.exports}});
//# sourceMappingURL=0.3224a9878572c4463e89.js.map