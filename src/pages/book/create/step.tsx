import React from 'react';
import {Steps} from "antd";

const { Step } = Steps;


interface CreateBookStepPropsType {
  currentStep?:number
}

export const stepItems : {title:string,description:string}[] = [
  {
    title:"基础信息",
    description:"书籍的基本信息"
  },
  {
    title:"标签",
    description:"添加信息标签"
  },
  {
    title:"书页",
    description:"添加书籍书页"
  }
];
export default function CreateBookStep({currentStep = 0}: CreateBookStepPropsType) {
    const steps = stepItems.map(item => (
      <Step title={item.title} description={item.description} />
    ));
    return (
      <Steps current={currentStep} size="small">
        {steps}
      </Steps>
    );
}
