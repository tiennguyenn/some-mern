import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import React, { useState } from 'react'

import api from './api.user'
import auth from './../auth/auth-helper'
import { Redirect } from 'react-router'

const DeleteUser = ({userId}) => {
  const [open, setOpen] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const clickButton = () => {
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
  }

  const deleteProfile = () => {
    const {token} = auth.isAuthenticated()
    try {
      api.remove(userId, token).then(data => {
        if (data && data.error) {
          console.log(data.error)
        } else {
          auth.clearUser()
          setRedirect(true)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  if (redirect) {
    return <Redirect to="/users"/>
  }

  return (
    <>
      <IconButton color="secondary" onClick={clickButton} >
        <Delete/>
      </IconButton>
      <Dialog open={open}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm delete account</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeDialog}>Cancel</Button>
          <Button color="secondary" onClick={deleteProfile} autoFocus="autoFocus">Remove</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteUser