Rails.application.routes.draw do
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
    root to: "devise/sessions#new"
  end

  resources :users do
    resources :services
  end
end
