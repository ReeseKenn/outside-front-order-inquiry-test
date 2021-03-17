import Vue from "vue";
import App from "./App.vue";

import { Input, Button, Table, TableColumn, Image, Message } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";
// 设置语言
locale.use(lang);
Vue.use(Input);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Image);
Vue.prototype.$message = Message;

import axios from "axios";
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
