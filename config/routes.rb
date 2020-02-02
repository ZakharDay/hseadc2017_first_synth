Rails.application.routes.draw do
  get 'synth/index'
  post 'save_preset', to: 'synth#save'
  get 'load_preset/:id', to: 'synth#load'
  get 'synth/set_current_distance', to: 'synth#set_current_distance'
  get 'serial_port/read', as: 'arduino'
  get 'serial_port/open'
  root 'synth#index'
end
