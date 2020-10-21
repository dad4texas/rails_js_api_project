class Recipe{
    constructor(recipe){
      this.id = recipe.id
      this.title = recipe.title
      this.description = recipe.description
      this.rt_score = recipe.rt_score
      this.image = recipe.image
      this.release_year = recipe.release_year
      this.director = new Director(recipe.director)
      this.characters = recipe.characters.map(c=>new Character(c))
    }
  
     addRecipetoPage(){
      let divCard = document.createElement('div')
      divCard.setAttribute("id", this.title)
      divCard.setAttribute("class","recipe-card")
      
      var h2 =  document.createElement('h2')
      h2.innerText = this.title
  
      let divForImg = document.createElement("div")
      divForImg.setAttribute("class","images")
      let img = document.createElement('img')
      img.setAttribute("alt", "recipe picture")
      if(this.image){
        img.setAttribute("src", this.image)
      }else{
        img.setAttribute("src", "./src/images/noImage.jpg")
      }
      divForImg.append(img)
    
      let infoCollect = document.createElement('div')
      infoCollect.setAttribute("class","recipe-info")
      this.addInfoCollect(infoCollect)
   
  
      divCard.append(h2,divForImg,infoCollect)
      cardArea.append(divCard)
  
    }
  
    addInfoCollect(infoCollect){
    
      let pForInfo = document.createElement('p')
      pForInfo.innerHTML = 
      `<strong>Rotten Tomato Score</strong>:  ${this.rt_score}<br>
      <strong>Release year</strong>:  ${this.release_year}<br>
      <strong>Description</strong>:  ${this.description}<br>`
  
      this.director.addDirectorTotheBlock(infoCollect)
      infoCollect.append(pForInfo)
      if (!this.characters.length == 0){
        Character.addCharactersTotheBlock(infoCollect,this.characters)
       }
      this.addDeleteButton(infoCollect)
      }
  
     addDeleteButton(infoCollect){
      let recipe = this
      let button = document.createElement("button")
      button.innerText = "Delete this video"
      button.setAttribute("class", "delete-recipe")
      button.onclick = Recipe.deleteRecipe.bind(recipe)
      infoCollect.append(button)
     }
  
    
     static createRecipe(inputArray,textareas){
         let characters_attributes = {};
         let inputs = inputArray[0]
         let inputsForNames = inputArray[1]
         let inputsForImages = inputArray[2]
  
         for (let i = 0; i< character_counter +1; i++){
          
             let name,image,introduction
             name = inputsForNames[i].value
             image = inputsForImages[i].value
             introduction = textareas[i+1].value
  
            if (!name==""){
            let object = {
              name: name,
              image: image,
              introduction: introduction 
            }
            characters_attributes[i] = object
            }
        }
        
        let formData = {
          title: inputs[0].value,
          director_id: select.value,
          description: textareas[0].value,
          image: inputs[1].value,
          rt_score: inputs[2].value,
          release_year: inputs[3].value,
          characters_attributes: characters_attributes
        }
  
        let configObj = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(formData)
        };
  
        fetch(`${BACKEND_URL}/recipes`, configObj)
        .then(resp=>resp.json())
        .then(json=>{
          let mObject = new Recipe(json);
          mObject.addRecipetoPage();
          alert("Congrats! recipe created! Scroll down to see your new recipe!")
         }
        )
        .then(()=>clearAllInputs(inputs,textareas))
        .catch(error=>{
          alert("Error! Can't create a recipe...");
          console.log(error.message);
        }
        )
     }
  
     static deleteRecipe(){
      let result = confirm("Do you want to delete this recipe?")
      if (result){
      let configObj = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          id: this.id
        })
      };
  
       fetch(`${BACKEND_URL}/recipes/${this.id}`, configObj)
       .then(resp=>resp.text())
       .then(resp=>alert(resp))
       .then(()=>document.getElementById(this.title).remove())
       .catch(error=>console.log(error))
    }    
    }
  }