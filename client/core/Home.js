import { Card, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'

import FindPeople from '../user/FindPeople'
import Newsfeed from '../post/Newsfeed'
import img from './../assets/images/unicornbike.jpg'

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  media: {
    minHeight: 400
  },
  root: {
    flexGrow: 1,
    margin: 30
  }
}))

const Home = () => {
  const classes = useStyles()
  const [defaultPage, setDefaultPage] = useState(false)

  if (defaultPage) {
    return (
      <Card className={classes.card}>
        <Typography variant="h6" className={classes.title} >Home Page</Typography>
        <CardMedia className={classes.media} image={img} title="Unicorn Bike" />
        <CardContent>
          <Typography>
            Welcome to MERN Socical Media
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={8} sm={7}>
          <Newsfeed />
        </Grid>
        <Grid item xs={6} sm={5}>
          <FindPeople/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home