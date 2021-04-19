import { Button, Card, CardContent, CardHeader, CardActions, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#efefef',
    padding: `${theme.spacing(3)}px 0px 1px`
  },
  card: {
    maxWidth:600,
    margin: 'auto',
    marginBottom: theme.spacing(3),
    backgroundColor: 'rgba(65, 150, 136, 0.09)',
    boxShadow: 'none'
  },
  cardContent: {
    backgroundColor: 'white',
    paddingTop: 0,
    paddingBottom: 0
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8
  },
  photoButton: {
    height: 30,
    marginBottom: 5
  },
  input: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: '90%'
  },
  submit: {
    margin: theme.spacing(2)
  },
  filename:{
    verticalAlign: 'super'
  }
}))

export default function NewPost() {
  const classes = useStyles()

  return (
    <div className={classes.root}> 
      <Card className={classes.card}>
        <CardHeader title={"hasdladl"} className={classes.cardHeader} />
        <CardContent className={classes.cardContent}>

        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" className={classes.submit}>POST</Button>
        </CardActions>
      </Card>
    </div>
  )
}