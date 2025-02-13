import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import MySkeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [activeCategory, setActiveCategory] = React.useState(0);
  const [selectedSort, setSortName] = React.useState({
    name: "популярности",
    sortValue: "rating",
    order: "desc",
  });

  const [currentPage, setCurrentPage] = React.useState(1);

  const { searchValue } = React.useContext(SearchContext);
  function getPizzas(url) {
    setIsLoading(true);
    fetch(url)
      .then((response) => {
        return response.ok ? response.json() : [];
      })
      .then((response) => {
        setPizzas(response);
        setIsLoading(false);
        console.log("pizzas: ", response);
      });
  }

  React.useEffect(() => {
    const url = new URL("https://6784503c1ec630ca33a4389a.mockapi.io/pizzas");
    url.searchParams.append(
      "category",
      activeCategory === 0 ? "" : activeCategory,
    );
    url.searchParams.append("sortBy", selectedSort.sortValue);
    url.searchParams.append("order", selectedSort.order);
    url.searchParams.append("title", searchValue);
    url.searchParams.append("limit", 3);
    url.searchParams.append("page", currentPage);
    getPizzas(url);
  }, [activeCategory, selectedSort, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <Sort selectedSort={selectedSort} setSortName={setSortName} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <MySkeleton key={index} />)
          : pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination pageCount={4} handlePageClick={setCurrentPage} />
    </div>
  );
}

export default Home;
