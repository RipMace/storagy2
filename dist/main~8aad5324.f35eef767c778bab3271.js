(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{16:function(t,s,e){},183:function(t,s,e){"use strict";var a=e(3),i=e(5),n={name:"signUp",components:{TextField:e(6).a},data:()=>({email:"",password:""}),mounted(){new i.MDCRipple(document.querySelector("#signUp"))},methods:{signUp:function(){a.c.createUserWithEmailAndPassword(this.email,this.password).then(t=>{a.k.doc(t.user.uid).set({}),this.$router.replace("storagy/category")},t=>{alert("Oops. "+t.message)})}}},r=(e(200),e(1)),o=Object(r.a)(n,function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"login-background"},[e("div",{staticClass:"sign-up"},[t._m(0),t._v(" "),e("h3",{staticClass:"title"},[t._v("Let's create a new account!")]),t._v(" "),e("form",{staticClass:"full-width-form",on:{submit:t.signUp}},[e("TextField",{attrs:{placeholder:"Email",required:"",type:"email","field-id":"email"},model:{value:t.email,callback:function(s){t.email=s},expression:"email"}}),t._v(" "),e("TextField",{attrs:{placeholder:"Password",required:"",type:"password","field-id":"password"},model:{value:t.password,callback:function(s){t.password=s},expression:"password"}}),t._v(" "),t._m(1)],1),t._v(" "),e("p",{staticClass:"back-to-login"},[t._v("or go back to "),e("router-link",{attrs:{to:"/login"}},[t._v("login")]),t._v(".")],1)])])},[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"icon-wrapper"},[s("span",{staticClass:"mdc-list-item__graphic material-icons",attrs:{"aria-hidden":"true"}},[this._v("fastfood")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("button",{staticClass:"mdc-button--raised",attrs:{type:"submit",id:"signUp"}},[s("span",{staticClass:"mdc-button__label"},[this._v("sign up")])])}],!1,null,"09d45ae4",null);s.a=o.exports},200:function(t,s,e){"use strict";var a=e(16);e.n(a).a}}]);
//# sourceMappingURL=main~8aad5324.f35eef767c778bab3271.js.map