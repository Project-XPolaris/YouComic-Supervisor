import style from './style.less';
import React from 'react';
import { connect } from '@@/plugin-dva/exports';
import { ConnectState, GlobalModelState } from '@/models/connect';
import { Dispatch } from 'umi';
import { Task } from '@/services/task';
import { ScanLibraryCard } from '@/components/GlobalHeader/TaskList/tasks/ScanLibraryCard';
import { MatchLibraryCard } from '@/components/GlobalHeader/TaskList/tasks/MatchLibraryCard';
import { RenameLibraryBookDirectoryCard } from '@/components/GlobalHeader/TaskList/tasks/RenameLibraryBookDirectoryCard';
import { MoveBookCard } from '@/components/GlobalHeader/TaskList/tasks/MoveBookCard';
import { Empty } from 'antd';
import { RemoveEmptyTagTaskCard } from '@/components/GlobalHeader/TaskList/tasks/CleanEmptyTagTaskCard';
import { WriteBookMetaTaskCard } from '@/components/GlobalHeader/TaskList/tasks/WriteBookMetaTaskCard';
import {RemoveLibraryTaskCard} from "@/components/GlobalHeader/TaskList/tasks/RemoveLibraryTaskCard";
import {GenerateThumbnailsTaskCard} from "@/components/GlobalHeader/TaskList/tasks/GenerateThumbnailsTask";

const TaskList = ({ dispatch, global }: { dispatch: Dispatch; global: GlobalModelState }) => {
  const itemRender = (task: Task) => {
    switch (task.type) {
      case 'ScanLibrary':
        return <ScanLibraryCard task={task} className={style.item} />;
      case 'MatchLibrary':
        return <MatchLibraryCard task={task} className={style.item} />;
      case 'RenameLibraryBookDirectory':
        return <RenameLibraryBookDirectoryCard task={task} className={style.item} />;
      case 'MoveBook':
        return <MoveBookCard task={task} className={style.item} />;
      case 'RemoveEmptyTag':
        return <RemoveEmptyTagTaskCard task={task} className={style.item} />;
      case 'WriteBookMeta':
        return <WriteBookMetaTaskCard task={task} className={style.item} />;
      case 'RemoveLibrary':
        return <RemoveLibraryTaskCard task={task} className={style.item}/>
      case 'GenerateThumbnail':
        return <GenerateThumbnailsTaskCard task={task} className={style.item}/>
    }
  };
  const renderContent = () => {
    if (global.tasks.length > 0) {
      return global.tasks.map(it => {
        return itemRender(it);
      });
    }
    return <Empty />;
  };
  return (
    <div className={style.root}>
      <div className={style.content}>{renderContent()}</div>
    </div>
  );
};

export default connect(({ global }: ConnectState) => ({
  global,
}))(TaskList);
