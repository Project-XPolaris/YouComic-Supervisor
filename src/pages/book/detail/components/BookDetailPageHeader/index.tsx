import { Button, Descriptions, Tabs } from 'antd';
import React from 'react';
import { Book } from '@/services/book';
import { getBookTagInfo } from '@/utils/book';
import { history } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './style.less';

const { TabPane } = Tabs;

interface BookDetailPageHeaderPropsType {
  book?: Book;
  children: any;
  showDescription: boolean;
  onSwitchShowDescription: () => void;
}

const BookDetailPageHeader = ({
  book,
  children,
  showDescription,
  onSwitchShowDescription,
}: BookDetailPageHeaderPropsType) => {
  const { author, translator, theme, series } = getBookTagInfo(book);
  const renderFooter = () => {
    const value = history?.location?.pathname?.split('/')?.pop();
    const onChange = (activeKey: string) => {
      const url = history?.location?.pathname?.split('/');
      const current = url.pop();
      if (current) {
        history.replace(history.location.pathname.replace(current, activeKey));
      }
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
  const renderContent = (column = 2) =>
    showDescription && (
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
      extra={
        <>
          <Button onClick={onSwitchShowDescription}>
            {showDescription ? '隐藏' : '显示'}详细信息
          </Button>
        </>
      }
    >
      {renderFooter()}
      {children}
    </PageHeaderWrapper>
  );
};
export default BookDetailPageHeader;
