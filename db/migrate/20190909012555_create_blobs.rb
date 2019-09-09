class CreateBlobs < ActiveRecord::Migration[5.2]
  def change
    create_table :blobs do |t|
      t.string :filename
      t.text :body
      t.integer :gist_id, null: false, default: nil

      t.timestamps
    end

    add_index :blobs, :gist_id
  end
end
