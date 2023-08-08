// project import

// ==============================|| MENU ITEMS ||============================== //

let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
let userRole =
  user?.role ? user?.role?.permission : []

let authorizationData = userRole && userRole.map(item=>{
  return {
    ...item.menu,
    active:true
  }
})

let menuList = {
  id: 'group-dashboard',
  type: 'group',
  children: [
    {
      _id: 1,
      name: 'Beranda',
      type: 'parent',
      url: '/app/dashboard',
      active: true,
      breadcrumbs: false
    },
    {
      _id: 2,
      name: 'Users',
      type: 'parent',
      url: '/app/users',
      active: true,
      breadcrumbs: false
    },
  ]
}

const menuItems = {
  items: [menuList],
}

export default menuItems
