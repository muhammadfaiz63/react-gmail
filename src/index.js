import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

// scroll bar
import 'simplebar/src/simplebar.css'

// third-party
import { Provider as ReduxProvider } from 'react-redux'

// apex-chart
import 'assets/third-party/apex-chart.css'

// project import
import App from './App'
import { store } from 'store'
import reportWebVitals from './reportWebVitals'

import Provider from './context/index'
import MultiProvider from './config/MultiProvider'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

// import { render } from 'react-dom';
import { createRoot } from 'react-dom/client'

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const container = document.getElementById('root')
const root = createRoot(container)
// ReactDOM.
root.render(
  <ReduxProvider store={store}>
    <MultiProvider
      providers={[
        <Provider.AuthProvider key={0} />,
        <Provider.UserProvider key={1} />,
        <Provider.DocketProvider key={2} />,
        <Provider.UploadProvider key={3} />,
        <Provider.TrademarkProvider key={4} />,
        <Provider.PatentProvider key={5} />,
        <Provider.ReportProvider key={6} />,
        
      ]}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter basename='/'>
          <App />
        </BrowserRouter>
      </LocalizationProvider>
    </MultiProvider>
  </ReduxProvider>,
  // document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
