class AddReleaseYearInrecipes < ActiveRecord::Migration[6.0]
  def change
    add_column :recipes, :release_year, :integer
  end
end
