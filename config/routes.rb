Rails.application.routes.draw do


  devise_for :users
  resources :users
  resources :posts do
    resources :tags
    resources :comments
  end
  resources :tags

  post '/posts/:id/create_tag', to: 'posts#create_tag', as:"create_tag"
  delete '/posts/:id/delete_tag', to: 'posts#delete_tag', as:"delete_tag"
  post '/posts/:id/create_comment', to: 'posts#create_comment', as:"create_comment"





  root 'posts#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
