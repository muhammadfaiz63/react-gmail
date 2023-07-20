import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

// material-ui
import {
  Box,
  List,
  Typography,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

// project import
import NavItem from './NavItem'
import NavChild from './NavCollapse'

// types
import { openCollapseDrawer } from 'store/reducers/menu'

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
  const dispatch = useDispatch()

  const menu = useSelector((state) => state.menu)
  const { drawerOpen, collapseOpen } = menu

  const navCollapse = item.children
    ?.filter((x) => x.active)
    ?.map((menuItem) => {
      switch (menuItem.type) {
        case 'child':
          return <NavChild key={menuItem._id} item={menuItem} level={1} />
        case 'parent':
          return <NavItem key={menuItem._id} item={menuItem} level={1} />
        default:
          return (
            <Typography
              key={menuItem.id}
              variant='h6'
              color='error'
              align='center'>
              Fix - Group Collapse or Items
            </Typography>
          )
      }
    })

  return (
    <List
      subheader={
        item.name &&
        drawerOpen && (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography variant='subtitle2' color='textSecondary'>
              {item.name}
            </Typography>
            {/* only available in paid version */}
          </Box>
        )
      }
      sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}>
      {navCollapse}
    </List>
  )
}

NavGroup.propTypes = {
  item: PropTypes.object,
}

export default NavGroup
