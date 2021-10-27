import { Dispatch, GlobalModelState } from '@@/plugin-dva/connect';
import style from './style.less';
import { connect } from '@@/plugin-dva/exports';
import { ConnectState } from '@/models/connect';
import React from 'react';
import { Statistic } from 'antd';

const ThumbnailGeneratorStatusView = ({
  dispatch,
  global,
}: {
  dispatch: Dispatch;
  global: GlobalModelState;
}) => {
  return (
    <div className={style.root}>
      <div className={style.content}>
        <Statistic title="Total" value={global.thumbnailGeneratorStatus?.total} />
        <Statistic title="Queue" value={global.thumbnailGeneratorStatus?.inQueue} />
        <Statistic title="Progress" value={global.thumbnailGeneratorStatus?.inProgress} />
      </div>
    </div>
  );
};

export default connect(({ global }: ConnectState) => ({
  global,
}))(ThumbnailGeneratorStatusView);
