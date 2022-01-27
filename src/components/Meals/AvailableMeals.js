import { useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/Mealitem";

import classes from "./AvailableMeals.module.css";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  // useEffect(() => {
  //   const fetchMeals = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://using-firebase-ac49a-default-rtdb.firebaseio.com/mels.jsn"
  //       );

  //       if (!response.ok) {
  //         throw new Error("Something went wrong");
  //       }

  //       const data = await response.json();
  //       // console.log(data);
  //       const loadedMeals = [];
  //       for (const key in data) {
  //         loadedMeals.push({
  //           id: key,
  //           name: data[key].name,
  //           description: data[key].description,
  //           price: data[key].price,
  //         });
  //       }
  //       setMeals(loadedMeals);
  //       setIsLoading(false);
  //     } catch (error) {
  //       setIsLoading(false);
  //       setHttpError(error.message);
  //     }
  //   };

  //   fetchMeals();
  // }, []);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://using-firebase-ac49a-default-rtdb.firebaseio.com/meals.jon"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      // console.log(data);
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    const checkError = async () => {
      try {
        await fetchMeals();
      } catch (error) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };

    checkError();
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  // const mealsList = DUMMY_MEALS.map((meal) => (
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
