Rails.application.routes.draw do


  devise_for :users
  resources :users
  resources :posts

  post '/posts/:id/createtag', to: 'post#createtag', as:"create_tag"


  root 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
