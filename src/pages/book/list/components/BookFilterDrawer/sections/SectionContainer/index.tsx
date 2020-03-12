import React from 'react';
import styles from './style.less'


interface SectionContainerPropsType {
  children:any
  title:string
}


export default function SectionContainer({children,title}: SectionContainerPropsType) {

    return (
        <div>
          <div className={styles.title}>{title}</div>
          {children}
        </div>
    );
}
