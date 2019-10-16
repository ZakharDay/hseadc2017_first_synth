Rails.application.routes.draw do
  get 'synth/index'
  post 'save_preset', to: 'synth#save'
  get 'load_preset/:id', to: 'synth#load'
  root 'synth#index'
end
