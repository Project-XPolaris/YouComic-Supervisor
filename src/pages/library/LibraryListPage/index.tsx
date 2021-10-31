import { Button, Modal, Table, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { DialogStateType } from '@@/plugin-dva/connect';
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  ImportOutlined,
  ReloadOutlined,
  TagOutlined,
} from '@ant-design/icons/lib';
import InputTextDialog from '@/components/InputTextDialog';
import { connect } from '@@/plugin-dva/exports';
import styles from './style.less';
import { LibraryListStateType } from './model';
import { BlockOutlined, FolderOpenFilled, FormOutlined } from '@ant-design/icons';
import { RenameWithTagDialog } from '@/components/RenameWIthTagDialog';
import { Library } from '@/services/library';

const { confirm } = Modal;

interface LibraryListPageProps {
  libraryList: LibraryListStateType;
  dispatch: any;
  loading: boolean;
  dialog: DialogStateType;
}

export const LibraryListImportExternalLibraryDialogKey = 'libraryList/import';
export const LibraryListImportDirectoryDialogKey = 'libraryList/importDirectory';
const LibraryListPage = ({ libraryList, loading, dispatch, dialog }: LibraryListPageProps) => {
  useEffect(() => {
    dispatch({
      type: 'libraryList/queryLibrary',
    });
  }, []);
  const onImportLibraryClick = () => {
    dispatch({
      type: 'dialog/setDialogActive',
      payload: {
        key: LibraryListImportExternalLibraryDialogKey,
        isActive: true,
      },
    });
  };
  const onImportLibraryDialogCancel = () => {
    dispatch({
      type: 'dialog/setDialogActive',
      payload: {
        key: LibraryListImportExternalLibraryDialogKey,
        isActive: false,
      },
    });
  };
  const onImportDirectoryClick = () => {
    dispatch({
      type: 'dialog/setDialogActive',
      payload: {
        key: LibraryListImportDirectoryDialogKey,
        isActive: true,
      },
    });
  };
  const onImportDirectoryDialogCancel = () => {
    dispatch({
      type: 'dialog/setDialogActive',
      payload: {
        key: LibraryListImportDirectoryDialogKey,
        isActive: false,
      },
    });
  };
  const onLibraryDelete = (libraryName: string | undefined, id: string | undefined) => {
    confirm({
      title: '删除确认',
      icon: <DeleteOutlined />,
      okType: 'danger',
      content: `即将删除书库 [${libraryName}] ,该操作会解除系统与书库的关联，但不会删除文件。可以通过再次关联以重新导入。`,
      onOk() {
        dispatch({
          type: 'libraryList/removeLibrary',
          payload: {
            id,
          },
        });
      },
    });
  };
  const extraAction = (
    <>
      <Button onClick={onImportLibraryClick} icon={<ImportOutlined />}>
        导入
      </Button>
      <Button onClick={onImportDirectoryClick} icon={<ImportOutlined />}>
        添加文件夹并扫描
      </Button>
    </>
  );
  const onImportLibraryDialogOK = (path: string) => {
    dispatch({
      type: 'libraryList/importExternalLibrary',
      payload: {
        path,
      },
    });
  };
  const onImportDirectoryDialogOK = (path: string) => {
    dispatch({
      type: 'libraryList/importDirectory',
      payload: {
        path,
      },
    });
  };
  const onScanLibrary = (id: string | undefined) => {
    if (!id) {
      return;
    }
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: '扫描当前库',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'libraryList/scanLibrary',
          payload: {
            id,
          },
        });
      },
    });
  };
  const onMatchLibrary = (id: string | undefined) => {
    if (!id) {
      return;
    }
    Modal.confirm({
      title: '添加匹配任务确认',
      icon: <ExclamationCircleOutlined />,
      content: '将会匹配当前库中所有的标签',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'libraryList/matchLibrary',
          payload: {
            id,
          },
        });
      },
    });
  };
  const onWriteToMeta = (id: string | undefined) => {
    if (!id) {
      return;
    }
    Modal.confirm({
      title: '创建写入元数据任务',
      icon: <ExclamationCircleOutlined />,
      content: '将会把标题、原始信息等写入，请确认',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'libraryList/newWriteBookMetaTask',
          payload: {
            id,
          },
        });
      },
    });
  };
  const onGenerateThumbnails = (id: string | undefined) => {
    if (!id) {
      return;
    }
    Modal.confirm({
      title: '添加缩略图生成任务确认',
      icon: <ExclamationCircleOutlined />,
      content: '将会添加生成缩略图任务',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'libraryList/newGenerateThumbnailsTask',
          payload: {
            id,
          },
        });
      },
    });
  };
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: 120,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 160,
    },
    {
      title: 'Path',
      dataIndex: 'path',
      key: 'path',
      width: 480,
    },
    {
      title: 'action',
      align: 'right',
      render: (_, record: Library) => {
        return (
          <div>
            <Tooltip title="扫描">
              <Button
                className={styles.actionIcon}
                icon={<ReloadOutlined key="scan" />}
                onClick={() => onScanLibrary(record.id.toString())}
                type={'primary'}
                shape={'circle'}
              />
            </Tooltip>
            <Tooltip title="批量匹配标签">
              <Button
                className={styles.actionIcon}
                icon={<TagOutlined key="scan" />}
                onClick={() => onMatchLibrary(record.id.toString())}
                type={'primary'}
                shape={'circle'}
              />
            </Tooltip>
            <Tooltip title="批量更改文件夹名称">
              <Button
                className={styles.actionIcon}
                icon={<FolderOpenFilled key="scan" />}
                onClick={() =>
                  dispatch({
                    type: 'libraryList/openRenameDialog',
                    payload: { library: record },
                  })
                }
                type={'primary'}
                shape={'circle'}
              />
            </Tooltip>
            <Tooltip title="写入元信息">
              <Button
                className={styles.actionIcon}
                icon={<FormOutlined key="scan" />}
                onClick={() => onWriteToMeta(record.id.toString())}
                type={'primary'}
                shape={'circle'}
              />
            </Tooltip>
            <Tooltip title="生成缩略图">
              <Button
                className={styles.actionIcon}
                icon={<BlockOutlined key="scan" />}
                onClick={() => onGenerateThumbnails(record.id.toString())}
                type={'primary'}
                shape={'circle'}
              />
            </Tooltip>
            <Tooltip title="删除">
              <Button
                className={styles.actionIcon}
                icon={<DeleteOutlined key="scan" />}
                onClick={() => onLibraryDelete(record.name, record.id.toString())}
                type={'primary'}
                shape={'circle'}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];
  return (
    <PageHeaderWrapper subTitle="书库将书籍文件书籍集合管理" extra={extraAction}>
      <InputTextDialog
        visible={Boolean(dialog.dialogs[LibraryListImportExternalLibraryDialogKey])}
        onCreate={onImportLibraryDialogOK}
        onCancel={onImportLibraryDialogCancel}
        inputLabel="路径"
        dialogTitle="导入外部库"
      />
      <InputTextDialog
        visible={Boolean(dialog.dialogs[LibraryListImportDirectoryDialogKey])}
        onCreate={onImportDirectoryDialogOK}
        onCancel={onImportDirectoryDialogCancel}
        inputLabel="路径"
        dialogTitle="导入文件夹"
      />
      <RenameWithTagDialog
        isOpen={libraryList.isRenameDialogOpen}
        onOk={(pattern, slots) => {
          if (libraryList.contextLibrary) {
            dispatch({
              type: 'libraryList/newRenameLibraryBookDirectory',
              payload: { pattern, slots, id: libraryList.contextLibrary.id },
            });
          }
        }}
        onCancel={() => dispatch({ type: 'libraryList/closeRenameDialog' })}
      />
      <div className={styles.tableContainer}>
        <Table columns={columns} dataSource={libraryList.libraryList} />
      </div>
    </PageHeaderWrapper>
  );
};

export default connect(
  ({
    libraryList,
    loading,
    dialog,
  }: {
    libraryList: LibraryListStateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
    dialog: DialogStateType;
  }) => ({
    libraryList,
    loading: loading.models.libraryList,
    dialog,
  }),
)(LibraryListPage);
