import React from 'react';
import styles from './style.less'
import {Tag} from "antd";

interface BooksFilterPropsType {

}


export default function BooksFilter({}: BooksFilterPropsType) {

    return (
        <div className={styles.main}>
          <div>
            <Tag>filter 1</Tag>
          </div>
        </div>
    );
}
