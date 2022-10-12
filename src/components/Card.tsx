import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atom";

const TaskCard = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.8;
  }
  button {
    border: none;
    display: block;
    &:hover {
      cursor: pointer;
    }
  }
`;

interface ICard {
  todoId: number;
  todoText: string;
  index: number;
  boardId: string;
}

function Card({ todoId, todoText, index, boardId }: ICard) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = () => {
    console.log(index);
    setToDos((allBoards) => {
      const sourceBoard = [...allBoards[boardId]];
      sourceBoard.splice(index, 1);
      return { ...allBoards, [boardId]: sourceBoard };
    });
  };
  return (
    <Draggable draggableId={todoId + ""} index={index}>
      {(provided) => (
        <TaskCard
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div>{todoText}</div>
          <button onClick={onClick}>❌</button>
        </TaskCard>
      )}
    </Draggable>
  );
}
export default React.memo(Card);
