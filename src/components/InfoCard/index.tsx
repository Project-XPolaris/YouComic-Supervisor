import React from "react";
import {Avatar, Card, Statistic} from "antd";
import style from './style.less';

export interface InfoCardPropsType {
  cardClassName?: any
  title: string
  icon: any
  value:number
  loading?:boolean
}

const InfoCard = ({cardClassName, title, icon,value,loading = false}: InfoCardPropsType) => {
  return (
    <div>
      <Card className={cardClassName} loading={loading}>
        <div>
          <Card.Meta
            avatar={<Avatar icon={icon} className={style.avatar}/>}
            title={title}
          />
        </div>
        <br/>
        <div>
          <Statistic
            value={value}
            valueStyle={{fontSize: 24}}
            className={style.value}
          />
        </div>
      </Card>
    </div>
  )

}

export default InfoCard
