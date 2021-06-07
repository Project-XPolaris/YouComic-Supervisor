import React, { ReactNode } from 'react';
import style from './style.less';
import { Typography } from 'antd';
import classNames from 'classnames';

const TaskLayout = ({
  children,
  title,
  className,
}: {
  children: ReactNode;
  title: string;
  className?: string;
}) => {
  return (
    <div className={classNames(style.root, className)}>
      <Typography.Text className={style.title}>{title}</Typography.Text>
      {children}
    </div>
  );
};

export default TaskLayout;
