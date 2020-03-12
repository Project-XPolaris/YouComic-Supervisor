import React from 'react';
import styles from "@/components/SideCollection/panels/BookActionBar/style.less";
import {Button, Typography} from "antd";
import ExitIcon from "@ant-design/icons/ExportOutlined";
import SelectIcon from "@ant-design/icons/CheckOutlined";
import UnSelectAllIcon from "@ant-design/icons/MinusOutlined";
import InverseSelectIcon from "@ant-design/icons/ReloadOutlined";
import DeleteIcon from "@ant-design/icons/DeleteFilled";


interface ActionBarPropsType {
  isSelectMode?: boolean
  selectCount?: number
  onUnSelect?: () => void
  onSelectAll?: () => void
  onInverseSelect?: () => void
  extraMultipleAction?:any
  onSwitchSelectMode?:() => void
  onRemoveFromCollection?:() => void
  extraAction?:any
}


export default function ActionBar({
                                    isSelectMode = false,
                                    selectCount = 0,
                                    onUnSelect, onSelectAll, onInverseSelect,extraMultipleAction,onSwitchSelectMode,extraAction,onRemoveFromCollection
                                  }: ActionBarPropsType) {
  const renderSelectArea = () => {
    if (!isSelectMode) {
      return undefined
    }
    return (
      <div className={styles.multipleSelectArea}>
        <Typography.Text>
          已选择{selectCount}项
        </Typography.Text>
        <div className={styles.selectActionRight}>
          {
            onUnSelect &&
            <Button
              type="danger"
              className={styles.selectActionButton}
              size="small"
              onClick={onUnSelect}
            >
              <UnSelectAllIcon/>不选
            </Button>
          }
          {
            onSelectAll &&
            <Button
              type="primary"
              className={styles.selectActionButton}
              size="small"
              onClick={onSelectAll}
            >
              <SelectIcon/>全选
            </Button>
          }
          {
            onInverseSelect &&
            <Button
              type="primary"
              className={styles.selectActionButton} size="small"
              onClick={onInverseSelect}
            >
              <InverseSelectIcon/>反选
            </Button>
          }
          {
            onRemoveFromCollection &&
            <Button
              type="danger"
              className={styles.selectActionButton} size="small"
              onClick={onRemoveFromCollection}
            >
              <DeleteIcon/>从集合中删除
            </Button>
          }
          {extraMultipleAction}
        </div>
      </div>
    )
  };
  return (
    <div className={styles.main}>
      {renderSelectArea()}
      <div className={styles.actionArea}>
        <Button type='primary' size="small" onClick={onSwitchSelectMode}>{isSelectMode ?
          <ExitIcon/> : <SelectIcon/>}{isSelectMode ? "退出选择模式" : "选择模式"}</Button>
        {extraAction}
      </div>
    </div>
  );
}
