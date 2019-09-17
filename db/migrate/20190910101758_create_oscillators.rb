class CreateOscillators < ActiveRecord::Migration[6.0]
  def change
    create_table :oscillators do |t|
      t.integer :frequency
      t.string :wave, default: 'square'
      t.integer :detune

      t.timestamps
    end
  end
end
