webpackJsonp([6],{"+DU1":function(t,e,r){"use strict";var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"search"},[r("div",{staticClass:"search-box-wrapper"},[r("search-box",{ref:"searchBox",on:{query:t.onQueryChange}})],1),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:!t.query,expression:"!query"}],ref:"shortcutWrapper",staticClass:"shortcut-wrapper"},[r("scroll",{ref:"shortcut",staticClass:"shortcut",attrs:{data:t.shortcutList,refreshDelay:t.refreshDelay}},[r("div",[r("div",{staticClass:"hot-key"},[r("h1",{staticClass:"title"},[t._v("热门搜索")]),t._v(" "),r("ul",t._l(t.hotKey,function(e){return r("li",{staticClass:"item",on:{click:function(r){t.addQuery(e.k)}}},[r("span",[t._v(t._s(e.k))])])}))]),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:t.searchHistory.length,expression:"searchHistory.length"}],staticClass:"search-history"},[r("h1",{staticClass:"title"},[r("span",{staticClass:"text"},[t._v("搜索历史")]),t._v(" "),r("span",{staticClass:"clear",on:{click:t.showConfirm}},[r("i",{staticClass:"icon-clear"})])]),t._v(" "),r("search-list",{attrs:{searches:t.searchHistory},on:{select:t.addQuery,deleteItem:t.deleteSearchHistory}})],1)])])],1),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:t.query,expression:"query"}],ref:"searchResult",staticClass:"search-result"},[r("search-result",{ref:"suggest",attrs:{query:t.query},on:{listScroll:t.blurInput,select:t.saveSearch}})],1),t._v(" "),r("confirm",{ref:"confirm",attrs:{text:"是否清空所有搜索历史",confirmBtnText:"清空"},on:{confirm:t.clearSearchHistory}}),t._v(" "),r("router-view")],1)},o=[],a={render:s,staticRenderFns:o};e.a=a},"2gtq":function(t,e,r){"use strict";var s=r("4YfN"),o=r.n(s),a=r("2X+S"),c=r("qwAB"),n=r("gyMJ"),i=r("T452"),h=r("ZnRs"),A=r("B23u"),p=r("HVJf"),l=r("XEAW"),u=r("F4+m");e.a={mixins:[u.c,u.b],data:function(){return{hotKey:[]}},computed:{shortcutList:function(){return this.hotKey.concat(this.searchHistory)}},created:function(){this.getHostKey()},methods:o()({},r.i(p.c)(["clearSearchHistory"]),{handlePlayList:function(t){var e=t.length>0?"60px":"";this.$refs.searchResult.style.bottom=e,this.$refs.suggest.refresh(),this.$refs.shortcutWrapper.style.bottom=e,this.$refs.shortcut.refresh()},showConfirm:function(){this.$refs.confirm.show()},onQueryChange:function(t){this.query=t},getHostKey:function(){var t=this;r.i(n.g)().then(function(e){e.code===i.a&&(t.hotKey=e.data.hotkey.slice(0,11))})}}),watch:{query:function(t){var e=this;t||setTimeout(function(){e.$refs.shortcut.refresh()},20)}},components:{searchBox:a.a,scroll:c.a,searchResult:h.a,searchList:A.a,Confirm:l.a}}},WumD:function(t,e,r){var s=r("uSKf");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);r("8bSs")("4bc30ed7",s,!0)},YOyO:function(t,e,r){"use strict";function s(t){r("WumD")}Object.defineProperty(e,"__esModule",{value:!0});var o=r("2gtq"),a=r("+DU1"),c=r("0HdQ"),n=s,i=c(o.a,a.a,!1,n,null,null);e.default=i.exports},uSKf:function(t,e,r){e=t.exports=r("BkJT")(!0),e.push([t.i,'.search .search-box-wrapper{margin:20px}.search .shortcut-wrapper{position:fixed;top:178px;bottom:0;width:100%}.search .shortcut-wrapper .shortcut{height:100%;overflow:hidden}.search .shortcut-wrapper .shortcut .hot-key{margin:0 20px 20px}.search .shortcut-wrapper .shortcut .hot-key .title{margin-bottom:20px;font-size:14px;color:hsla(0,0%,100%,.5)}.search .shortcut-wrapper .shortcut .hot-key .item{display:inline-block;padding:5px 10px;margin:0 20px 10px 0;border-radius:6px;background:#333;font-size:14px;color:hsla(0,0%,100%,.3)}.search .shortcut-wrapper .shortcut .search-history{position:relative;margin:0 20px}.search .shortcut-wrapper .shortcut .search-history .title{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:40px;font-size:15px;color:hsla(0,0%,100%,.5)}.search .shortcut-wrapper .shortcut .search-history .title .text{-webkit-box-flex:1;-ms-flex:1;flex:1}.search .shortcut-wrapper .shortcut .search-history .title .clear{position:relative}.search .shortcut-wrapper .shortcut .search-history .title .clear:before{content:"";position:absolute;top:-10px;left:-10px;right:-10px;bottom:-10px}.search .shortcut-wrapper .shortcut .search-history .title .clear .icon-clear{font-size:15px;color:hsla(0,0%,100%,.3)}.search .search-result{position:fixed;width:100%;top:178px;bottom:0}',"",{version:3,sources:["C:/Users/hxsd/Desktop/vuemusic/src/components/search/search.vue"],names:[],mappings:"AACA,4BACE,WAAa,CACd,AACD,0BACE,eAAgB,AAChB,UAAW,AACX,SAAU,AACV,UAAY,CACb,AACD,oCACI,YAAa,AACb,eAAiB,CACpB,AACD,6CACM,kBAAyB,CAC9B,AACD,oDACQ,mBAAoB,AACpB,eAAgB,AAChB,wBAAgC,CACvC,AACD,mDACQ,qBAAsB,AACtB,iBAAkB,AAClB,qBAAsB,AACtB,kBAAmB,AACnB,gBAAiB,AACjB,eAAgB,AAChB,wBAAgC,CACvC,AACD,oDACM,kBAAmB,AACnB,aAAe,CACpB,AACD,2DACQ,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,YAAa,AACb,eAAgB,AAChB,wBAAgC,CACvC,AACD,iEACU,mBAAoB,AAChB,WAAY,AACR,MAAQ,CACzB,AACD,kEACU,iBAAmB,CAC5B,AACD,yEACY,WAAY,AACZ,kBAAmB,AACnB,UAAW,AACX,WAAY,AACZ,YAAa,AACb,YAAc,CACzB,AACD,8EACY,eAAgB,AAChB,wBAAgC,CAC3C,AACD,uBACE,eAAgB,AAChB,WAAY,AACZ,UAAW,AACX,QAAU,CACX",file:"search.vue",sourcesContent:["\n.search .search-box-wrapper {\n  margin: 20px;\n}\n.search .shortcut-wrapper {\n  position: fixed;\n  top: 178px;\n  bottom: 0;\n  width: 100%;\n}\n.search .shortcut-wrapper .shortcut {\n    height: 100%;\n    overflow: hidden;\n}\n.search .shortcut-wrapper .shortcut .hot-key {\n      margin: 0 20px 20px 20px;\n}\n.search .shortcut-wrapper .shortcut .hot-key .title {\n        margin-bottom: 20px;\n        font-size: 14px;\n        color: rgba(255, 255, 255, 0.5);\n}\n.search .shortcut-wrapper .shortcut .hot-key .item {\n        display: inline-block;\n        padding: 5px 10px;\n        margin: 0 20px 10px 0;\n        border-radius: 6px;\n        background: #333;\n        font-size: 14px;\n        color: rgba(255, 255, 255, 0.3);\n}\n.search .shortcut-wrapper .shortcut .search-history {\n      position: relative;\n      margin: 0 20px;\n}\n.search .shortcut-wrapper .shortcut .search-history .title {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        height: 40px;\n        font-size: 15px;\n        color: rgba(255, 255, 255, 0.5);\n}\n.search .shortcut-wrapper .shortcut .search-history .title .text {\n          -webkit-box-flex: 1;\n              -ms-flex: 1;\n                  flex: 1;\n}\n.search .shortcut-wrapper .shortcut .search-history .title .clear {\n          position: relative;\n}\n.search .shortcut-wrapper .shortcut .search-history .title .clear:before {\n            content: '';\n            position: absolute;\n            top: -10px;\n            left: -10px;\n            right: -10px;\n            bottom: -10px;\n}\n.search .shortcut-wrapper .shortcut .search-history .title .clear .icon-clear {\n            font-size: 15px;\n            color: rgba(255, 255, 255, 0.3);\n}\n.search .search-result {\n  position: fixed;\n  width: 100%;\n  top: 178px;\n  bottom: 0;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=6.a8e60197085a97ec8f19.js.map