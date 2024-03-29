import React from 'react';
import { Button, Divider, Empty, Typography } from 'antd';
import styles from './style.less';
import { connect, Dispatch } from 'dva';
import { ConnectState, GlobalModelState } from '@/models/connect';
import ListIcon from '@ant-design/icons/UnorderedListOutlined';
import DeleteIcon from '@ant-design/icons/DeleteFilled';
import BookIcon from '@ant-design/icons/BookFilled';
import TagIcon from '@ant-design/icons/TagFilled';
import UserIcon from '@ant-design/icons/UserOutlined';
import { history } from '@@/core/umiExports';

const { Text } = Typography;

interface SnapshotListPropsType {
  global: GlobalModelState;
  dispatch: Dispatch;
}

const iconMapping = {
  list: <ListIcon />,
  bookList: <BookIcon />,
  tagList: <TagIcon />,
  userList: <UserIcon />,
};
const typeMapping = {
  bookList: '书籍列表',
  tagList: '标签列表',
  userList: '用户列表',
};
const SnapshotList = ({ global, dispatch }: SnapshotListPropsType) => {
  const renderItems = () => {
    if (global.snapshots.length === 0) {
      return (
        <div className={styles.emptyContainer}>
          <Empty description="没有快照" />
        </div>
      );
    }
    return global.snapshots.map((snapshot, idx) => {
      const onDelete = () => {
        dispatch({
          type: 'global/removeSnapshot',
          payload: {
            ids: [snapshot.id],
          },
        });
      };
      const onLinkClick = () => {
        history.push(snapshot.url);
      };
      return (
        <div className={styles.itemContainer} key={idx}>
          <div className={styles.itemContent}>
            <a className={styles.text} onClick={onLinkClick}>
              <span className={styles.icon}>{iconMapping[snapshot.icon]}</span>
              <div>
                <div className={styles.name}>{snapshot.name}</div>
                <div className={styles.type}>{typeMapping[snapshot.type]}</div>
              </div>
            </a>
            <div className={styles.itemAction}>
              <Button shape="circle" icon={<DeleteIcon />} onClick={onDelete} />
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Text className={styles.title}>快照</Text>
      </div>
      <Divider className={styles.divider} />
      {renderItems()}
    </div>
  );
};
export default connect(({ global }: ConnectState) => ({ global }))(SnapshotList);
