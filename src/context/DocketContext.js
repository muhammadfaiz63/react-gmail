import React, { useContext, createContext, useState } from 'react'
import _ from 'lodash'
import Api from '../services/MasterApi'

export const DocketContext = createContext({})

export default function DocketProvider(props) {
  const [dockets, setDockets] = useState([])
  const [detailDocket, setDetailDocket] = useState(null)
  const [valueDocket, setValueDocket] = useState(null)
  const [filterDockets, setFilterDockets] = useState([])

  const getDocket = (params) => {
    return Api.getDocket(params && { params: params })
      .then((res) => {
        setDockets(res.data)
        setFilterDockets(res.data)
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const getDetailDocket = (params) => {
    return Api.getDocket(params && { params: params })
      .then((res) => {
        setDetailDocket(res.data[0])
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const createDocket = (sendData) => {
    return Api.createDocket(sendData)
      .then((res) => {
        setDockets([...dockets, res.data])
        setFilterDockets([...dockets, res.data])
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const updateDocket = (id, sendData) => {
    return Api.updateDocket(id, sendData)
      .then((res) => {
        let updated = dockets.map((item) => (item._id === id ? res.data : item))
        let sortById = _.orderBy(updated, ['_id'], ['desc'])
        setDockets(sortById)
        setFilterDockets(sortById)
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const deleteDocket = async (id) => {
    return Api.deleteTemporaryDocket(id)
      .then((res) => {
        setDockets(dockets.filter((item) => item._id !== id))
        setFilterDockets(dockets.filter((item) => item._id !== id))
        return res
      })
      .catch((err) => {
        return err
      })
  }

  return (
    <DocketContext.Provider
      value={{
        valueDocket,
        setValueDocket,
        setDetailDocket,
        dockets,
        getDocket,
        detailDocket,
        getDetailDocket,
        filterDockets,
        setFilterDockets,
        createDocket,
        updateDocket,
        deleteDocket,
      }}
      {...props}
    />
  )
}
