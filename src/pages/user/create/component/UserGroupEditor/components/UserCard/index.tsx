import React from 'react';
import styles from './style.less'
import {Avatar, Card} from "antd";

interface UserCardPropsType {
  username:string
  id:string
}


export default function UserCard({username,id}: UserCardPropsType) {
    return (
          <Card hoverable={true} className={styles.main} bodyStyle={{padding:8}}>
            <Avatar className={styles.avatar}>{username[0].toUpperCase()}</Avatar>
            <span>{username}</span>
          </Card>
    );
}
