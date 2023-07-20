// assets
import {
  DashboardOutlined,
  FileSearchOutlined,
  DesktopOutlined,
  UsergroupAddOutlined,
  ExperimentOutlined,
  SnippetsOutlined,
  ScheduleOutlined,
} from '@ant-design/icons'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import DvrIcon from '@mui/icons-material/Dvr'

// icons
const icons = {
  DashboardOutlined,
  FileSearchOutlined,
  DesktopOutlined,
  UsergroupAddOutlined,
  AccountBalanceWalletIcon,
  ExperimentOutlined,
  SnippetsOutlined,
  ScheduleOutlined,
  DvrIcon,
}
// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  type: 'group',
  children: [
    {
      id: 1,
      title: 'Beranda',
      type: 'item',
      url: '/app/dashboard',
      active: true,
      breadcrumbs: false,
    },
    {
      id: 2,
      title: 'User',
      type: 'item',
      url: '/app/users',
      active: true,
      breadcrumbs: false,
    },
    {
      id: 3,
      title: 'Docket',
      type: 'item',
      url: '/app/docket',
      active: true,
      breadcrumbs: false,
    },
    {
      id: 4,
      title: 'Patent',
      type: 'item',
      url: '/app/patent',
      active: true,
      breadcrumbs: false,
    },
    {
      id: 5,
      title: 'Trademarks',
      type: 'item',
      url: '/app/trademark',
      active: true,
      breadcrumbs: false,
    },
    {
      id: 6,
      title: 'Report',
      type: 'item',
      url: '/app/report',
      active: true,
      breadcrumbs: false,
    },
  ],
}

export default dashboard
