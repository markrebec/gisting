import React from 'react'
import Blob from 'components/Blob'

export default ({gist}) => <div>
  <p><strong>[{gist.privacy}]</strong> {gist.description}</p>
  {gist.blobs.map(blob => <Blob key={blob.id} blob={blob} />)}
</div>
