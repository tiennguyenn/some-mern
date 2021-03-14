import React, { useEffect, useState } from 'react'
import { list } from './api.user'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    list().then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setUsers(data)
      }
    })
  }, [])

  return (
    <div>
      <h1>Users list</h1>
      <ul>
      {users.map((user, i) => {
        return <li key={`user-${i}`} >{user.name}</li>
      })}
      </ul>
    </div>
  )
}

export default Users