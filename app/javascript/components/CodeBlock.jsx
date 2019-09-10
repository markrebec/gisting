import React, { Component } from 'react'
import styled from 'styled-components'
import hljs from 'highlight.js'

const Pre = styled.pre`
  margin: 0;
  padding: 0;
`

export default class CodeBlock extends Component {
  constructor(props) {
    super(props)
    this.languageClass = this.languageClass.bind(this)
  }

  componentDidMount() {
    hljs.highlightBlock(this.refs.codeblock)
  }

  languageClass() {
    const parts = this.props.filename.split('.')

    switch(parts[parts.length - 1]) {
      case 'rb':
        return 'ruby'
      case 'js':
        return 'javascript'
      case 'jsx':
        return 'javascript'
    }
  }

  render() {
    const parts = this.props.filename.split('.')
    if (parts[parts.length - 1] == 'md') {
      // TODO render markdown
      return <Pre><code ref="codeblock" className={this.languageClass()}>{this.props.children}</code></Pre>
    } else {
      return <Pre><code ref="codeblock" className={this.languageClass()}>{this.props.children}</code></Pre>
    }
  }
}
