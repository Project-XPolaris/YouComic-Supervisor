import React, {useEffect, useState} from 'react';
import {connect, Dispatch} from 'dva';
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import {Card} from "antd";
import styles from './style.less'
import CreateBookStep, {stepItems} from "@/pages/book/create/step";
import FooterNavigation, {FooterNavigationPropsType} from "@/pages/book/create/components/FooterNavigation";
import {ConnectState} from "@/models/connect";
import {CreateBookPageModelStateType} from "@/pages/book/create/model";
import InfoPanel from "@/pages/book/create/panels/InfoPanel";
import TagsPanel, {TagItem} from "@/pages/book/create/panels/TagsPanel";
import PagesPanel from "@/pages/book/create/panels/PagePanel";
import {useForm} from "antd/es/form/util";
import Resizer from 'react-image-file-resizer';


interface CreateBookPagePropsType {
  dispatch: Dispatch,
  createBook: CreateBookPageModelStateType
}
export interface BookPage {
  file:File,
  thumbnail:string
}
function CreateBookPage({dispatch, createBook}: CreateBookPagePropsType) {
  const {currentStep} = createBook;
  const [infoForm] = useForm();
  const footerNavigationProps: FooterNavigationPropsType = {
    onNext: () => {
      if(currentStep === 0){
        infoForm.submit()
      }
      dispatch({
        type: "createBook/setCurrentStep",
        payload: {
          currentStep: currentStep + 1
        }
      })
    },
    onPrevious: () => {
      dispatch({
        type: "createBook/setCurrentStep",
        payload: {
          currentStep: currentStep - 1
        }
      })
    },
    showFinishButton: stepItems.length - 1 === currentStep,
    disablePrevious: currentStep === 0,
  };
  const onInfoFormFinish = (values:any) => {
    console.log(values)
  };
  const [coverFile,setCoverFile] = useState<File | undefined>(undefined);
  const onSetCoverFile = (file:File) => {
    setCoverFile(file)
  };
  const [bookTags,setBookTags] = useState<TagItem[]>([]);
  const onBookTagChange = (tags:TagItem[]) => {
    console.log(tags)
    setBookTags(tags)
  };

  const [pageFiles,setPageFiles] = useState<BookPage[]>([]);

  const onPageFileUpdate = (newPages : BookPage[]) => {
    setPageFiles(newPages)
  };

  const panels = [
    <InfoPanel form={infoForm} onFinish={onInfoFormFinish} onSetUploadCover={onSetCoverFile} cover={coverFile}/>,
    <TagsPanel bookTags={bookTags} onBookTagChange={onBookTagChange}/>,
    <PagesPanel onImageFilesUpdate={onPageFileUpdate} imageFiles={pageFiles}/>
  ];

  return (
    <PageHeaderWrapper>
      <Card className={styles.content}>
        <div className={styles.stepWrap}>
          <CreateBookStep currentStep={currentStep}/>
          <div className={styles.panelContainer}>
              {panels[currentStep]}
          </div>
          <FooterNavigation {...footerNavigationProps}/>
        </div>
      </Card>
    </PageHeaderWrapper>
  );
}

export default connect(({createBook}: ConnectState) => ({createBook}))(CreateBookPage);
