class RecipeSerializer
    def initialize(recipe)
        @recipe_object = recipe
    end

    def to_serialized_json
        @recipe_object.to_json(
            :include => {
                :characters =>{ :except => [:created_at, :updated_at] },
                :director =>{ :except => [:created_at, :updated_at]}
        },   :except =>[:director_id, :created_at, :updated_at]
        )
    end
end