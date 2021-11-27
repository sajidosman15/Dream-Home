import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { AddBox, Person, Report } from '@mui/icons-material';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

export default function AccountMenu() {

    const nodec = {
        textDecoration: 'none',
        color: 'black'
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [logout, setLogout] = React.useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutUser = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        setLogout(true);
    }

    if (logout === true) {
        return <Redirect to="/login" />
    }

    const printMenu = () => {
        const token = localStorage.getItem('token');
        if (token === null) {
            return (
                <div>
                    <MenuItem>
                        <ListItemIcon>
                            <Report fontSize="small" />
                        </ListItemIcon>
                        Report Issues
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        <Link to='/login' style={nodec}>Login</Link>
                    </MenuItem>
                </div>
            );
        } else {
            return (
                <div>
                    <MenuItem>
                        <ListItemIcon>
                            <Person />
                        </ListItemIcon>
                        Profile
                    </MenuItem>

                    <MenuItem>
                        <ListItemIcon>
                            <LocalPostOfficeIcon />
                        </ListItemIcon>
                        <Link to='/mypost' style={nodec}>My Posts</Link>
                        
                    </MenuItem>
                    <Divider />

                    <MenuItem>
                        <ListItemIcon>
                            <AddBox fontSize="small" />
                        </ListItemIcon>
                        <Link to='/UploadAds' style={nodec}>Add New Post</Link>
                    </MenuItem>

                    <MenuItem>
                        <ListItemIcon>
                            <Report fontSize="small" />
                        </ListItemIcon>
                        Report Issues
                    </MenuItem>

                    <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        <Link to='' onClick={logoutUser} style={nodec}>Logout</Link>
                    </MenuItem>
                </div>
            );
        }
    }

    return (
        <React.Fragment>
            <Box style={{ position: "absolute", right: "15px" }} sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="My Profile">
                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                        {/* <Avatar sx={{ width: 32, height: 32 }}><AccountCircleIcon style={{ fontSize: "32px", color: "white" }} /></Avatar> */}
                        <AccountCircleIcon style={{ fontSize: "32px", color: "white" }} />
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
                {printMenu()}

            </Menu>
        </React.Fragment>
    );

}
