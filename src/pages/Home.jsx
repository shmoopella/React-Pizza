import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import MySkeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
// import sort from "../components/Sort";

function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [activeCategory, setActiveCategory] = React.useState("Все");
  const [sortName, setSortName] = React.useState("популярности");
  const [order, setOrder] = React.useState("asc");
  function getPizzas(url) {
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setPizzas(response);
        setIsLoading(false);
      });
  }
  function defineSortOrder() {
    let sortValue = "";
    let categoryValue = "";
    let orderValue = order;
    switch (sortName) {
      case "популярности":
        sortValue = "rating";
        break;
      case "цене":
        sortValue = "price";
        break;
      case "алфавиту":
        sortValue = "title";
        break;
      default:
        sortValue = "";
    }
    switch (activeCategory) {
      case "Мясные":
        categoryValue = 1;
        break;
      case "Вегетарианские":
        categoryValue = 2;
        break;
      case "Острые":
        categoryValue = 3;
        break;
      default:
        categoryValue = "";
    }
    return [sortValue, categoryValue, orderValue];
  }

  React.useEffect(() => {
    getPizzas("https://6784503c1ec630ca33a4389a.mockapi.io/pizzas");
  }, []);

  React.useEffect(() => {
    const url = new URL("https://6784503c1ec630ca33a4389a.mockapi.io/pizzas");
    const [sortValue, categoryValue, orderValue] = defineSortOrder();
    url.searchParams.append("category", categoryValue);
    url.searchParams.append("sortBy", sortValue);
    url.searchParams.append("order", orderValue);
    getPizzas(url);
  }, [activeCategory, sortName, order]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <Sort
          sortName={sortName}
          setSortName={setSortName}
          order={order}
          setOrder={setOrder}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <MySkeleton key={index} />)
          : pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
}

export default Home;
