import React from 'react'
import Gist from 'components/Gist'

export default props => <div><Gist gist={{description: 'I am a gist', privacy: 'hidden', blobs: [{filename: 'test.rb', body: 'foo bar baz'}, {filename: 'other.rb', body: 'another file'}]}}/></div>
