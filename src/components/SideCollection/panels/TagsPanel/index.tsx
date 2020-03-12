import React from 'react';
import {connect, Dispatch} from 'dva'
import {ConnectState} from "@/models/connect";
import TagCollection from "@/components/SideCollection/panels/TagCollection";
import {SideCollectionModelStateType} from "@/models/side";
import {Tag} from "@/services/tag";

interface TagsPanelPropsType {
  sideCollection:SideCollectionModelStateType
  dispatch:Dispatch
}

const TagsPanel = ({sideCollection,dispatch}: TagsPanelPropsType) =>{
  const {isTagSelectMode, selectedTags,tags} = sideCollection;
  const onTagCardClick = (tag: Tag) => {
    if (isTagSelectMode) {
      const isAlreadySelect = Boolean(selectedTags.find(selectedTag => selectedTag.id === tag.id));
      if (isAlreadySelect) {
        dispatch({
          type: "sideCollection/setSelectedTags",
          payload: {
            tags: selectedTags.filter(selectedTag => selectedTag.id !== tag.id)
          }
        })
      } else {
        dispatch({
          type: "sideCollection/setSelectedTags",
          payload: {
            tags: [
              ...selectedTags,
              tag
            ]
          }
        })
      }
    }
  };
  return (
    <div>
      <TagCollection tags={tags} onTagClick={onTagCardClick} selectedTags={selectedTags}/>
    </div>
  );
};

export default connect(({sideCollection}:ConnectState) => ({sideCollection}))(TagsPanel)
