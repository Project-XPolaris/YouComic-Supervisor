import React from "react";
import style from './style.less';
import {Avatar} from "antd";
import {TagOutlined} from "@ant-design/icons/lib";

export interface TagTypeItemPropsType {
  name?:string
  value?:any
}

const TagTypeItem = ({name,value}: TagTypeItemPropsType) => {
  return (
    <div className={style.root}>
      <div className={style.left}>
        <Avatar icon={<TagOutlined/>} className={style.icon} size={36}/>
        <div className={style.title}>
          {name}
        </div>
      </div>
      <div className={style.value}>
        {value}
      </div>

    </div>
  )

}

export default TagTypeItem
