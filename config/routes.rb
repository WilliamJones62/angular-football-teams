Rails.application.routes.draw do
  root 'application#index'
  # destroy as get requests
  get '/teams/:id/destroy', to: 'teams#destroy'
  resources :player_games
  resources :teams do
    # nested resource for teams
    resources :players
    resources :games
  end
  get '*path' => 'application#index'
end
