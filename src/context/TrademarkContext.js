import React, { useContext, createContext, useState } from 'react'
import _ from 'lodash'
import Api from '../services/MasterApi'

export const TrademarkContext = createContext({})

export default function TrademarkProvider(props) {
  const [Trademarks, setTrademarks] = useState([])
  const [detailTrademark, setDetailTrademark] = useState(null)
  const [valueTrademark, setValueTrademark] = useState(null)
  const [filterTrademarks, setFilterTrademarks] = useState([])

  const getTrademark = (params) => {
    return Api.getTrademark(params && { params: params })
      .then((res) => {
        setTrademarks(res.data)
        setFilterTrademarks(res.data)
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const getDetailTrademark = (params) => {
    return Api.getTrademark(params && { params: params })
      .then((res) => {
        setDetailTrademark(res.data[0])
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const createTrademark = (sendData) => {
    return Api.createTrademark(sendData)
      .then((res) => {
        setTrademarks([...Trademarks, res.data])
        setFilterTrademarks([...Trademarks, res.data])
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const updateTrademark = (id, sendData) => {
    return Api.updateTrademark(id, sendData)
      .then((res) => {
        let updated = Trademarks.map((item) => (item._id === id ? res.data : item))
        let sortById = _.orderBy(updated, ['_id'], ['desc'])
        setTrademarks(sortById)
        setFilterTrademarks(sortById)
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const deleteTrademark = async (id) => {
    return Api.deleteTemporaryTrademark(id)
      .then((res) => {
        setTrademarks(Trademarks.filter((item) => item._id !== id))
        setFilterTrademarks(Trademarks.filter((item) => item._id !== id))
        return res
      })
      .catch((err) => {
        return err
      })
  }

  return (
    <TrademarkContext.Provider
      value={{
        valueTrademark,
        setValueTrademark,
        setDetailTrademark,
        Trademarks,
        getTrademark,
        detailTrademark,
        getDetailTrademark,
        filterTrademarks,
        setFilterTrademarks,
        createTrademark,
        updateTrademark,
        deleteTrademark,
      }}
      {...props}
    />
  )
}
