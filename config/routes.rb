Rails.application.routes.draw do
  devise_for :users

  post "/graphql", to: "graphql#execute"
  mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql" if Rails.env.development?

  root to: 'react#root'
  get "/gists/:id", to: 'react#gist'
  get "/gists/:gist_id/:id", to: 'react#blob'
end
