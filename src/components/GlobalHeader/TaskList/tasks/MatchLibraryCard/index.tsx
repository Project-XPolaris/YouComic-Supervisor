import Title from 'antd/lib/typography/Title';
import { Card, Progress } from 'antd';
import React from 'react';

export const MatchLibraryCard = ({ task, className }: { task: any; className?: string }) => {
  let progress = 0;
  if (task.data.total > 0) {
    progress = Math.ceil((task.data.current / task.data.total) * 100);
  }
  return (
    <Card
      title={`Match library task - ${task.data.name} (${task.status})`}
      bordered={false}
      style={{ width: 300 }}
      className={className}
    >
      <Title level={5}>
        {task.data.current}/{task.data.total}
      </Title>
      <Progress percent={progress} />
    </Card>
  );
};
