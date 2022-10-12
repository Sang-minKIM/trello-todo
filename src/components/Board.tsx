import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atom";
import Card from "./Card";

const Container = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  width: 100%;
  min-height: 300px;
  position: relative;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 700;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Area = styled.div<ISnapshotProps>`
  flex-grow: 1;
  padding: 10px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.draggingFromThisWith
      ? "#d6c5a5"
      : "transparent"};
  transition: 0.3s ease-in;
`;

const Form = styled.form`
  width: 100%;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  input {
    border-radius: 5px;
    border: none;
    width: 100%;
    padding: 10px;
  }
`;
const Delete = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  /* border: none; */
  border-radius: 5px;
  width: 30px;
  height: 30px;
  font-size: larger;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IBoard {
  boardId: string;
}
interface IForm {
  todo: string;
}

interface ISnapshotProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

function Board({ boardId }: IBoard) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ todo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: todo,
    };
    setToDos((allBoards) => {
      return { ...allBoards, [boardId]: [newToDo, ...allBoards[boardId]] };
    });
    setValue("todo", "");
  };
  const onDelete = () => {
    console.log(boardId);

    setToDos((allBoards) => {
      const boards = { ...allBoards };
      delete boards[boardId];
      return boards;
    });
  };
  return (
    <Container key={boardId}>
      <Delete onClick={onDelete}>𝘅</Delete>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("todo", { required: true })}
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            isDraggingOver={snapshot.isDraggingOver}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos[boardId].map((todo, index) => (
              <Card
                boardId={boardId}
                key={todo.id}
                todoId={todo.id}
                todoText={todo.text}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Container>
  );
}
export default Board;
