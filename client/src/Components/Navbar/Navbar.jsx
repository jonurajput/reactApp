import styles from "./Navbar.module.css"
import { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
const Navbar = () => {
    const history = useHistory();
    const token = sessionStorage.getItem("token")
    const user = JSON.parse(sessionStorage.getItem('user'))

  
    //logout
    const logout = async () => {

        const res = await fetch("/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const res2 = await res.json();
        if (res2.msg) {
            sessionStorage.clear();
            history.push("/login")
        }
    }

    
    return (

        <div className={styles.navbar}>
            <div className={styles.nav}>
                <div className={styles.first}>
                <Link to="/"><HomeIcon className={styles.side_icons}/></Link>
                   {token? <Link to="/addProduct"><AddIcon className={styles.side_icons} /></Link>: <Link to="/login"><AddIcon className={styles.side_icons} /></Link>}
                   {token? <Link to="/userDashBoard"><InsertDriveFileIcon className={styles.side_icons} /></Link>: <Link to="/login"><InsertDriveFileIcon className={styles.side_icons} /></Link>}
                </div>

                <div className={styles.second}>
                    {
                        token?<><span style={{fontWeight:"600"}}>{user?.email}</span>  <ExitToAppIcon className={styles.side_icons} onClick={logout}/></>:<> <Link to="/signup"><span>signup</span></Link>
                    <Link to="/login"><span>Login</span></Link></>
                    }
                   
                  
                </div>





            </div>


        </div>

    )
}


export default Navbar;


