import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ReorderIcon from '@mui/icons-material/Reorder';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import CategoryIcon from '@mui/icons-material/Category';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import {Link} from "react-router-dom";

export default function NavMenu() {

    require('../StyleSheet/NavigationBar.css');

    const nodec={
        textDecoration:'none',
        color:'black'
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Box id="nav_menu" style={{ position: "absolute", right: "65px" }} sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Menu">
                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                        {/* <Avatar sx={{ width: 32, height: 32 }}><ReorderIcon style={{ fontSize: "32px", color: "white" }} /></Avatar> */}
                        <ReorderIcon style={{ fontSize: "32px", color: "white" }} />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <Link to='/' style={nodec}>Home</Link>
                </MenuItem>

                <MenuItem>
                    <ListItemIcon>
                        <SearchIcon />
                    </ListItemIcon>
                    <a href='#search' style={nodec}>Search</a>
                </MenuItem>

                <MenuItem>
                    <ListItemIcon>
                        <CategoryIcon />
                    </ListItemIcon>
                    <a href='#category' style={nodec}>Category</a>
                </MenuItem>

                <MenuItem>
                    <ListItemIcon>
                        <ContactPageIcon />
                    </ListItemIcon>
                    <a href='#contact' style={nodec}>Contact</a>
                </MenuItem>

            </Menu>
        </React.Fragment>
    );

}
