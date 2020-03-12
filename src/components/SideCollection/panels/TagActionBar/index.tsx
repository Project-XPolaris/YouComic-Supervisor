import React from 'react';
import {connect, Dispatch} from 'dva';
import {SideCollectionModelStateType} from "@/models/side";
import {ConnectState} from "@/models/connect";
import {Button} from "antd";
import styles from "@/components/SideCollection/panels/BookActionBar/style.less";
import ActionBar from "@/components/SideCollection/panels/ActionBar";
import {Tag} from "@/services/tag";


interface TagActionBarPropsType {
  dispatch: Dispatch,
  sideCollection: SideCollectionModelStateType
}

function TagActionBar({dispatch,sideCollection}: TagActionBarPropsType) {
  const {isTagSelectMode, selectedTags,tagActions} = sideCollection;
  const onSelectAllTags = () => {
    dispatch({
      type: "sideCollection/setSelectedTags",
      payload: {
        tags: sideCollection.tags
      }
    })
  };
  const onInverseSelectTags = () => {
    dispatch({
      type: "sideCollection/setSelectedTags",
      payload: {
        tags: sideCollection.tags?.filter((tag: Tag) => selectedTags.find(selectedTag => selectedTag.id === tag.id) === undefined)
      }
    })
  };
  const onUnSelectTags = () => {
    dispatch({
      type: "sideCollection/setSelectedTags",
      payload: {
        tags: []
      }
    })
  };
  const onRemoveSelectTag = () => {
    dispatch({
      type: "sideCollection/removeSelectTagFromCollection",
    })
  };
  const onSwitchTagSelectModeButtonClick = () => {
    dispatch({
      type: "sideCollection/setTagSelectMode",
      payload: {
        isSelect: !isTagSelectMode,
      }
    })
  };
  const actions = tagActions.map(action => {
    const onClick = () => {
      dispatch({
        type:action.actionType
      })
    };
    return (
      <Button
        type={action.type}
        onClick={onClick}
        size='small'
        className={styles.actionButton}
      >{action.title}</Button>
    )
  });
  return (
    <ActionBar
      onSwitchSelectMode={onSwitchTagSelectModeButtonClick}
      onSelectAll={onSelectAllTags}
      onInverseSelect={onInverseSelectTags}
      onUnSelect={onUnSelectTags}
      onRemoveFromCollection={onRemoveSelectTag}
      isSelectMode={isTagSelectMode}
      selectCount={selectedTags.length}
      extraMultipleAction={actions}
    />
  );
}

export default connect(({sideCollection}: ConnectState) => ({sideCollection}))(TagActionBar);
