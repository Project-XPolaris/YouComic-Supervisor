import {Dropdown, Tooltip} from 'antd';
import React from 'react';
import {connect, Dispatch} from 'dva';
import {ConnectProps, ConnectState} from '@/models/connect';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import SelectLang from '../SelectLang';
import styles from './index.less';
import FolderIcon from '@ant-design/icons/FolderFilled'
import ClockIcon from '@ant-design/icons/ClockCircleFilled'
import SideCollection, {sideCollectionKey} from "@/components/SideCollection";
import {DialogStateType} from "@/models/dialog";
import SnapshotList from "@/components/SnapshotList";

export type SiderTheme = 'light' | 'dark';

export interface GlobalHeaderRightProps extends ConnectProps {
  theme?: SiderTheme;
  layout: 'sidemenu' | 'topmenu';
  dispatch:Dispatch
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const {theme, layout,dispatch} = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }
  const onSideCollectionButtonClick = () => {
    dispatch({
      type:"dialog/setDialogActive",
      payload:{
        key:sideCollectionKey,
        isActive:true
      }
    })
  };
  return (
    <div className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="umi ui"
        options={[
          {label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>, value: 'umi ui'},
          {
            label: <a href="next.ant.design">Ant Design</a>,
            value: 'Ant Design',
          },
          {
            label: <a href="https://protable.ant.design/">Pro Table</a>,
            value: 'Pro Table',
          },
          {
            label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
            value: 'Pro Layout',
          },
        ]}
        // onSearch={value => {
        //   //console.log('input', value);
        // }}
      />
      <SideCollection/>
      <Dropdown overlay={<SnapshotList />}>
        <a className="ant-dropdown-link" href="#">
          <ClockIcon />
        </a>
      </Dropdown>
      <Tooltip title="收藏夹">
        <a
          className={styles.action}
          onClick={onSideCollectionButtonClick}
        >
          <FolderIcon/>
        </a>
      </Tooltip>
      <Avatar/>
      <SelectLang className={styles.action}/>
    </div>
  );
};

export default connect(({settings,dialog}: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
  dialog
}))(GlobalHeaderRight);
