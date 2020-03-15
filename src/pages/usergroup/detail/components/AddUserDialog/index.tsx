import React, {useState} from 'react';
import {Modal, Select} from "antd";
import {debounce} from "lodash";
import {User} from "@/services/user";


interface AddUserDialogPropsType {
  isOpen: boolean
  onClose: () => void
  onSearch: (key: string) => void
  users: User[]
  onOk: (ids: number[]) => void
}


export default function AddUserDialog({isOpen, onClose, onSearch, users, onOk}: AddUserDialogPropsType) {
  const [selectValues, setSelectValues] = useState([])
  const option = users.map(user => {
    return (
      <Option key={user.id} value={user.id}>{user.username}</Option>
    )
  })

  return (
    <Modal
      visible={isOpen}
      onCancel={onClose}
      closable={false}
      title="添加用户"
      onOk={() => onOk(selectValues)}
    >
      <Select
        mode="multiple"
        labelInValue
        placeholder="Inserted are removed"
        style={{width: '100%'}}
        onSearch={debounce(onSearch, 800)}
        onChange={(value: any) => setSelectValues(value)}
        filterOption={false}

      >
        {option}
      </Select>
    </Modal>
  );
}
