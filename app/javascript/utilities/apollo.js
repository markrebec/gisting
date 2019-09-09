import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'same-origin',
  },
  request: (operation) => {
    const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content')
    operation.setContext({
      headers: { "X-CSRF-Token": csrfToken }
    })
  },
})

export default client
