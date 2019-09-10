user = User.create!(username: 'gisting', email: 'gisting@example.com', password: 'password')

Audited.audit_class.as_user(user) do
  models = CreateGist.call(
    description: 'Application Models',
    privacy: :listed,
    user: user,
    blobs: Dir[Rails.root.join('app', 'models', '**/*.rb')].map { |model|
      {filename: File.basename(model), body: File.read(model)}
    })

  interactors = CreateGist.call(
    description: 'Application Interactors',
    privacy: :listed,
    user: user,
    blobs: Dir[Rails.root.join('app', 'interactors', '**/*.rb')].map { |interactor|
      {filename: File.basename(interactor), body: File.read(interactor)}
    })

  controllers = CreateGist.call(
    description: 'Applicaiton Controllers',
    privacy: :listed,
    user: user,
    blobs: Dir[Rails.root.join('app', 'controllers', '**/*.rb')].map { |controller|
      {filename: File.basename(controller), body: File.read(controller)}
    })

  routes = CreateGist.call(
    privacy: :listed,
    user: user,
    blobs: [{filename: 'config/routes.rb', body: File.read(Rails.root.join('config', 'routes.rb'))}]
  )

  components = CreateGist.call(
    description: 'React Components',
    privacy: :listed,
    user: user,
    blobs: Dir[Rails.root.join('app', 'javascript', 'components', '**/*.jsx')].map { |component|
      {filename: component.split('javascript/components/').last, body: File.read(component)}
    })

  types = CreateGist.call(
    description: 'GraphQL Types',
    privacy: :listed,
    user: user,
    blobs: Dir[Rails.root.join('app', 'graphql', 'types', '**/*_type.rb')].map { |type|
      {filename: File.basename(type), body: File.read(type)}
    })
end
