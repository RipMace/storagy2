(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{185:function(t,e,a){"use strict";var n=a(3),s=a(179),i=a.n(s),l=(a(215),a(10)),o=a(188),r=a(7),c={name:"Calendar",components:{VueCal:i.a,ToolbarBase:o.a,Loading:r.a},data:()=>({itemsList:[],noItems:!1,loading:!0}),methods:{getAllItems(){this.loading=!0,Object(n.e)().then(t=>{this.noItems=!t.length,this.itemsList=t.map(t=>({start:t.due,end:t.due,title:t.name,allDay:!0,content:`<div class="mdc-card item-event-card">\n                          <h3 class="item-card__subtitle mdc-typography mdc-typography--subtitle2">\n                              Quantità:  ${t.amount}\n                              <br>\n                              Sezione: ${t.locationName}\n                          </h3>\n                      </div>`,class:Object(l.a)(t.due)?"due":"standard"})),this.loading=!1})}},created(){this.getAllItems()}},d=(a(217),a(1)),u=Object(d.a)(c,function(){var t=this.$createElement,e=this._self._c||t;return this.loading?e("Loading"):e("div",[this.noItems?e("div",[this._v("\n        noItems\n    ")]):e("div",[e("ToolbarBase",{attrs:{title:"Calendario"}}),this._v(" "),e("div",{staticClass:"content-wrapper"},[e("vue-cal",{staticClass:"vuecal--green-theme",staticStyle:{height:"475px"},attrs:{time:!1,locale:"it",xsmall:"","default-view":"month",clickToNavigate:"","events-on-month-view":"short","disable-views":["years","year","week"],events:this.itemsList}})],1)],1)])},[],!1,null,null,null);e.a=u.exports},217:function(t,e,a){"use strict";var n=a(30);a.n(n).a},219:function(t,e,a){"use strict";a.r(e);var n=a(8),s={name:"App"},i=a(1),l=Object(i.a)(s,function(){var t=this.$createElement;return(this._self._c||t)("router-view")},[],!1,null,"1d1521ca",null).exports,o=a(172),r=a(3);let c="";r.c.onAuthStateChanged(()=>{c||(c=new n.default({router:o.a,render:t=>t(l)}).$mount("#app"))})},30:function(t,e,a){}}]);
//# sourceMappingURL=main~06837ae4.e9f7b58c34a478b8bbe9.js.map