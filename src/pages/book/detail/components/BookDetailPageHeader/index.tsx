import {Descriptions, Statistic, Tabs} from 'antd';
import React from 'react';
import {Book} from '@/services/book';
import {getBookTagInfo} from '@/utils/book';
import styles from './style.less';
import {history} from 'umi'
import {PageHeaderWrapper} from '@ant-design/pro-layout';

const { TabPane } = Tabs;

const extraContent = (
  <div
    style={{
      display: 'flex',
      width: 'max-content',
      justifyContent: 'flex-end',
    }}
  >
    <Statistic
      title="Status"
      value="Pending"
      style={{
        marginRight: 32,
      }}
    />
    <Statistic title="Price" prefix="$" value={568.08} />
  </div>
);

const Content = ({ children, extra }) => {
  return (
    <div className="content">
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </div>
  );
};

interface BookDetailPageHeaderPropsType {
  book?: Book;
  children: any;
}

const BookDetailPageHeader = ({ book, children }: BookDetailPageHeaderPropsType) => {
  const { author, translator, theme, series } = getBookTagInfo(book);

  const renderFooter = () => {
    const value = window.location.pathname.split('/').pop();
    const onChange = (activeKey: string) => {
      const url = window.location.pathname.split('/');
      url.pop();
      url.push(activeKey);
      history.replace(url.join('/'));
    };
    return (
      <Tabs
        activeKey={value}
        onChange={onChange}
        className={styles.navTabs}
        tabBarStyle={{ marginLeft: 12, marginBottom: 0 }}
      >
        <TabPane tab="基本信息" key="info" />
        <TabPane tab="标签" key="tags" />
        <TabPane tab="页面" key="pages" />
      </Tabs>
    );
  };
  const renderContent = (column = 2) => (
    <div className={styles.headerContent}>
      <Descriptions size="small" column={column}>
        <Descriptions.Item label="ID">{book?.id}</Descriptions.Item>
        <Descriptions.Item label="作者">{author?.name}</Descriptions.Item>
        <Descriptions.Item label="系列">{series?.name}</Descriptions.Item>
        <Descriptions.Item label="主题">{theme?.name}</Descriptions.Item>
        <Descriptions.Item label="翻译">{translator?.name}</Descriptions.Item>
      </Descriptions>
    </div>
  );
  return (
    <PageHeaderWrapper
      onBack={() => window.history.back()}
      title={book?.name}
      footer={renderFooter()}
      content={renderContent()}
    >
      {renderFooter()}
      {children}
    </PageHeaderWrapper>
  );
};
export default BookDetailPageHeader;
