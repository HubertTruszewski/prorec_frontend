import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {JwtResponse} from "../login/dto/JwtResponse";
import {Avatar, Button, ButtonGroup, Divider, Menu, MenuItem} from "@mui/material";
import {AuthService} from "../../services/AuthService";

const Navigation = () => {
    const [anchor, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchor)
    const menuItems: {
        path: string;
        text: string;
    }[] = [
        {text: "Challenges", path: "/challenges"},
        {text: "Assessments", path: "/assessments"},
    ];
    const [user, setUser] = useState<JwtResponse | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogout = () => {
        AuthService.logout();
        handleClose();
        window.location.href = "/login?logout=true";
    }

    useEffect(() => {
        if (localStorage) {
            const userData: JwtResponse = AuthService.getCurrentUser();
            setUser(userData);
        }
    }, [])

    return (
        <header>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Link href={"/"}>
                        <span style={{fontSize: "56px", paddingLeft: "20px"}}>
                            <span style={{fontWeight: "bold", color: "#A0EEFF"}}>PRO</span>
                            <span style={{fontWeight: "bold", color: "#BA53FF"}}>REC</span>
                        </span>
                    </Link>
                    {user && <span style={{alignItems: "start", marginLeft: "30px", display: "flex"}}>
                    <Breadcrumbs style={{marginTop: "7px"}}>
                        {menuItems.map(
                            menuItem => <Link key={menuItem.path} href={menuItem.path} style={{padding: "10px", fontSize: "30px", color: "#F5E5FF"}}>
                                {menuItem.text}
                            </Link>)}
                    </Breadcrumbs>
                    </span>}
                </div>
                {user ?
                    <div style={{display: "flex", alignItems: "center", padding: "15px"}}>
                        <Avatar onClick={handleClick} style={{backgroundColor: "orangered"}}>
                            {user.user.username.charAt(0)}
                        </Avatar>
                        <Menu open={open} anchorEl={anchor} onClose={handleClose}>
                            <MenuItem onClick={handleClose}>
                                Hi, {user.user.username}!
                            </MenuItem>
                            <Divider/>
                            <MenuItem onClick={handleLogout}>
                                <span style={{color: "red"}}>
                                    Logout
                                </span>
                            </MenuItem>
                        </Menu>
                    </div>
                    : <div style={{padding: "15px"}}>
                        <ButtonGroup variant={"contained"}>
                            <Button component={Link} href={"/login"}>Login</Button>
                            <Button component={Link} href={"/register"}>Register</Button>
                        </ButtonGroup>
                    </div>
                }
            </div>
        </header>
    );
};

export default Navigation;
