import style from './style.less';
import React from 'react';
import { connect } from '@@/plugin-dva/exports';
import { ConnectState, GlobalModelState } from '@/models/connect';
import { Dispatch } from 'umi';
import { Task } from '@/services/task';
import { ScanLibraryCard } from '@/components/GlobalHeader/TaskList/tasks/ScanLibraryCard';
import { MatchLibraryCard } from '@/components/GlobalHeader/TaskList/tasks/MatchLibraryCard';

const TaskList = ({ dispatch, global }: { dispatch: Dispatch; global: GlobalModelState }) => {
  const itemRender = (task: Task) => {
    switch (task.type) {
      case 'ScanLibrary':
        return <ScanLibraryCard task={task} className={style.item} />;
      case 'MatchLibrary':
        return <MatchLibraryCard task={task} className={style.item} />;
    }
  };
  return (
    <div className={style.root}>
      <div className={style.content}>
        {global.tasks.map(it => {
          return itemRender(it);
        })}
      </div>
    </div>
  );
};

export default connect(({ global }: ConnectState) => ({
  global,
}))(TaskList);
