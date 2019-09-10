gisting = User.create!(username: 'gisting', email: 'gisting@example.com', password: 'password')

Audited.audit_class.as_user(gisting) do
  readme = CreateGist.call(
    description: 'The README file for this project',
    privacy: :listed,
    user: gisting,
    blobs: [{filename: 'README.md', body: File.read(Rails.root.join('README.md'))}]
  )

  models = CreateGist.call(
    description: 'A collection of models used in this application',
    privacy: :listed,
    user: gisting,
    blobs: Dir[Rails.root.join('app', 'models', '**/*.rb')].map { |model|
      {filename: File.basename(model), body: File.read(model)}
    })

  interactors = CreateGist.call(
    description: 'A collection of interactors used in this application',
    privacy: :listed,
    user: gisting,
    blobs: Dir[Rails.root.join('app', 'interactors', '**/*.rb')].map { |interactor|
      {filename: File.basename(interactor), body: File.read(interactor)}
    })

  controllers = CreateGist.call(
    description: 'A collection of controllers used in this application',
    privacy: :listed,
    user: gisting,
    blobs: Dir[Rails.root.join('app', 'controllers', '**/*.rb')].map { |controller|
      {filename: File.basename(controller), body: File.read(controller)}
    })

  routes = CreateGist.call(
    privacy: :listed,
    user: gisting,
    blobs: [{filename: 'config/routes.rb', body: File.read(Rails.root.join('config', 'routes.rb'))}]
  )

  components = CreateGist.call(
    description: 'A collection of React Components used in this application',
    privacy: :listed,
    user: gisting,
    blobs: Dir[Rails.root.join('app', 'javascript', 'components', '**/*.jsx')].map { |component|
      {filename: component.split('javascript/components/').last, body: File.read(component)}
    })

  webpacker = CreateGist.call(
    description: 'The Webpack and Webpacker configs used in this application',
    privacy: :listed,
    user: gisting,
    blobs: [
      {filename: 'webpacker.yml', body: File.read(Rails.root.join('config', 'webpacker.yml'))},
      Dir[Rails.root.join('config', 'webpack', '**/*.js')].map { |config|
        {filename: config.split('config/').last, body: File.read(config)}
      }
    ].flatten
  )

  types = CreateGist.call(
    description: 'A collection of GraphQL Type definitions in this application',
    privacy: :listed,
    user: gisting,
    blobs: Dir[Rails.root.join('app', 'graphql', 'types', '**/*.rb')].map { |type|
      {filename: File.basename(type), body: File.read(type)}
    })
end


faker = User.create!(username: 'faker', email: 'faker@example.com', password: 'password')

Audited.audit_class.as_user(faker) do
  CreateGist.call(
    description: Faker::Lorem.sentence,
    privacy: :listed,
    user: faker,
    blobs: [{filename: Faker::File.file_name(ext: 'rb'), body: Faker::Source.hello_world}]
  )

  CreateGist.call(
    description: Faker::Lorem.sentence,
    privacy: :listed,
    user: faker,
    blobs: [
      {filename: Faker::File.file_name(ext: 'js'), body: Faker::Source.hello_world(lang: :javascript)},
      {filename: Faker::File.file_name(ext: 'js'), body: Faker::Source.print(str: 'foobar', lang: :javascript)}
    ]
  )

  CreateGist.call(
    description: Faker::Lorem.sentence,
    privacy: :listed,
    user: faker,
    blobs: [{filename: Faker::File.file_name(name: 'MARKDOWN', ext: 'md'), body: Faker::Markdown.sandwich(sentences: 5, repeat: 10)}]
  )
end
