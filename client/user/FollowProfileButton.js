import React from 'react'
import { Button } from "@material-ui/core"
import api from './api.user'

const FollowProfileButton = (props) => {
  const unfollow = () => {
    props.handleFollow(api.unfollow)
  }

  const follow = () => {
    props.handleFollow(api.follow)
  }

  return (
    <>
    {
      props.following ?
        (<Button variant="outlined" color="secondary" onClick={unfollow}>UnFollow</Button>) :
        (<Button variant="outlined" color="primary" onClick={follow}>Follow</Button>)
    }
    </>
  )
}

export default FollowProfileButton