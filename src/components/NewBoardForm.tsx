import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { newBoardState, toDoState } from "../atom";

const Form = styled.form`
  height: 100%;
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
`;
const Title = styled.input`
  margin-top: 30px;
  border-radius: 5px;
  border: none;
  width: 100%;
  padding: 10px;
  &:focus {
    outline: none;
  }
`;
const Submit = styled.input`
  border: none;
  border-radius: 5px;
  height: 30px;
  width: 50%;
  font-weight: 600;
  font-size: medium;
`;
const Button = styled.input`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  font-size: larger;
`;
interface IForm {
  title: string;
}

export default function NewBoardForm() {
  const setNewBoard = useSetRecoilState(newBoardState);
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = ({ title }: IForm) => {
    setToDos((allBoards) => {
      return { ...allBoards, [title]: [] };
    });
    setNewBoard(null);
  };
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Title
        {...register("title", { required: true })}
        placeholder="Board title.."
      />
      <Submit type="submit" value="Done" />
      <Button
        onClick={() => {
          setNewBoard(null);
        }}
        type="button"
        value="𝘅"
      />
    </Form>
  );
}
