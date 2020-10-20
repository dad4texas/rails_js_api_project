class Createrecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.string :title
      t.string :description
      #t.datetime :release_date
      t.integer :director_id
      t.integer :rt_score
      t.string :image

      t.timestamps
    end
  end
end
