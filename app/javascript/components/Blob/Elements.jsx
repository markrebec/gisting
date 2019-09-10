import React from 'react'
import styled from 'styled-components'
import CodeBlock from 'components/CodeBlock'

export const Header = styled.div`
  padding: 5px 10px;
`

export const Title = styled.h4`
  margin: 0;
  padding: 0;
  font-size: 1.1em;
  font-family: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
`

export const Body = styled.div`
  margin-bottom: 25px;
`

export const StyledBlock = styled(CodeBlock)`
  max-height: ${({preview}) => preview ? "15.5em" : "auto"};
  overflow: hidden;
`
