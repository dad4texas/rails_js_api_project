class recipesController < ApplicationController
    
    def index
        recipes = recipe.all
        render json: recipeSerializer.new(recipes).to_serialized_json
    end


    def create
        recipe = recipe.create(recipe_params)
        if params["characters_attributes"]['0']
          if params["characters_attributes"]['0']["name"] == ""
          Character.last.destroy
          recipe.characters.delete_all
          end
        end
        recipe.save
        render json: recipeSerializer.new(recipe).to_serialized_json
    end

    def destroy
        recipe = recipe.find_by id: params["id"]
        if recipe
          recipe.destroy
          render plain:  "Succesfully deleted from database!"
        else
          render plain: "Cannot find this recipe!"
        end
    end

private

   def recipe_params
    params.require(:recipe).permit(
        :title, :rt_score, :release_year, :description, :director_id, :image, :characters_attributes =>[:name,:image,:introduction]
      )
   end
  


end
