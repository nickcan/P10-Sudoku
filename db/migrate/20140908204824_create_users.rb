class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |col|
      col.string :username
      col.string :password_hash
      col.integer :wins, default: 0
      col.integer :losses, default: 0
      col.timestamps
    end
  end
end
