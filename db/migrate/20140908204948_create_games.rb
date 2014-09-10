class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |col|
      col.string :unsolved_board
      col.string :solved_board
      col.belongs_to :user
      col.timestamps
    end
  end
end
