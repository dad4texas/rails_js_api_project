const BACKEND_URL = "http://localhost:3000";
const cardArea = document.getElementById("card-area")
const form = document.querySelector("form")
const select = form.querySelector('select')
let character_counter = 0
const directors_names = []
let addrecipe = false



document.addEventListener("DOMContentLoaded", ()=>{
  fetchrecipes()

});

  function fetchrecipes(){
    fetch(`${BACKEND_URL}/recipes`)
    .then(response => response.json())
    .then(json => {
      for (recipe of json){
        let mObject = new recipe(recipe);
        mObject.addrecipetoPage()
      } 
    }   
      );
  }

let button = document.querySelector("div#create-recipe")
button.addEventListener("click",()=>{
  if(addrecipe){
    form.style.display = "none"
  }else{
    form.style.display = "block"
  }
  addrecipe = !addrecipe
})

form.addEventListener("submit", (e)=>{
  e.preventDefault();
  let inputs = form.querySelectorAll("input")
  let inputsForNames = form.getElementsByClassName("character-names")
  let inputsForImages = form.getElementsByClassName("character-images")
  let inputArray = [inputs,inputsForNames,inputsForImages]
  let textareas = form.querySelectorAll("textarea")


  if(!!inputs[0].value){
    recipe.createrecipe(inputArray,textareas)
  }else{
    alert("Error...A recipe must at least have a name!")
  }
})

function clearAllInputs(inputs, textareas){
  inputs.forEach((input)=>input.value = "")
  textareas.forEach((text)=>text.value = "")
  document.querySelector("input[type='submit']").value = 'submit'
  document.getElementById("add-characters").value = 'Add more characters'
}


function addMoreCharacter(){
  character_counter +=1
  form.innerHTML += `
  
  <br>
  <label class="character-name">Character name</label>
  <input class="character-names" type="text" name="recipe[characters_attributes][${character_counter}][name]" id="recipe[characters_attributes][${character_counter}][name]" placeholder="A character can't be saved without a name"></br>
    

  <label>Character image</label>
  <input class = "character-images" type="text" name="recipe[characters_attributes][${character_counter}][image]" id="recipe[characters_attributes][${character_counter}][image]" placeholder="Write down the URL"></br>

  <label>Character introduction</label>
  <textarea name="recipe[characters_attributes][${character_counter}][introduction]" id="recipe[characters_attributes][${character_counter}][introduction]"></textarea></br>
  <br>
  `
  document.getElementsByClassName("submit")[0].remove()
  form.innerHTML +='<input class="submit" type="submit" value="submit">'
}

let buttonForSorting = document.getElementById("sort-button")
buttonForSorting.addEventListener("click", function(){
  fetch(`${BACKEND_URL}/recipes`)
  .then(resp=>resp.json())
  .then((array)=>{
  array.sort(sorting)
  cardArea.innerHTML=""
  array.forEach((recipe)=>{
    let mObject = new recipe(recipe);
    mObject.addrecipetoPage()
  })
})
})

function sorting(a, b) {
  let nameA = a.title.toUpperCase(); 
  let nameB = b.title.toUpperCase(); 
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}




 

  

