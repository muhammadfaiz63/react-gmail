import React, { useContext, createContext, useState } from 'react'
import _ from 'lodash'
import Api from '../services/MasterApi'

export const ReportContext = createContext({})

export default function ReportProvider(props) {
  const [reports, setReports] = useState([])
  const [detailReport, setDetailReport] = useState(null)
  const [valueReport, setValueReport] = useState(null)
  const [filterReports, setFilterReports] = useState([])

  const getReport = (params) => {
    return Api.getReport(params && { params: params })
      .then((res) => {
        setReports(res.data)
        setFilterReports(res.data)
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const getDetailReport = (params) => {
    return Api.getReport(params && { params: params })
      .then((res) => {
        setDetailReport(res.data[0])
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const createReport = (sendData) => {
    return Api.createReport(sendData)
      .then((res) => {
        setReports([...reports, res.data])
        setFilterReports([...reports, res.data])
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const updateReport = (id, sendData) => {
    return Api.updateReport(id, sendData)
      .then((res) => {
        let updated = reports.map((item) => (item._id === id ? res.data : item))
        let sortById = _.orderBy(updated, ['_id'], ['desc'])
        setReports(sortById)
        setFilterReports(sortById)
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const deleteReport = async (id) => {
    return Api.deleteTemporaryReport(id)
      .then((res) => {
        setReports(reports.filter((item) => item._id !== id))
        setFilterReports(reports.filter((item) => item._id !== id))
        return res
      })
      .catch((err) => {
        return err
      })
  }

  return (
    <ReportContext.Provider
      value={{
        valueReport,
        setValueReport,
        setDetailReport,
        reports,
        getReport,
        detailReport,
        getDetailReport,
        filterReports,
        setFilterReports,
        createReport,
        updateReport,
        deleteReport,
      }}
      {...props}
    />
  )
}
