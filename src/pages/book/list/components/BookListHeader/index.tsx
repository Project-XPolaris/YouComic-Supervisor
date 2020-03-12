import React from 'react';
import {Button, Col, Row, Typography} from "antd";
import styles from './style.less'
import {Book} from "@/services/book";
import CheckIcon from '@ant-design/icons/CheckOutlined'
import InverseSelectIcon from '@ant-design/icons/ReloadOutlined'
import UnSelectedIcon from '@ant-design/icons/MinusOutlined'
import FolderIcon from '@ant-design/icons/FolderFilled'

const {Text} = Typography;

interface BookListHeaderPropsType {
  onFilterToggleButtonClick?: () => void,
  selectedBookIds?: Book[]
  onAddToCollection: () => void
  onSelectAll: () => void
  onInverseSelect: () => void
  onUnSelectAll: () => void
  extraAction?: any
  actions?: any
}


export default function BookListHeader({actions,onFilterToggleButtonClick, selectedBookIds = [], onAddToCollection, onInverseSelect, onSelectAll, onUnSelectAll, extraAction}: BookListHeaderPropsType) {
  const renderMultipleSelectionActonContent = () => {
    if (selectedBookIds?.length === 0) {
      return undefined
    }
    return (
      <div>
        <Text className={styles.actionField}>已选择{selectedBookIds?.length}项</Text>
        <Button type="danger" className={styles.actionField} onClick={onUnSelectAll}><UnSelectedIcon/>取消全选</Button>
        <Button type="primary" className={styles.actionField} onClick={onSelectAll}><CheckIcon/>全选</Button>
        <Button type="primary" className={styles.actionField} onClick={onInverseSelect}><InverseSelectIcon/>反选</Button>
        <Button type="primary" className={styles.actionField} onClick={onAddToCollection}><FolderIcon/>加入集合</Button>
        {extraAction}
      </div>
    )
  };
  return (
    <div>
      <Row>
        <Col span={12}>
          {onFilterToggleButtonClick &&
          <Button type="primary" onClick={onFilterToggleButtonClick}>过滤器</Button>
          }
          {actions}
        </Col>
        <Col span={12} className={styles.rightContent}>
          {renderMultipleSelectionActonContent()}
        </Col>
      </Row>
    </div>
  );
}
