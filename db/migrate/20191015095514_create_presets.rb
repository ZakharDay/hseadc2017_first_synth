class CreatePresets < ActiveRecord::Migration[6.0]
  def change
    create_table :presets do |t|
      t.string :data

      t.timestamps
    end
  end
end
