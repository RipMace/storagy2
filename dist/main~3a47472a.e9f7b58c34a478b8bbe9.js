(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{18:function(t,a,i){},204:function(t,a,i){"use strict";var e=i(18);i.n(e).a},36:function(t,a,i){"use strict";var e=i(32),o=i.n(e),s=i(13),c=i(3),n=i(4),d=i(6),l=i(189),r={name:"CreateLocation",components:{TextField:d.a,ToggleField:l.a},props:{onClose:Function},data:()=>({dialog:s.MDCDialog,name:void 0,desc:void 0,notification:!0,id:o()()}),mounted(){this.dialog=new s.MDCDialog(document.getElementById(this.id))},methods:{open(){this.dialog.open()},close(){this.dialog.close()},closeAndReload(){this.name=void 0,this.desc=void 0,this.notification=!0,n.a.$emit("reloadCategories"),this.close()},save(){document.querySelector("#save-button").click()},createLocation(){Object(c.b)({name:this.name,description:this.desc,notification:this.notification}).then(()=>this.closeAndReload())}}},p=(i(204),i(1)),m=Object(p.a)(r,function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",[i("div",{on:{click:t.open}},[t._t("default")],2),t._v(" "),i("div",{staticClass:"mdc-dialog mdc-dialog-full",attrs:{id:t.id,role:"dialog","aria-modal":"true","aria-labelledby":"create storage","aria-describedby":"create storage"}},[i("div",{staticClass:"mdc-dialog__container"},[i("div",{staticClass:"mdc-dialog__surface"},[i("header",{staticClass:" mdc-top-app-bar mdc-top-app-bar--short"},[i("div",{staticClass:"mdc-top-app-bar__row"},[i("section",{staticClass:"mdc-top-app-bar__section mdc-top-app-bar__section--align-start"},[i("button",{staticClass:"material-icons mdc-top-app-bar__navigation-icon--unbounded",attrs:{type:"button"},on:{click:t.close}},[t._v("arrow_back")]),t._v(" "),i("span",{staticClass:"mdc-top-app-bar__title"},[t._v("Crea Sezione")])]),t._v(" "),i("section",{staticClass:"mdc-top-app-bar__section mdc-top-app-bar__section--align-end"},[i("button",{staticClass:"mdc-top-app-bar__action-item--unbounded",attrs:{type:"button","aria-label":"save"},on:{click:t.save}},[t._v("salva")])])])]),t._v(" "),i("div",{staticClass:"mdc-dialog__content",attrs:{id:"create-storage-content"}},[t.dialog.isOpen?i("form",{staticClass:"full-width-form",on:{submit:t.createLocation}},[i("TextField",{attrs:{placeholder:"Nome",required:"",type:"text","field-id":"name"},model:{value:t.name,callback:function(a){t.name=a},expression:"name"}}),t._v(" "),i("TextField",{attrs:{placeholder:"Descrizione",type:"text","field-id":"desc"},model:{value:t.desc,callback:function(a){t.desc=a},expression:"desc"}}),t._v(" "),i("ToggleField",{attrs:{placeholder:"Abilita Notifiche","field-id":"notification"},model:{value:t.notification,callback:function(a){t.notification=a},expression:"notification"}}),t._v(" "),i("button",{staticStyle:{visibility:"hidden"},attrs:{type:"submit",id:"save-button"}},[t._v("salva")])],1):t._e()])])]),t._v(" "),i("div",{staticClass:"mdc-dialog__scrim"})])])},[],!1,null,"c06b828a",null);a.a=m.exports}}]);
//# sourceMappingURL=main~3a47472a.e9f7b58c34a478b8bbe9.js.map