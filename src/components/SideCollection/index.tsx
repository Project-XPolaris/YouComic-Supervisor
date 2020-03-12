import React from 'react';
import {Drawer, Tabs} from "antd";
import {connect, Dispatch} from 'dva'
import {ConnectState} from "@/models/connect";
import {DialogStateType} from "@/models/dialog";
import BooksPanel from "@/components/SideCollection/panels/BooksPanel";
import styles from './style.less'
import {SideCollectionModelStateType} from "@/models/side";
import BookActionBar from "@/components/SideCollection/panels/BookActionBar";
import TagsPanel from "@/components/SideCollection/panels/TagsPanel";
import TagActionBar from "@/components/SideCollection/panels/TagActionBar";

const { TabPane } = Tabs;

export const sideCollectionKey = "global/sideCollection";

interface SideCollectionPropsType {
  dispatch:Dispatch
  dialog:DialogStateType
  sideCollection:SideCollectionModelStateType
}

const SideCollection  = ({dispatch,dialog,sideCollection}: SideCollectionPropsType) => {
  const {dialogs} = dialog;
  const onDrawerClose = () => {
    dispatch({
      type:"dialog/setDialogActive",
      payload:{
        key:sideCollectionKey,
        isActive:false
      }
    })
  };
  const onActiveChange = (activeTab:string) => {
    dispatch({
      type:"sideCollection/setActiveTab",
      payload:{
        tab:activeTab
      }
    })
  };
  const renderActionBar = () => {
    return {
      "books":<BookActionBar />,
      "tags":<TagActionBar />
    }[sideCollection.activeTab]
  };
  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={onDrawerClose}
      width={620}
      visible={Boolean(dialogs[sideCollectionKey])}
    >
      <Tabs activeKey={sideCollection.activeTab} onChange={onActiveChange}>
        <TabPane tab="书籍" key="books">
          <BooksPanel />
        </TabPane>
        <TabPane tab="标签" key="tags">
          <TagsPanel />
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      <div className={styles.actionBar}>
        {renderActionBar()}
      </div>
    </Drawer>
  );
};
export default connect(({dialog,sideCollection}:ConnectState) => ({dialog,sideCollection}))(SideCollection)
