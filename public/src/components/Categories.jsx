import React from "react";
function Categories({ activeCategory, setActiveCategory }) {
  const categories = ["Все", "Мясные", "Вегетарианские", "Острые"];
  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            key={item}
            onClick={() => {
              setActiveCategory(index);
            }}
            className={activeCategory === index ? "active" : ""}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
