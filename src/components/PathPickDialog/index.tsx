import {Avatar, Button, Input, List, Modal} from "antd";
import React, {useEffect, useState} from "react";
import style from './style.less'
import {FileItem, readDir} from "@/services/explore";
import FolderIcon from "@ant-design/icons/FolderFilled";
import {ArrowLeftOutlined} from "@ant-design/icons";

export const PathPickDialog = ({ isOpen = false }:{isOpen:boolean}) => {
  const [items,setItems] = useState<FileItem[]>([])
  const [currentPath,setCurrentPath] = useState<string>("/")
  const [inputValue,setInputValue] = useState<string>("/")
  const [backPath,setBackPath] = useState<string>()
  const refreshItem = async (target:string) => {
    const response = await readDir({target})
    setItems(response.items.filter(it => it.type === "Directory"))
    setBackPath(response.back)
  }
  const onBack = () => {
    if (backPath) {
      setCurrentPath(backPath)
    }
  }
  useEffect(() => {
    setInputValue(currentPath)
    if (isOpen) {
      refreshItem(currentPath)
    }
  },[isOpen,currentPath])
  return (
    <Modal visible={isOpen} title={"选择路径"}>
      <div className={style.header}>
        <Button
          className={style.back}
          type={"text"}
          icon={<ArrowLeftOutlined />}
          onClick={onBack}
        />
        <Input.Search
          placeholder="路径"
          className={style.item}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSearch={(text) => setCurrentPath(text)}
        />
      </div>

      <List
        className={style.list}
        itemLayout="horizontal"
        dataSource={items}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<FolderIcon />} />}
              title={<a onClick={() => setCurrentPath(item.path)}>{item.name}</a>}
              description="Directory"
            />
          </List.Item>
        )}
      />
    </Modal>
  )
}
