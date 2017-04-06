 Rails.application.routes.draw do
#  resources :users do
#    resources :subscriptions
#  end
  get 'subscriptions/index'

  get 'home/index'
  # root to: "home#index"

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    passwords: 'users/passwords',
    registrations: 'users/registrations'
  }

  devise_scope :user do
    root to: "users/sessions#new"
  end

  resources :users do
    # resources :services
    resources :subscriptions
  end
end