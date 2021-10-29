import Title from 'antd/lib/typography/Title';
import React from 'react';
import TaskLayout from '@/components/GlobalHeader/TaskList/tasks/TaskLayout';

export const RemoveLibraryTaskCard = ({
  task,
  className,
}: {
  task: any;
  className?: string;
}) => {
  return (
    <TaskLayout title={`Remove task - ${task.data.name} (${task.status})`} className={className}>
      <Title level={5}>
        { task.data.name }
      </Title>
    </TaskLayout>
  );
};
