import React, { useContext, createContext, useState } from 'react'
import _ from 'lodash'
import Api from '../services/Auth'

export const UserContext = createContext({})

export default function UserProvider(props) {
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [filterUsers, setFilterUsers] = useState([])

  const getUser = (params) => {
    return Api.getUser(params && { params: params })
      .then((res) => {
        setUsers(res.data)
        setFilterUsers(res.data)
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const getRoles = (params) => {
    return Api.getRoles(params && { params: params })
      .then((res) => {
        setRoles(res.data)
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const getProfile = (params) => {
    return Api.getProfile(params && { params: params })
      .then((res) => {
        setUsers(res.data)
        setFilterUsers(res.data)
        return res
      })
      .catch((err) => {
        return err
      })
  }


  const createUser = (sendData) => {
    return Api.createUser(sendData)
      .then((res) => {
        setUsers([...users, res.data])
        setFilterUsers([...users, res.data])
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const updateUser = (sendData) => {
    return Api.updateUser(sendData)
      .then((res) => {
        let updated = users.map((item) => (item._id === sendData?._id ? res.data : item))
        let sortById = _.orderBy(updated, ['_id'], ['desc'])
        setUsers(sortById)
        setFilterUsers(sortById)
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const updateUserProfile = (id, sendData) => {
    return Api.updateUserProfile(id, sendData)
      .then((res) => {
        let updated = users.map((item) => (item._id === id ? res.data : item))
        let sortById = _.orderBy(updated, ['_id'], ['desc'])
        setUsers(sortById)
        setFilterUsers(sortById)
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const deleteUser = async (id) => {
    return Api.deleteUser(id)
      .then((res) => {
        setUsers(users.filter((item) => item._id !== id))
        setFilterUsers(users.filter((item) => item._id !== id))
        return res
      })
      .catch((err) => {
        return err
      })
  }

  return (
    <UserContext.Provider
      value={{
        users,
        getUser,
        getProfile,
        getRoles,
        roles,
        setRoles,
        filterUsers,
        setFilterUsers,
        updateUserProfile,
        createUser,
        updateUser,
        deleteUser,
      }}
      {...props}
    />
  )
}
