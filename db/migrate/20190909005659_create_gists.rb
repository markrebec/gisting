class CreateGists < ActiveRecord::Migration[5.2]
  def change
    create_table :gists do |t|
      t.string  :description
      t.integer :privacy, null: false, default: 0
      t.integer :user_id, null: false

      t.timestamps
    end

    add_index :gists, :user_id
  end
end
