import { Avatar, Button, Card, List, Modal } from 'antd';
import React, { useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { DialogStateType } from '@@/plugin-dva/connect';
import {
  BookOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  ImportOutlined,
  ReloadOutlined,
  TagOutlined,
} from '@ant-design/icons/lib';
import InputTextDialog from '@/components/InputTextDialog';
import { connect } from '@@/plugin-dva/exports';
import styles from './style.less';
import { LibraryItemViewModel } from './data.d';
import { LibraryListStateType } from './model';

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
      <div className={styles.cardList}>
        <List<Partial<LibraryItemViewModel>>
          rowKey="id"
          loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={[...libraryList.libraryList]}
          renderItem={item => {
            return (
              <List.Item key={item.id}>
                <Card
                  className={styles.card}
                  actions={[
                    <DeleteOutlined
                      key="delete"
                      onClick={() => onLibraryDelete(item.name, item.id)}
                    />,
                    <ReloadOutlined key="scan" onClick={() => onScanLibrary(item.id)} />,
                    <TagOutlined key="match" onClick={() => onMatchLibrary(item.id)} />,
                  ]}
                >
                  <Card.Meta avatar={<Avatar icon={<BookOutlined />} />} title={item.name} />
                  <p>{item.path}</p>
                </Card>
              </List.Item>
            );
          }}
        />
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
