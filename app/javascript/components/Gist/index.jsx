import React from 'react'
import Blob from 'components/Blob'

export default ({gist}) => <div>
  <p>{gist.description}</p>
  <p>{gist.privacy}</p>
  {gist.blobs.map(blob => <Blob blob={blob} />)}
</div>
