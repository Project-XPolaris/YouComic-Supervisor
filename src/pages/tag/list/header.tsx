import React from 'react';
import { connect, Dispatch } from 'dva';
import { Button, Dropdown, Menu, message, Tooltip, Modal } from 'antd';
import FilterIcon from '@ant-design/icons/FilterFilled';
import AddIcon from '@ant-design/icons/PlusOutlined';
import CameraIcon from '@ant-design/icons/CameraFilled';
import { setDialogActive } from '@/utils/dialog';
import MenuIcon from '@ant-design/icons/MenuOutlined';
import { ConnectState } from '@/models/connect';
import { TagListModelStateType } from '@/pages/tag/list/model';
import RemoveTagIcon from '@ant-design/icons/DeleteFilled';
import AddToCollectionIcon from '@ant-design/icons/FolderFilled';
import { ClearOutlined } from '@ant-design/icons';


export const createTagSnapshotKey = 'tagList/createTagSnapshotDialog';
export const tagFilterDrawerKey = 'tagList/tagFilterDrawer';
export const addTagDialogKey = 'tagList/addTagDialog';

const { confirm } = Modal;

interface TagListHeaderPropsType {
  dispatch: Dispatch,
  tagList: TagListModelStateType
}

function TagListHeader({ dispatch, tagList }: TagListHeaderPropsType) {
  const { selectedTags } = tagList;
  const onFilterActiveButtonClick = () => setDialogActive({ dispatch, dialogName: tagFilterDrawerKey, isActive: true });
  const onAddTagClick = () => {
    dispatch({
      type: 'dialog/setDialogActive',
      payload: {
        key: addTagDialogKey,
        isActive: true,
      },
    });
  };
  const onAddToCollection = () => {
    if (tagList.selectedTags.length === 0) {
      return;
    }
    dispatch({
      type: 'sideCollection/addTagsToCollection',
      payload: {
        tags: tagList.selectedTags,
      },
    });
    message.info(`添加${tagList.selectedTags.length}至集合`);
  };
  const onDelete = () => {
    confirm({
      title: '删除确认',
      content: `将删除${selectedTags.length}项`,
      onOk: () => {
        dispatch({
          type: 'tagList/deleteTags',
          payload: {
            tags: selectedTags,
          },
        });
      },
    });
  };
  const onClearEmptyTagHandler = () => {
    confirm({
      title: '确认',
      content: `会清理掉无书籍的标签`,
      onOk: () => {
        dispatch({
          type: 'tagList/clearEmptyTag',
        });
      },
    });
  };
  const menu = (
    <Menu>
      <Menu.Item key='4' onClick={onAddToCollection}>
        <AddToCollectionIcon />
        添加至集合
      </Menu.Item>
      <Menu.Item key='5' onClick={onDelete}>
        <RemoveTagIcon />
        删除
      </Menu.Item>
    </Menu>
  );
  const onOpenCreateSnapshotClick = () => setDialogActive({
    dispatch,
    dialogName: createTagSnapshotKey,
    isActive: true,
  });
  return (
    <>
      {
        selectedTags.length > 0 &&
        <Dropdown overlay={menu}>
          <Button type='primary'>
            {`已选${selectedTags.length}项`} <MenuIcon />
          </Button>
        </Dropdown>
      }
      <Button type='primary' onClick={onFilterActiveButtonClick} key={1} icon={<FilterIcon />}>过滤器</Button>,
      <Button onClick={onAddTagClick} key={2} icon={<AddIcon />}>添加标签</Button>,
      <Tooltip title='将当前的结果保存至快照' key={3}>
        <Button onClick={onOpenCreateSnapshotClick} icon={<CameraIcon />}>添加至快照</Button>
      </Tooltip>
      <Button onClick={onClearEmptyTagHandler} icon={<ClearOutlined />}>清理空标签</Button>
    </>
  );
}

export default connect(({ tagList }: ConnectState) => ({ tagList }))(TagListHeader);
