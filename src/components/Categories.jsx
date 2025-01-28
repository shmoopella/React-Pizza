import React from "react";

function Categories({ activeCategory, setActiveCategory }) {
  const categories = ["Все", "Мясные", "Вегетарианские", "Острые"];
  return (
    <div className="categories">
      <ul>
        {categories.map((item) => (
          <li
            key={item}
            onClick={() => {
              setActiveCategory(item);
            }}
            className={activeCategory === item ? "active" : ""}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
