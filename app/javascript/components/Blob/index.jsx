import React from 'react'

export default ({blob}) => <div>
  <h4><code>{blob.filename}</code></h4>
  <pre>{blob.body}</pre>
</div>
