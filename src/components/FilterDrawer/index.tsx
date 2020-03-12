import React from 'react';
import {Divider, Drawer} from "antd";


interface FilterDrawerPropsType {
  filterSections?:any[]
  isOpen?:boolean
  onClose:() => void
}


export default function FilterDrawer({filterSections = [],isOpen = false,onClose,...props}: FilterDrawerPropsType) {
  const renderFilterSections = () => {
    return filterSections.map((filter,index) => {
      return (
        <div>
          {filter}
          {index !== filterSections.length - 1 && <Divider/>}
        </div>
      )
    })
  };
    return (
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={isOpen}
        {...props}
      >
        {renderFilterSections()}
      </Drawer>
    );
}
