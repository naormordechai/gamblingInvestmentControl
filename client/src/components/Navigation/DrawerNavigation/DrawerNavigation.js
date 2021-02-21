import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './Drawer.module.scss'

export const DrawerNavigation = ({ children, setIsOpenDrawer, isOpenDrawer }) => {
    
    return (
        <>
            <IconButton onClick={() => setIsOpenDrawer(true)} classes={{ root: styles.iconButton }}><MenuIcon /></IconButton>
            <Drawer open={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} classes={{root: "drawer-container"}}>
                {children}
            </Drawer>
        </>
    )
}
