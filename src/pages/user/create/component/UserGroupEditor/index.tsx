import React, {useState} from 'react';
import styles from './style.less'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {Card, Col, Row} from "antd";
import UserCard from "@/pages/user/create/component/UserGroupEditor/components/UserCard";
import UserContainer from "@/pages/user/create/component/UserGroupEditor/components/UserContainer";

interface UserGroupEditorPropsType {

}

function getNotSelectUserList() {
  const userList = []
  for (let idx = 0; idx < 25; idx++) {
    userList.push({
      id: `${idx}`,
      name: `user-${idx}`
    })
  }
  return userList
}

function getSelectedUserList() {
  const userList = []
  for (let idx = 25; idx < 30; idx++) {
    userList.push({
      id: `${idx}`,
      name: `user-${idx}`
    })
  }
  return userList
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
export default function UserGroupEditor({}: UserGroupEditorPropsType) {
  const [userList, setUserList] = useState<{ id: number, name: string }[]>(getNotSelectUserList());
  const [selectedUserList, setSelectedUserList] = useState<{ id: number, name: string }[]>(getSelectedUserList());
  const getUserList = id => ({
    "droppable": userList,
    "droppable2": selectedUserList
  }[id])
  const onDragEnd = result => {
    const {source, destination} = result;
    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getUserList(source.droppableId),
        source.index,
        destination.index
      );

      if (source.droppableId === "droppable") {
        setUserList(items)
      } else {
        setSelectedUserList(items)
      }

    } else {
      const result = move(
        getUserList(source.droppableId),
        getUserList(destination.droppableId),
        source,
        destination
      );
      const {droppable, droppable2} = result
      setSelectedUserList(droppable2)
      setUserList(droppable)
    }
  };
  return (
    <div>
      <div>

      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Row gutter={16}>
          <Col>
            <Droppable droppableId="droppable">
              {
                (provided, snapshot) => (
                  <UserContainer  ref={provided.innerRef}>
                    {userList.map((user: any, index) => (
                      <Draggable
                        key={user.id}
                        draggableId={user.id}
                        index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <UserCard username={user.name} id={user.id} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </UserContainer>
                )
              }
            </Droppable>
          </Col>
          <Col>
            <Droppable droppableId="droppable2">
              {
                (provided, snapshot) => (
                  <UserContainer  ref={provided.innerRef}>
                    {selectedUserList.map((user: any, index) => (
                      <Draggable
                        key={user.id}
                        draggableId={user.id}
                        index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <UserCard username={user.name} id={user.id} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </UserContainer>
                )
              }
            </Droppable>
          </Col>
        </Row>
      </DragDropContext>
    </div>
  );
}
