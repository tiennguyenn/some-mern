import React from 'react'
import { Card, Divider, makeStyles, Typography } from "@material-ui/core"
import NewPost from './NewPost'

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    paddingTop: 0,
    paddingBottom: theme.spacing(3)
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    fontSize: '1em'
  },
  media: {
    minHeight: 330
  }
}))

const Newsfeed = () => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <Typography type="title" className={classes.title}>Newsfeed</Typography>
      <Divider/>
      <NewPost/>
    </Card>
  )
}

export default Newsfeed