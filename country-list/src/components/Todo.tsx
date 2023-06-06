import React from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";
import { nanoid } from "nanoid";
import { FiTrash, FiCheck } from "react-icons/fi";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import styled from "styled-components";

// styling components
const List = styled.li`
  display: flex;
  align-items: center;
  column-gap: 10px;
  margin: 0;
  list-style: none;
`;

const Div = styled.div`
  position: relative;
  display: flex;
  padding: 10px;
  flex-direction: column;

  span {
    position: absolute;
    top: 10px;
    left: 0;
    color: red;
  }

  p {
    position: absolute;
    top: 0px;
    left: 215px;
    color: red;
  }
`;

const Button = styled.button`
  font-size: 14px;
  padding: 5px;
  margin: 0;
  background-color: transparent;

  &:hover {
    background-color: #fff5fb;
  }
`;

// types
interface Country {
  name: string;
  id: string;
  visited: boolean;
  like: boolean;
}

interface Form {
  country: string;
}

const Countries = atom<Country[]>({
  key: "contryList",
  default: JSON.parse(localStorage.getItem("countries") || "[]")
});

const Todo = () => {
  const [countries, setCountries] = useRecoilState<Country[]>(Countries);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Form>();
  const onSubmit = ({ country }: Form) => {
    setCountries((state) => [
      ...state,
      { name: country, id: nanoid(), visited: false, like: false }
    ]);
    setValue("country", "");
  };

  const toggleVisited = (id: string) => {
    setCountries(
      countries.map((country) =>
        country.id === id ? { ...country, visited: !country.visited } : country
      )
    );
  };

  const onDelete = (id: string) => {
    const newCountries = countries.filter((country) => country.id !== id);
    setCountries(newCountries);
  };

  const toggleLike = (id: string) => {
    setCountries(
      countries.map((country) =>
        country.id === id ? { ...country, like: !country.like } : country
      )
    );
  };

  React.useEffect(() => {
    const storedCountries = localStorage.getItem("countries");
    if (storedCountries) {
      setCountries(JSON.parse(storedCountries));
    }
  }, [setCountries]);

  React.useEffect(() => {
    localStorage.setItem("countries", JSON.stringify(countries));
  }, [countries]);

  return (
    <>
      <Div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("country", { required: "나라를 입력하세요." })}
            type="text"
            placeholder="영국"
          />
          <p>{errors?.country?.message}</p>
          <span>*</span>
          <button type="submit">가즈아!</button>
        </form>
      </Div>
      <h2>가고 싶다!</h2>
      <ul style={{ padding: 0, margin: 0 }}>
        {countries
          .filter(
            (country) => country.visited === false && country.like === false
          )
          .map((country) => (
            <List key={country.id}>
              {country.name}

              <Button onClick={() => toggleVisited(country.id)}>
                <FiCheck />
              </Button>
              <Button onClick={() => onDelete(country.id)}>
                <FiTrash />
              </Button>
            </List>
          ))}
      </ul>
      <h2>가봤다!</h2>
      <ul style={{ padding: 0, margin: 0 }}>
        {countries
          .filter(
            (country) => country.visited === true && country.like === false
          )
          .map((visitedCountries) => (
            <List key={visitedCountries.id}>
              {visitedCountries.name}
              <Button onClick={() => toggleVisited(visitedCountries.id)}>
                <FiCheck />
              </Button>
              <Button onClick={() => toggleLike(visitedCountries.id)}>
                <FcLikePlaceholder />
              </Button>
              <Button onClick={() => onDelete(visitedCountries.id)}>
                <FiTrash />
              </Button>
            </List>
          ))}
      </ul>
      <h2>좋아한다!</h2>
      <ul style={{ padding: 0, margin: 0 }}>
        {countries
          .filter((country) => country.like === true)
          .map((likedCountries) => (
            <List key={likedCountries.id}>
              {likedCountries.name}
              <Button onClick={() => toggleLike(likedCountries.id)}>
                <FcLike />
              </Button>
              <Button onClick={() => onDelete(likedCountries.id)}>
                <FiTrash />
              </Button>
            </List>
          ))}
      </ul>
    </>
  );
};

export default Todo;
