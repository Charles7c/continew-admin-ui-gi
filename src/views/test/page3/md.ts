export const mdText = `
## 菜单数据讲解

菜单数据由\`系统管理->菜单管理\`页面配置，数据结构如最左图
~~~
type === 1 为目录
type === 2 为菜单
type === 3 为按钮
~~~

## 动态路由讲解
2. \`动态路由\`数据也是从后端接口返回，接口会根据用户当前角色过滤掉没权限的路由
3. 换句话说就是接口只会返回当前用户角色权限的路由，没有权限的路由不会返回给你
4. 拿到动态路由数据后，前端进行\`排序\`和\`格式化\`，同时所有\`component\`由字符串转为真正的模块，再\`addRoute\`就完成了
5. 这里前端来做\`排序和格式化\`处理，因为前端比较熟悉格式化的数据结构，处理更为方便些

**格式化的结构如下：**
~~~js
{
  path: '', // 路由路径（必填）
  name: '', // 路由名称，由系统根据路由路径自动生成，如 /system/menu => SystemMenu
  redirect: '', // 路由重定向
  component: '', // 组件路径
  meta: {
    title: '', // 该路由在侧边栏和面包屑中展示的名字
    svgIcon: '', // 自定义图标，比icon优先级高
    icon: '', // arco 组件库内置图标
    keepAlive: false, // 是否缓存，默认false，页面的name要跟路由的name保持一致才能缓存
    hidden: true, // 默认true，设置true的时候该路由不会在侧边栏出现
    sort: '', // 排序，排序之后就用不到了，显不显示无所谓
    // 示例: activeMenu: "/data/detail"
    // 当设置了该属性进入路由时，则会高亮activeMenu属性对应的侧边栏
    // 该属性适合使用在有hidden: true属性的路由上
    activeMenu: '/data',
    breadcrumb: true, // 默认true，如果设置为false，则不会在面包屑中显示
    showInTabs: true, // 默认true，如果为false，则不会显示在页签中
    affix: false, // 默认false，如果设置为true，它则会固定在Tab栏中，例如首页
    // 当一个路由下面的children声明的路由大于1个时，自动会变成嵌套的模式
    // 只有一个时，会将那个子路由当做根路由显示在侧边栏
    // 若想不管路由下面的children声明的个数都显示你的根路由
    // 可以设置alwaysShow: true，这样就会忽略之前定义的规则，一直显示根路由
    alwaysShow: false
  }
}
~~~

## 前端处理排序格式化
~~~
// 系统用了比较多 xe-utils 工具的树方法, 代码也会比较浅显易懂
import { mapTree } from 'xe-utils'

/**
 * @description 前端来做排序、格式化
 * @params {menus} 后端返回的路由数据，已经根据当前用户角色过滤掉了没权限的路由
 * 1. 对后端返回的路由数据进行排序，格式化
 * 2. 同时将component由字符串转成真正的模块
 */
const formatAsyncRoutes = (menus: MenuItem[]) => {
  if (!menus.length) return []
  menus.sort((a, b) => (a?.sort ?? 0) - (b?.sort ?? 0)) // 排序
  const routes = mapTree(menus, (item) => {
    if (item.children && item.children.length) {
      item.children?.sort((a, b) => (a?.sort ?? 0) - (b?.sort ?? 0)) // 排序
    }
    return {
      path: item.path,
      name: transformPathToName(item.path),
      component: transformComponentView(item.component),
      redirect: item.redirect,
      meta: {
        hidden: item.hidden,
        keepAlive: item.keepAlive,
        title: item.title,
        svgIcon: item.svgIcon,
        icon: item.icon,
        affix: item.affix,
        breadcrumb: item.breadcrumb,
        showInTabs: item.showInTabs,
        activeMenu: item.activeMenu,
        alwaysShow: item.alwaysShow
      }
    }
  })
  return routes as RouteRecordRaw[]
}
~~~
`
