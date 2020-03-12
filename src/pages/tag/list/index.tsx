import React from 'react';
import {Button, Card, Divider, message, Modal, Table, Tooltip} from "antd";
import {Tag} from "@/services/tag";
import {ColumnProps} from "antd/es/table/Column";
import {connect, Dispatch} from 'dva'
import {ConnectState} from "@/models/connect";
import {TagListModelStateType} from "@/pages/tag/list/model";
import moment from "moment"
import styles from './style.less'
import UpdateTagDialog from "@/pages/tag/list/components/UpdateTagDialog";
import {DialogStateType} from "@/models/dialog";
import {TablePaginationConfig} from "antd/es/table";
import AddTagDialog from "@/pages/tag/list/components/AddTagDialog";
import {Link} from "umi";
import {TableRowSelection} from "antd/es/table/interface";
import {updateQueryParamAndReplaceURL} from "@/utils/uri";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import {setDialogActive} from "@/utils/dialog";
import TagFilterDrawer from "@/pages/tag/list/components/TagFilterDrawer";
import FilterIcon from '@ant-design/icons/FilterFilled'
import AddIcon from '@ant-design/icons/PlusOutlined'
import CameraIcon from '@ant-design/icons/CameraFilled'
import SnapshotDialog from "@/components/SnapshotDialog";
import {Snapshot} from "@/services/snapshot";
import {generateSnapshotId} from "@/utils/utils";

const {confirm} = Modal;

const updateTagDialogKey = "tagList/updateTagDialog";
const addTagDialogKey = "tagList/addTagDialog";
const tagFilterDrawerKey = "tagList/tagFilterDrawer";
const createTagSnapshotKey = "tagList/createTagSnapshotDialog";

interface TagListPagePropsType {
  tagList: TagListModelStateType
  dialog: DialogStateType
  dispatch: Dispatch
}

