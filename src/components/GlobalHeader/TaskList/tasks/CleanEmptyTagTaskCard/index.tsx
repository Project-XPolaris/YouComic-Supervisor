import Title from 'antd/lib/typography/Title';
import { Progress } from 'antd';
import React from 'react';
import TaskLayout from '@/components/GlobalHeader/TaskList/tasks/TaskLayout';

export const RemoveEmptyTagTaskCard = ({ task, className }: { task: any; className?: string }) => {
  let progress = 0;
  if (task.data.total > 0) {
    progress = Math.floor((task.data.current / task.data.total) * 100);
  }
  return (
    <TaskLayout title={`Clean empty tag - (${task.status})`} className={className}>
      <Title level={5}>
        当前：{task.data.current}/{task.data.total}
      </Title>
      <Progress percent={progress} />
    </TaskLayout>
  );
};
