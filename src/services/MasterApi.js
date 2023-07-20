import axios from "axios";
import { StaticVar } from "../config/index";

// ===> api create
const api = axios.create({
  baseURL: StaticVar.API_SERVICES,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // json: true
});

api.interceptors.request.use(
  async (config) => {
    if (!config.headers) {
      config.headers = {};
    }

    config.headers.authtoken = await localStorage?.authtoken;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(undefined, (err) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  const status = err.response?.status || 500;
  // we can handle global errors here
  switch (status) {
    // authentication (token related issues)
    case 401: {
      break;
    }

    // forbidden (permission related issues)
    case 403: {
      break;
    }

    // bad request
    case 400: {
      break;
    }

    // not found
    case 404: {
      break;
    }

    // conflict
    case 409: {
      break;
    }

    // unprocessable
    case 422: {
      break;
    }

    case 502: {
      break;
    }

    default: {
      break;
    }
  }

  return Promise.reject(err);
});

const getDocket = (data) => api.get(`/masterdata/docket`, data);
const createDocket = (data) => api.post(`/masterdata/docket/register`, data);
const updateDocket = (id, data) => api.put(`/masterdata/docket/` + id, data);
const deleteDocket = (id) => api.delete(`/masterdata/docket/` + id);
const deleteTemporaryDocket = (id) => api.patch(`/masterdata/docket/delete/` + id);

const getPatent = (data) => api.get(`/masterdata/patent`, data);
const createPatent = (data) => api.post(`/masterdata/patent/register`, data);
const updatePatent = (id, data) => api.put(`/masterdata/patent/` + id, data);
const deletePatent = (id) => api.delete(`/masterdata/patent/` + id);
const deleteTemporaryPatent = (id) => api.patch(`/masterdata/patent/delete/` + id);

const getReport = (data) => api.get(`/masterdata/report`, data);
const createReport = (data) => api.post(`/masterdata/report/register`, data);
const updateReport = (id, data) => api.put(`/masterdata/report/` + id, data);
const deleteReport = (id) => api.delete(`/masterdata/report/` + id);
const deleteTemporaryReport = (id) => api.patch(`/masterdata/report/delete/` + id);

const getTrademark = (data) => api.get(`/masterdata/trademark`, data);
const createTrademark = (data) => api.post(`/masterdata/trademark/register`, data);
const updateTrademark = (id, data) => api.put(`/masterdata/trademark/` + id, data);
const deleteTrademark = (id) => api.delete(`/masterdata/trademark/` + id);
const deleteTemporaryTrademark = (id) => api.patch(`/masterdata/trademark/delete/` + id);

export const apis = {
  getDocket,
  createDocket,
  updateDocket,
  deleteDocket,
  deleteTemporaryDocket,
  getPatent,
  createPatent,
  updatePatent,
  deletePatent,
  deleteTemporaryPatent,
  getTrademark,
  createTrademark,
  updateTrademark,
  deleteTrademark,
  deleteTemporaryTrademark,
  getReport,
  createReport,
  updateReport,
  deleteReport,
  deleteTemporaryReport
}

export default apis;
