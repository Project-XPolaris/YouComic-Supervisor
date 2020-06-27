import component from './en-US/component';
import globalHeader from './en-US/globalHeader';
import menu from './en-US/menu';
import pwa from './en-US/pwa';
import settingDrawer from './en-US/settingDrawer';
import settings from './en-US/settings';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.preview.down.block': 'Download this page to your local project',
  'app.welcome.link.fetch-blocks': 'Get all block',
  'app.welcome.link.block-list': 'Quickly build standard, pages based on `block` development',
  'list.action.add-to-snapshot.tooltip': 'Add to snapshot',
  'list.action.add-to-snapshot.button': 'Add to snapshot',
  'list.action.filter.tooltip': 'Open filter',
  'list.action.filter.button': 'Filter',
  'global.error.required-field.message': 'field must not empty!',
  'global.order.asc': 'Ascending',
  'global.order.desc': 'Descending',
  'global.filter.add': 'Add',
  'global.filter.filter-tag.title': 'Active',
  'global.filter.filter-drawer.title': 'Filter',
  'global.filter.filter-name-search.title': 'Name',
  'global.filter.filter-name-search.input.hint': 'Search name ...',
  'global.filter.field': 'Field',
  'global.filter.order': 'Order',
  'global.filter.order.title': 'Order',
  'global.modal.cancel': 'Cancel',
  'global.username': 'User name',
  'global.password': 'Password',
  'userList.filter.order.id.title': 'ID',
  'userList.filter.order.username.title': 'Username',
  'userList.filter.order.create_at.title': 'Created time',
  'userList.modal.register.title': 'Create user',
  'userList.modal.register.ok': 'Create',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
};
