import component from './zh-CN/component';
import globalHeader from './zh-CN/globalHeader';
import menu from './zh-CN/menu';
import pwa from './zh-CN/pwa';
import settingDrawer from './zh-CN/settingDrawer';
import settings from './zh-CN/settings';

export default {
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  'app.preview.down.block': '下载此页面到本地项目',
  'app.welcome.link.fetch-blocks': '获取全部区块',
  'app.welcome.link.block-list': '基于 block 开发，快速构建标准页面',
  'list.action.add-to-snapshot.tooltip': '添加至快照',
  'list.action.add-to-snapshot.button': '添加至快照',
  'list.action.filter.tooltip': '打开过滤器',
  'list.action.filter.button': '过滤器',
  'global.order.asc': '升序',
  'global.order.desc': '降序',
  'global.filter.filter-tag.title': '已激活',
  'global.filter.filter-drawer.title': '过滤器',
  'global.filter.filter-name-search.title': '名称',
  'global.filter.filter-name-search.input.hint': '搜索名称',
  'global.filter.add': '添加',
  'global.filter.field': '字段',
  'global.filter.order': '排序',
  'global.filter.order.title': '顺序',
  'userList.filter.order.id.title': 'ID',
  'userList.filter.order.username.title': '用户名',
  'userList.filter.order.create_at.title': '创建时间',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
};
