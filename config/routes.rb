Rails.application.routes.draw do
  devise_for :users

  post "/graphql", to: "graphql#execute"
  mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql" if Rails.env.development?

  root to: 'react#root'

  # this allows for setting custom headers, meta tags, etc. specifically for these objects (i.e. open graph
  # meta tags) in lieu of full-blown SSR, while still rendering and routing correctly on the frontend
  get "/:owner/:id", to: 'react#gist'
  get "/:owner/:gist_id/:id", to: 'react#blob'

  get '*unmatched_route', to: 'react#root'
end
