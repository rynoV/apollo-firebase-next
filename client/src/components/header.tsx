import React from 'react'
import styled from 'react-emotion'
import { size } from 'polished'

import { colors, unit } from '../styles'
import dog1 from '../../../static/images/dog-1.png'
import dog2 from '../../../static/images/dog-2.png'
import dog3 from '../../../static/images/dog-3.png'

const max      = 25 // 25 letters in the alphabet
const offset   = 97 // letter A's charcode is 97
const avatars  = [dog1, dog2, dog3]
const maxIndex = avatars.length - 1

function pickAvatarByEmail(email: string) {
  const charCode   = email.toLowerCase().charCodeAt(0) - offset
  const percentile = Math.max(0, Math.min(max, charCode)) / max
  return avatars[Math.round(maxIndex * percentile)]
}

const windowGlobal = typeof window !== 'undefined' && window

export default function Header({ image, children = 'Space Explorer' }) {
  let email
  if (windowGlobal && windowGlobal.localStorage) {
    email = window.localStorage.getItem('token')
  }
  const avatar = image || (email && pickAvatarByEmail(email))
  return (
    <Container>
      <Image round={!image} src={avatar} alt='Space dog' />
      <div>
        <h2>{children}</h2>
        <Subheading>{email}</Subheading>
      </div>
    </Container>
  )
}

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

const Container = styled('div')({
  display     : 'flex',
  alignItems  : 'center',
  marginBottom: unit * 4.5,
})

const Image = styled('img')(size(134), props => ({
  marginRight : unit * 2.5,
  borderRadius: props.round && '50%',
}))

const Subheading = styled('h5')({
  marginTop: unit / 2,
  color    : colors.textSecondary,
})
