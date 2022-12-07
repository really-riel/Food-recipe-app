const searchBtn = document.querySelector("#search_btn");
const SearchInput = document.querySelector("#search_input");
const mealDisplay = document.querySelector("#meal");
const mealDisplayContent = document.querySelector(".meal_details_content");
const mealDisplayContentCancelButton =
  document.querySelector(".recipe_close_btn");

searchBtn.addEventListener("click", (e) => {
  const SearchInputText = SearchInput.value.trim();
  if (!SearchInputText) return;

  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${SearchInputText}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
          <div class="meal_item" data-id= "${meal.idMeal}">
            <div class="meal_img">
              <img src="${meal.strMealThumb}" alt="food" />
            </div>
            <div class="meal_name">
              <h3>${meal.strMeal}</h3>
              <a href="#" class="recipe_btn">Get recipe</a>
            </div>
          </div>
      `;
        });

        mealDisplay.innerHTML = html;
        mealDisplay.classList.remove("notFound");
      } else {
        html = `Sorry couldn't find anything on ${SearchInput.value
          .toUpperCase()
          .italics()}`;
        mealDisplay.classList.add("notFound");
        mealDisplay.innerHTML = html;
      }
    });
});

mealDisplay.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("recipe_btn")) {
    let mealItemId = document.querySelector(".meal_item");

    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItemId.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        let meal = data.meals[0];
        let html = `

        <h2 class="recipe_title">${meal.strMeal}</h2>
            <p class="recipe_category">${meal.strCategory}</p>
            <div class="recipe_instruct">
              <h3>Instructions:</h3>
              <p>
               ${meal.strInstructions}
              </p>
             
            </div>
            <div class="recipe_meal_img">
              <img src="${meal.strMealThumb}" alt="" srcset="" />
            </div>
            <div class="recipe_link">
              <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
            </div>

`;

        mealDisplayContent.innerHTML = html;
        mealDisplayContent.parentElement.classList.add("showRecipe");
      });
  }
});

mealDisplayContentCancelButton.addEventListener("click", () => {
  mealDisplayContent.parentElement.classList.remove("showRecipe");
});
