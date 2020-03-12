import React, {useState} from 'react';
import SectionContainer from "@/pages/book/list/components/BookFilterDrawer/sections/SectionContainer";
import {Button, DatePicker} from "antd";
import styles from './style.less'
import {Moment} from "moment";

const {RangePicker} = DatePicker;

interface TimeRangeFilterSectionPropsType {
  onAddRangeChange: (startTime: string, endTime: string) => void
}


export default function TimeRangeFilterSection({onAddRangeChange}: TimeRangeFilterSectionPropsType) {
  const [timeRange, setTimeRange] = useState<string[]>([]);
  const onTimeChange = (dates: [Moment, Moment], dateStrings: [string, string]) => {
    setTimeRange(dateStrings)
  };
  const onAddTimeRangeButtonClick = () => {
    const [startTime, endTime] = timeRange;
    onAddRangeChange(startTime, endTime)
  };

  return (
    <SectionContainer title="创建时间">
      <RangePicker
        className={styles.rangeInput}
        size="small"
        // @ts-ignore
        onChange={onTimeChange}
      />
      <Button type="primary" htmlType="submit" className={styles.addButton} onClick={onAddTimeRangeButtonClick} disabled={timeRange.length < 2}>添加</Button>
    </SectionContainer>
  );
}
