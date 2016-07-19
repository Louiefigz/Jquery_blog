Rails.application.routes.draw do


  devise_for :users
  resources :users
  resources :posts

  post '/posts/:id/create_tag', to: 'posts#create_tag', as:"create_tag"



  root 'posts#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
