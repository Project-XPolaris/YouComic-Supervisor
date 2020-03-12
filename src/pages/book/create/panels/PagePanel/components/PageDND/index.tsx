import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap
} from "react-grid-dnd";
import PageCard from "@/pages/book/create/panels/PagePanel/components/PageCard";
import {BookPage} from "@/pages/book/create";
import { connect } from 'dva';
import {ConnectState} from "@/models/connect";
import {CreateBookPageModelStateType} from "@/pages/book/create/model";

interface PageDNDPropsType {
  imageFiles:BookPage[]
  onFilesChange: (imageFiles: BookPage[]) => void
  createBook:CreateBookPageModelStateType
}

function PageDND({imageFiles,onFilesChange,createBook}: PageDNDPropsType) {
  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    onFilesChange(swap(imageFiles, sourceIndex, targetIndex));
  }
  return (
    <GridContextProvider onChange={onChange}>
      <GridDropZone
        id="items"
        boxesPerRow={6}
        rowHeight={200}
        style={{height: 200 * Math.ceil(imageFiles.length / 6.0)}}
      >
        {imageFiles.map(item => (
          <GridItem key={item.file.name}>
            <PageCard src={createBook.pageThumbnails[item.file.name]}/>
          </GridItem>
        ))}
      </GridDropZone>
    </GridContextProvider>
  );
}
export default connect(({createBook}:ConnectState) => ({createBook}))(PageDND)
