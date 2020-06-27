import React from 'react';
import styles from './style.less'
import {Button} from "antd";

interface UserContainerPropsType {
  children: any
}


const UserContainer = React.forwardRef<UserContainerPropsType, any>(({children}: UserContainerPropsType, ref: any) => {
  return (

    <div ref={ref} className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>
          用户列表
        </div>
        <div>
          <Button size={"small"}>
            操作
          </Button>
        </div>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
})

export default UserContainer
