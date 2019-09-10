import React, { Component } from 'react'
import styled from 'styled-components'
import hljs from 'highlight.js'
import ReactMarkdown from 'react-markdown'

const Pre = styled.pre`
  margin: 0;
  padding: 0;
`

const Markdown = styled(ReactMarkdown)`
  padding: 20px;
`

export default class CodeBlock extends Component {
  constructor(props) {
    super(props)
    this.languageClass = this.languageClass.bind(this)
  }

  componentDidMount() {
    if (this.refs.codeblock) hljs.highlightBlock(this.refs.codeblock)
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
    // TODO should rendering markdown vs code actually be the responsibility of the blob, not the code block?
    const parts = this.props.filename.split('.')
    if (parts[parts.length - 1] == 'md') {
      return <Markdown source={this.props.children} />
    } else {
      return <Pre><code ref="codeblock" className={this.languageClass()}>{this.props.children}</code></Pre>
    }
  }
}