const TagListPage = ({tagList, dialog, dispatch}: TagListPagePropsType) => {
  const {tags, page, pageSize, count, filter} = tagList;
  const {dialogs} = dialog;
  const onUpdateTagDialogCancel = () => {
    dispatch({
      type: "dialog/setDialogActive",
      payload: {
        key: updateTagDialogKey,
        isActive: false
      }
    })
  };
  const onUpdateTagClick = (tag: Tag) => {
    dispatch({
      type: "tagList/setUpdateTag",
      payload: {
        tag
      }
    });
    dispatch({
      type: "dialog/setDialogActive",
      payload: {
        key: updateTagDialogKey,
        isActive: true
      }
    })
  };
  const onUpdateTag = (name: string, type: string) => {
    dispatch({
      type: "tagList/updateTag",
      payload: {
        name, type
      }
    })
  };

  const onAddTagDialogCancel = () => {
    dispatch({
      type: "dialog/setDialogActive",
      payload: {
        key: addTagDialogKey,
        isActive: false
      }
    })
  };
  const onAddTagClick = () => {
    dispatch({
      type: "dialog/setDialogActive",
      payload: {
        key: addTagDialogKey,
        isActive: true
      }
    })
  };
  const tableItem: ColumnProps<Tag>[] = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id"
    },
    {
      key: "name",
      title: "名称",
      dataIndex: "name",
      render: (value: string, record: Tag) => <Link to={`/tag/${record.id}`}>{value}</Link>
    },
    {
      key: "type",
      title: "类别",
      dataIndex: "type"
    },
    {
      key: "created_at",
      title: "创建时间",
      dataIndex: "created_at",
      render: (value: Date) => moment(value).format("YYYY-MM-DD hh:mm:ss")
    },
    {
      key: "updated_at",
      title: "最后一次修改",
      dataIndex: "updated_at",
      render: (value: Date) => moment(value).format("YYYY-MM-DD hh:mm:ss")
    },
    {
      key: "id",
      title: "操作",
      dataIndex: "id",
      render: (_, record: Tag) => {
        const onUpdateClick = () => {
          onUpdateTagClick(record)
        };
        const onDeleteTagClick = () => {
          confirm({
            title: '删除当前标签',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
              dispatch({
                type: "tagList/deleteTags",
                payload: {
                  tags: [record,]
                }
              })
            },
          });
        };
        return (
          <div>
            <Button className={styles.actionButton} onClick={onUpdateClick} type="link">修改</Button>
            <Divider type="vertical"/>
            <Button type="link" className={styles.actionButton} onClick={onDeleteTagClick}>删除</Button>
          </div>
        )
      }
    }
  ];
  const tablePagination: TablePaginationConfig = {
    current: page,
    pageSize,
    total: count,
    onChange: (toPage: number, toPageSize?: number) => {
      updateQueryParamAndReplaceURL({
        page: toPage,
        pageSize: toPageSize
      })
    }
  };
  const onAddTag = (name: string, type: string) => {
    dispatch({
      type: "tagList/createTag",
      payload: {
        name, type
      }
    })
  };
  const rowSelection: TableRowSelection<Tag> = {
    selectedRowKeys: tagList.selectedTags.map((tag: Tag) => (tag.id)),
    onChange: (keys, selectedRows) => {
      dispatch({
        type: "tagList/setSelectTags",
        payload: {
          tags: selectedRows
        }
      })
    }
  };
  const renderMultipleSelect = () => {
    const onAddToCollection = () => {
      if (tagList.selectedTags.length === 0) {
        return
      }
      dispatch({
        type: "sideCollection/addTagsToCollection",
        payload: {
          tags: tagList.selectedTags
        }
      });
      message.info(`添加${tagList.selectedTags.length}至集合`)
    };
    return (
      <div>
        <Button type="primary" onClick={onAddToCollection}>添加至集合</Button>
      </div>
    )
  };
  const onOpenCreateSnapshotClick = () => setDialogActive({dispatch,dialogName:createTagSnapshotKey,isActive:true});
  const renderHeaderAction = () => {
    const onFilterActiveButtonClick = () => setDialogActive({dispatch, dialogName: tagFilterDrawerKey, isActive: true});
    return [
      <Button type="primary" onClick={onFilterActiveButtonClick} key={1} icon={<FilterIcon/>}>过滤器</Button>,
      <Button onClick={onAddTagClick} key={2} icon={<AddIcon/>}>添加标签</Button>,
      <Tooltip title="将当前的结果保存至快照" key={3}>
        <Button onClick={onOpenCreateSnapshotClick} icon={<CameraIcon/>}>添加至快照</Button>
      </Tooltip>
    ]
  };
  const renderTagFilterDrawer = () => {
    const onDrawerClose = () => {
      setDialogActive({dispatch, dialogName: tagFilterDrawerKey, isActive: false})
    };
    return (
      <TagFilterDrawer onClose={onDrawerClose} isOpen={Boolean(dialogs[tagFilterDrawerKey])} filter={filter}/>
    )
  };
  const renderSnapshotModal = () => {
    const onClose = () => setDialogActive({dispatch,dialogName:createTagSnapshotKey,isActive:false});
    const onOk = (name:string) => {
      const snapshot: Snapshot = {
        id:generateSnapshotId(),
        icon: "list",
        name,
        url: window.location.pathname + window.location.search,
        extra: {},
        type:"tagList"
      };
      dispatch({
        type: "global/addSnapshots",
        payload: {
          snapshotList: [snapshot,]
        }
      });
      onClose();
    };

    return (
      <SnapshotDialog onOk={onOk} onClose={onClose} isOpen={Boolean(dialogs[createTagSnapshotKey])}/>
    )
  };
  return (
    <PageHeaderWrapper extra={renderHeaderAction()}>
      {renderSnapshotModal()}
      {renderTagFilterDrawer()}
      <UpdateTagDialog
        onUpdate={onUpdateTag}
        tag={tagList.updateTag}
        onCancel={onUpdateTagDialogCancel}
        isOpen={Boolean(dialogs[updateTagDialogKey])}
      />
      <AddTagDialog onAdd={onAddTag} onCancel={onAddTagDialogCancel} isOpen={Boolean(dialogs[addTagDialogKey])}/>
      <Card>
        {tagList.selectedTags.length > 0 && renderMultipleSelect()}
        <Table
          dataSource={tags}
          columns={tableItem}
          pagination={tablePagination}
          rowKey={(tag: Tag) => (tag.id)}
          rowSelection={rowSelection}
        />
      </Card>
    </PageHeaderWrapper>
  );
};
export default connect(({tagList, dialog}: ConnectState) => ({tagList, dialog}))(TagListPage)
