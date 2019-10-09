Rails.application.routes.draw do
  get 'synth/index'
  root 'synth#index'
end
