// offline data
db.enablePersistence()
.catch(function(err) {
  if(err.code == 'failed-precondition') {
    // probable multiple tabs open
    console.log('presistence failed')
  } else if(err.code == 'unimplemented') {
    // lack of browser support
    console.log('persistence is not available')
  } 
})

// real time listener
// when there's a change it takes a snapshot (like data in API calls)
db.collection('recipes').onSnapshot((snapshot) => {
  snapshot.docChanges().forEach(change => {
    // console.log(change, change.doc.data(), change.doc.id)
    if(change.type === 'added') {
      // add doc to webpage
      renderRecipe(change.doc.data(), change.doc.id)
    }
    if(change.type === 'removed') {
      // remove doc from webpage
      removeRecipe(change.doc.id)
    }
  });
})

// add new recipe
const form = document.querySelector('form')
form.addEventListener('submit', evt => {
  evt.preventDefault()

  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value
  }

  db.collection('recipes').add(recipe)
  .catch(err => console.log(err))

  form.title.value = ''
  form.ingredients.value = ''
})


// delete recipe
// trash can is an icon not a button, keep in mind for other projects
// to target whatever the delete is
const recipeContainer = document.querySelector('.recipes');
recipeContainer.addEventListener('click', evt => {
  if(evt.target.tagName === 'I'){
    const id = evt.target.getAttribute('data-id')
    //console.log(id)
    db.collection('recipes').doc(id).delete()
  }
})