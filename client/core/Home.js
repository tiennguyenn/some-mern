import { Card, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import img from './../assets/unicornbike.jpg'

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
  }
}))

const Home = () => {
  const classes = useStyles()

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

export default Home