import { Dropdown, Tooltip } from 'antd';
import React from 'react';
import { connect, Dispatch } from 'dva';
import { ConnectProps, ConnectState } from '@/models/connect';
import Avatar from './AvatarDropdown';
import SelectLang from '../SelectLang';
import styles from './index.less';
import FolderIcon from '@ant-design/icons/FolderFilled';
import ClockIcon from '@ant-design/icons/ClockCircleFilled';
import SideCollection, { sideCollectionKey } from '@/components/SideCollection';
import SnapshotList from '@/components/SnapshotList';
import style from './style.less';

export type SiderTheme = 'light' | 'dark';

export interface GlobalHeaderRightProps {
  theme?: SiderTheme;
  layout: 'sidemenu' | 'topmenu';
  dispatch: Dispatch;
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps & ConnectProps> = props => {
  const { theme, layout, dispatch } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }
  const onSideCollectionButtonClick = () => {
    dispatch({
      type: 'dialog/setDialogActive',
      payload: {
        key: sideCollectionKey,
        isActive: true,
      },
    });
  };
  return (
    <div className={className} style={{ width: '100%' }}>
      <div className={style.dragZone}></div>
      <SideCollection />
      <Dropdown overlay={<SnapshotList />}>
        <a className={styles.action}>
          <ClockIcon />
        </a>
      </Dropdown>
      <Tooltip title="收藏夹">
        <a className={styles.action} onClick={onSideCollectionButtonClick}>
          <FolderIcon />
        </a>
      </Tooltip>
      <Avatar />
      <SelectLang className={styles.action} />
    </div>
  );
};

export default connect(({ settings, dialog }: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
  dialog,
}))(GlobalHeaderRight);
