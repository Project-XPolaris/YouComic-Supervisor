import React from 'react';
import { Button, Card, Descriptions, Form, Input } from 'antd';
import { ConnectState } from '@/models/connect';
import { DetailModelStateType } from '@/pages/book/detail/model';
import { getBookTagInfo } from '@/utils/book';
import moment from 'moment';
import { BookDetailInfoStateType } from '@/pages/book/detail/info/model';
import UploadCoverButton from '@/pages/book/detail/info/components/UploadCoverButton';
import { useForm } from 'antd/es/form/Form';
import { Dispatch } from '@@/plugin-dva/connect';
import { connect } from '@@/plugin-dva/exports';
import styles from './style.less';

interface BookDetailInfoPropsType {
  bookDetail: DetailModelStateType;
  dispatch: Dispatch;
  bookDetailInfo: BookDetailInfoStateType;
}

function BookDetailInfo({ bookDetail, dispatch, bookDetailInfo }: BookDetailInfoPropsType) {
  const [form] = useForm();
  const { activeEditMode } = bookDetailInfo;
  const onEditFinish = (values: any) => {
    dispatch({
      type: 'bookDetailInfo/updateBook',
      payload: values,
    });
  };
  const { book } = bookDetail;
  const { author, series, theme, translator } = getBookTagInfo(book);
  const setFormFieldValue = () => {
    form.setFields([
      {
        name: 'name',
        value: book?.name,
      },
      {
        name: 'author',
        value: author?.name,
      },
      {
        name: 'series',
        value: series?.name,
      },
      {
        name: 'theme',
        value: theme?.name,
      },
      {
        name: 'translator',
        value: translator?.name,
      },
    ]);
  };
  const onEditClick = () => {
    setFormFieldValue();
    dispatch({
      type: 'bookDetailInfo/setEditMode',
      payload: {
        editMode: true,
      },
    });
  };
  const onCancelEdit = () => {
    dispatch({
      type: 'bookDetailInfo/setEditMode',
      payload: {
        editMode: false,
      },
    });
  };
  const onSubmitClick = () => {
    form.submit();
  };
  return (
    <div>
      <Card className={styles.main}>
        <div className={styles.infoCardHeader}>
          {activeEditMode ? (
            <div>
              <Button type="primary" onClick={onSubmitClick}>
                应用
              </Button>
              <Button onClick={onCancelEdit}>取消</Button>
            </div>
          ) : (
            <div>
              <Button type="primary" onClick={onEditClick}>
                编辑
              </Button>
            </div>
          )}
        </div>
        <Form form={form} onFinish={onEditFinish}>
          <Descriptions bordered>
            <Descriptions.Item label="ID">{book?.id}</Descriptions.Item>
            <Descriptions.Item label="标题">
              {activeEditMode ? (
                <Form.Item name="name">
                  <Input />
                </Form.Item>
              ) : (
                book?.name
              )}
            </Descriptions.Item>
            <Descriptions.Item label="作者">{author?.name}</Descriptions.Item>
            <Descriptions.Item label="系列">{series?.name}</Descriptions.Item>
            <Descriptions.Item label="主题">{theme?.name}</Descriptions.Item>
            <Descriptions.Item label="翻译">{translator?.name}</Descriptions.Item>
            <Descriptions.Item label="路径" span={3}>
              {book?.dirName}
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {moment(book?.created_at).format('YYYY-MM-DD hh:mm:ss')}
            </Descriptions.Item>
            <Descriptions.Item label="最后一次修改">
              {moment(book?.updated_at).format('YYYY-MM-DD hh:mm:ss')}
            </Descriptions.Item>
          </Descriptions>
        </Form>
        <div className={styles.uploadBtnWrap}>
          <UploadCoverButton
            targetURL={`${localStorage.getItem('apiUrl')}/book/${book?.id}/cover`}
          />
        </div>
      </Card>
    </div>
  );
}

export default connect(({ bookDetail, bookDetailInfo }: ConnectState) => ({
  bookDetail,
  bookDetailInfo,
}))(BookDetailInfo);
