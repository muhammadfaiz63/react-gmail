// types
import { createSlice } from "@reduxjs/toolkit"

// initial state
const initialState = {
    openItem: ["dashboard"],
    openComponent: "buttons",
    drawerOpen: false,
    componentDrawerOpen: true,
    collapseOpen: false
}

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
    name: "menu",
    initialState,
    reducers: {
        activeItem(state, action) {
            state.openItem = action.payload.openItem
        },

        activeComponent(state, action) {
            state.openComponent = action.payload.openComponent
        },

        openDrawer(state, action) {
            state.drawerOpen = action.payload.drawerOpen
        },

        openComponentDrawer(state, action) {
            state.componentDrawerOpen = action.payload.componentDrawerOpen
        },

        openCollapseDrawer(state, action) {
            state.collapseOpen = action.payload.collapseOpen
        }
    }
})

export default menu.reducer

export const {
    activeItem,
    activeComponent,
    openDrawer,
    openComponentDrawer,
    openCollapseDrawer
} = menu.actions
