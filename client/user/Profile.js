import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import auth from './../auth/auth-helper'
import api from './api.user'

const Profile = ({match}) => {
  const jwt = auth.isAuthenticated()
  const [redirectToSignIn, setRedirectToSignIn] = useState(false)
  const [user, setUser] = useState()

  useEffect(() => {
    const userId = match.params.userId
    const token = jwt.token
    api.read(userId, token).then(result => {
      setUser(result)
    })
  }, [])

  if (redirectToSignIn) {
    return <Redirect to="/sign-in" />
  }

  return (
    <>
    <h1>My Profile</h1>
    <p>{user.name}</p>
    <a href={`/user/edit/${user._id}`}>Edit</a>
    </>
  )
}

export default Profile