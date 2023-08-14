import { meFragment } from '@/graphql/fragments'
import { SIGN_OUT_MUTATION } from '@/graphql/mutations'
import Router from 'next/router'
import React from 'react'

function Signout() {
  const signOut = () => {}

  return (
    <button onClick={signout} type="button">
      Выход
    </button>
  )
}

export default Signout
