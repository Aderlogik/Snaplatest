 Rails.application.routes.draw do
  
#  resources :users do
#    resources :locations
#  end
#  resources :users do
#    resources :subscriptions
#  end
  get 'subscriptions/index'

  get 'home/index'
  get 'book_service' => "home#book_service"
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
  resources :payment_methods
  resources :payments, only: [:index]
  resources :users do
    resources :subscriptions do
      resources :payments, only: [:create, :new, :show]
    end
    resources :locations
  end
  scope "new" do
    resources :subscriptions, only: [:new]
  end
end