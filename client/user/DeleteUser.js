import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import React, { useState } from 'react'

const DeleteUser = () => {
  const [open, setOpen] = useState(false)
  const clickButton = () => {
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
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
          <Button color="secondary">Remove</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteUser