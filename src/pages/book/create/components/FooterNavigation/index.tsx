import React from 'react';
import {Button} from "antd";
import styles from './style.less'


export interface FooterNavigationPropsType {
  onNext: () => void
  onPrevious: () => void
  disablePrevious?: boolean
  disableNext?: boolean
  showFinishButton:boolean
  onFinish?:() => void
  disableFinish?:boolean
}


export default function FooterNavigation({onNext, onPrevious, disableNext = false, disablePrevious = false,onFinish,showFinishButton,disableFinish=false}: FooterNavigationPropsType) {
  return (
    <div>
      <Button type="primary" onClick={onPrevious} disabled={disablePrevious}>上一步</Button>
      {showFinishButton?
        <Button type="primary" className={styles.nextButton} onClick={onFinish} disabled={disableFinish}>完成</Button>
        :
        <Button type="primary" className={styles.nextButton} onClick={onNext} disabled={disableNext}>下一步</Button>
      }

    </div>
  );
}
