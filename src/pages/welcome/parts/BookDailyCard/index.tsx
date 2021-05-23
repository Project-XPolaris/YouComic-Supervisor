import React from 'react';
import { connect } from '@@/plugin-dva/exports';
import moment from 'moment';
import { ConnectState } from '@/models/connect';
import { HomeModelStateType } from '@/pages/welcome/model';
import { Card, Table } from 'antd';
import style from './style.less';
import { Bar } from 'ant-design-pro/lib/Charts';

export interface BookDailyCardPropsType {
  home: HomeModelStateType;
}

const BookDailyCard = ({ home }: BookDailyCardPropsType) => {
  const salesData = [];
  for (let i = 0; i < 12; i += 1) {
    salesData.push({
      x: `${i + 1}月`,
      y: Math.floor(Math.random() * 1000) + 200,
    });
  }
  const getData = () => {
    const rawData = home.bookDailyCountList || [];
    const dataIndex = [...Array(7).keys()];
    return dataIndex.map(idx => {
      const dateLabel = moment()
        .subtract(idx, 'days')
        .format('YYYY-MM-DD');
      const targetData = rawData.find(item => item.date === dateLabel);

      if (targetData === undefined) {
        return {
          x: dateLabel,
          y: 0,
        };
      }
      return {
        x: dateLabel,
        y: targetData.total,
      };
    });
  };
  return (
    <Card style={{ width: '100%' }} title="书籍">
      <div className={style.root}>
        <Bar height={320} title="" data={getData()} autoLabel />
        <div style={{ flexGrow: 1, width: '100%' }}>
          <Table
            className={style.table}
            pagination={false}
            rowKey="id"
            columns={[
              {
                key: 'id',
                title: 'ID',
                dataIndex: 'id',
              },
              {
                key: 'name',
                title: '标题',
                dataIndex: 'name',
              },
              {
                key: 'library',
                title: 'Library',
                dataIndex: 'library_id',
              },
              {
                key: 'created_at',
                title: '创建时间',
                dataIndex: 'created_at',
                render: (value: Date) => moment(value).format('YYYY-MM-DD hh:mm:ss'),
              },
            ]}
            dataSource={home.recentlyBook || []}
          />
        </div>
      </div>
    </Card>
  );
};

export default connect(({ home }: ConnectState) => ({ home }))(BookDailyCard);
