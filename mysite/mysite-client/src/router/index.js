import Vue from "vue";
import VueRouter from "vue-router";  // 导入vue-router插件
import routes from "./routes";
import { titleController } from "@/utils";

if (!window.VueRouter) {
  // 使用一个vue插件
  Vue.use(VueRouter); 
}

const originalPush = VueRouter.prototype.push
 
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 路由的实例
const router = new VueRouter({
  // 配置
  routes, // 路由匹配规则
  mode: "history",  // 路由匹配模式
});

router.afterEach((to, from) => {
  if (to.meta.title) {
    titleController.setRouteTitle(to.meta.title);
  }
});

export default router;
