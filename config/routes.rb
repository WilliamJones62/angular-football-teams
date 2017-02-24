Rails.application.routes.draw do
  root 'application#index'
  resources :teams do
    # nested resource for teams
    resources :players
  end
  get '*path' => 'application#index'
end
