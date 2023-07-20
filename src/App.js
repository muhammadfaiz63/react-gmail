import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'
// project import
import Routes from './router/index'
import ThemeCustomization from 'themes'
import ScrollTop from 'components/ScrollTop'
import { HashRouter } from 'react-router-dom'

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

// const routing = useRoutes(routes(isLoggedIn));

const App = () => (
  <ThemeCustomization>
    {/* <ScrollTop> */}
    <Routes />
    {/* </ScrollTop> */}
  </ThemeCustomization>
)

export default App
