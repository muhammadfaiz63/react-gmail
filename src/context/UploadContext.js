import React, { useContext, createContext, useState } from 'react'
import Api from '../services/uploadApi'

export const UploadContext = createContext({})

export default function UploadProvider(props) {
  const uploadFile = (data) => {
    return Api.uploadFile(data)
      .then((res) => {
        // let resdata = res.data
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const uploadPhoto = (data) => {
    return Api.uploadPhoto(data)
      .then((res) => {
        // let resdata = res.data
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const uploadPayment = (data) => {
    return Api.uploadPayment(data)
      .then((res) => {
        // let resdata = res.data
        return res
      })
      .catch((err) => {
        return err
      })
  }

  const uploadQStandard = (data) => {
    return Api.uploadQStandard(data)
      .then((res) => {
        // let resdata = res.data
        return res
      })
      .catch((err) => {
        return err
      })
  }

  return (
    <UploadContext.Provider
      value={{
        uploadFile,
        uploadPhoto,
        uploadPayment,
        uploadQStandard,
      }}
      {...props}
    />
  )
}
