import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { newBoardState, toDoState } from "./atom";
import Board from "./components/Board";
import NewBoardForm from "./components/NewBoardForm";

const Wrapper = styled.div`
  display: flex;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  gap: 10px;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  min-height: 150px;
`;

const AddBoard = styled(motion.button)`
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  width: 100%;
  min-height: 300px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: xx-large;
`;
const NewBoard = styled(motion.div)`
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  width: 30%;
  height: 30%;
  min-height: 200px;
  border: none;
  position: absolute;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [newBoard, setNewBoard] = useRecoilState(newBoardState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    console.log(info);
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]]; //toDoState object에서 source.droppableId인 키를 가진 배열
        const taskCard = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        sourceBoard.splice(destination?.index, 0, taskCard);
        return { ...allBoards, [destination.droppableId]: sourceBoard };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        const taskCard = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskCard);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} boardId={boardId} />
          ))}
          <AddBoard layoutId={"new"} onClick={() => setNewBoard("new")}>
            ➕
          </AddBoard>
        </Boards>
        <AnimatePresence>
          {newBoard ? (
            <>
              <Overlay
                variants={overlay}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => setNewBoard(null)}
              ></Overlay>
              <NewBoard layoutId={newBoard}>
                <NewBoardForm />
              </NewBoard>
            </>
          ) : null}
        </AnimatePresence>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
