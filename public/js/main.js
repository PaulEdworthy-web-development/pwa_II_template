const recipes = document.querySelector('.recipes')

// using Material Design shortcuts
document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  /* grabs the icon/button and classes/id's to activate them 
  the icon/button is enabled and the classes/id's are triggered
  to show when clicked */
  const menus = document.querySelectorAll('.side-menu')
  M.Sidenav.init(menus, {edge: 'right'})
  // add recipe form (same idea as side-nav)
  const forms = document.querySelectorAll('.side-form')
  M.Sidenav.init(forms, {edge: 'left'})
})

// render recipe data
const renderRecipe = (data, id) => {
  const html = `
    <div class="card-panel recipe white row" data-id="${id}">
      <img src="/public/img/dish.png" alt="recipe thumb">
      <div class="recipe-details">
        <div class="recipe-title">${data.title}</div>
        <div class="recipe-ingredients">${data.ingredients}</div>
      </div>
      <div class="recipe-delete">
        <i class="material-icons delete" data-id="${id}">delete_outline</i>
      </div>
    </div>
  `
  recipes.innerHTML += html
}

// remove recipe from DOM
const removeRecipe = (id) => {
  const recipe = document.querySelector(`.recipe[data-id=${id}]`)
  recipe.remove()
}