import React, {useState} from 'react';
import {Modal, Select} from "antd";
import {Permission} from "@/services/permission";
import {debounce} from 'lodash'

const {Option} = Select

interface AddPermissionDialogPropsType {
  isOpen: boolean
  onClose: () => void
  onSearch: (key: string) => void
  permissions: Permission[]
  onOk:(ids:number[]) => void
}


export default function AddPermissionDialog({isOpen, onClose, onSearch, permissions,onOk}: AddPermissionDialogPropsType) {
  const [selectValues,setSelectValues] = useState([])
  const option = permissions.map(permission => {
    return (
      <Option key={permission.id} value={permission.id}>{permission.name}</Option>
    )
  })

  return (
    <Modal
      visible={isOpen}
      onCancel={onClose}
      closable={false}
      title="添加权限"
      onOk={() => onOk(selectValues)}
    >
      <Select
        mode="multiple"
        labelInValue
        placeholder="Inserted are removed"
        style={{width: '100%'}}
        onSearch={debounce(onSearch, 800)}
        onChange={(value:any) => setSelectValues(value)}
        filterOption={false}

      >
        {option}
      </Select>
    </Modal>
  );
}
