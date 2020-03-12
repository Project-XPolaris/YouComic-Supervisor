import React from 'react';
import PageDND from "@/pages/book/create/panels/PagePanel/components/PageDND";
import PageUpload from "@/pages/book/create/panels/PagePanel/components/PageUpload";
import styles from './style.less'
import {BookPage} from "@/pages/book/create";

interface PagesPanelPropsType {
  imageFiles: BookPage[]
  onImageFilesUpdate: (imageFiles: BookPage[]) => void
}


export default function PagesPanel({imageFiles, onImageFilesUpdate}: PagesPanelPropsType) {
  return (
    <div>
      <div className={styles.uploadHeader}>
        <PageUpload imageFiles={imageFiles} onFilesChange={onImageFilesUpdate}/>
      </div>
      <PageDND onFilesChange={onImageFilesUpdate} imageFiles={imageFiles}/>
    </div>
  );
}
