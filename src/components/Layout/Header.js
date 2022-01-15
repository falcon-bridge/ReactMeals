import React, { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";

import mealsImage from "../../assets/meals.jpg";

import classes from "./Header.module.css";

const Header = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        {/* <button>Cart</button> */}
        <HeaderCartButton />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food"></img>
      </div>
    </Fragment>
  );
};

export default Header;
