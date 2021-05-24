import style from './style.less';
import React from 'react';
import { Card, Progress } from 'antd';
import Title from 'antd/lib/typography/Title';
import { connect } from '@@/plugin-dva/exports';
import { ConnectState, GlobalModelState } from '@/models/connect';
import { Dispatch } from 'umi';

const TaskList = ({ dispatch, global }: { dispatch: Dispatch; global: GlobalModelState }) => {
  return (
    <div className={style.root}>
      <div className={style.content}>
        {global.tasks.map(it => {
          let progress = 0;
          if (it.total > 0) {
            progress = Math.ceil((it.current / it.total) * 100);
          }
          return (
            <Card
              title={`${it.name} (${it.status})`}
              bordered={false}
              style={{ width: 300 }}
              className={style.item}
            >
              <Title level={5}>
                {it.current}/{it.total}
              </Title>
              <Progress percent={progress} />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default connect(({ global }: ConnectState) => ({
  global,
}))(TaskList);
