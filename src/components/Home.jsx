import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNameTrainer } from "../store/slices/nameTrainer.slice";
import photo from "../assets/pokemon.photo.png";



const Home = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.name.value.trim();

    if (inputValue.length !== 0) {
      dispatch(setNameTrainer(inputValue));
      navigate("/pokedex");
    }
    e.target.name.value = "";
  };

  return (
    <div className="card__general">
      <img src={photo} alt="" className="card__photo" />
      <div className="card__container">
        <h1>Hi Trainer!</h1>
        <p className="card__text">To Start give me your trainer name</p>
        <form onSubmit={handleSubmit}>
          <input id="name" type="text" className="card__navigate" />
          <button className="card__btn">Get in</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
