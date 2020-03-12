import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Card} from "antd";
import styles from './style.less'


interface PageCardPropsType {
  src: string
}


export default function PageCard({src}: PageCardPropsType) {
  const onImageDragStart = (e: any) => {
    e.preventDefault()
  };
  useEffect(()=> {
    console.log("mount")
  })
  return (
    <div>
      <img src={src} className={styles.pageImg} onDragStart={onImageDragStart}/>
    </div>
  );
}
