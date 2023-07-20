import React, { useContext, createContext, useState } from 'react'
import _ from 'lodash'
import Api from '../services/MasterApi'

export const PatentContext = createContext({})

export default function PatentProvider(props) {
  const [patents, setPatents] = useState([])
  const [detailPatent, setDetailPatent] = useState(null)
  const [valuePatent, setValuePatent] = useState(null)
  const [filterPatents, setFilterPatents] = useState([])

  const getPatent = (params) => {
    return Api.getPatent(params && { params: params })
      .then((res) => {
        setPatents(res.data)
        setFilterPatents(res.data)
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const getDetailPatent = (params) => {
    return Api.getPatent(params && { params: params })
      .then((res) => {
        setDetailPatent(res.data[0])
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const createPatent = (sendData) => {
    return Api.createPatent(sendData)
      .then((res) => {
        setPatents([...patents, res.data])
        setFilterPatents([...patents, res.data])
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const updatePatent = (id, sendData) => {
    return Api.updatePatent(id, sendData)
      .then((res) => {
        let updated = patents.map((item) => (item._id === id ? res.data : item))
        let sortById = _.orderBy(updated, ['_id'], ['desc'])
        setPatents(sortById)
        setFilterPatents(sortById)
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const deletePatent = async (id) => {
    return Api.deleteTemporaryPatent(id)
      .then((res) => {
        setPatents(patents.filter((item) => item._id !== id))
        setFilterPatents(patents.filter((item) => item._id !== id))
        return res
      })
      .catch((err) => {
        return err
      })
  }

  return (
    <PatentContext.Provider
      value={{
        valuePatent,
        setValuePatent,
        setDetailPatent,
        patents,
        getPatent,
        detailPatent,
        getDetailPatent,
        filterPatents,
        setFilterPatents,
        createPatent,
        updatePatent,
        deletePatent,
      }}
      {...props}
    />
  )
}
