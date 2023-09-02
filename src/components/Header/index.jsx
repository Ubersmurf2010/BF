import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
//import { UseSelector } from "react-redux/es/hooks/useSelector";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";
//import { WindowSharp } from "@mui/icons-material";

export const Header = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
  
    const onClickLogout = () => {
        if (window.confirm('Вы действительно хотите выйти?')) {
            dispatch(logout());
            window.localStorage.removeItem('token');
        }
    };
  
  
    return (
        <div className={styles.root}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <Link className={styles.logo} to="/">
                        <div>Ubersmurf's Home</div>
                    </Link>

                    <div className={styles.buttons}>
                        {isAuth ?  (
                            <>
                            <Link to='/shop'>
                                <Button variant="outlined"
                                    style={{
                                        borderRadius: 15,
                                        padding: "10px 20px",
                                        fontSize: "15px",
                                        color: "primary"
                                    }}> Ссылки </Button>
                            </Link>
                            
                            <Link to="/add-card">
                                <Button variant="outlined"
                                style={{
                                    borderRadius: 15,
                                    padding: "10px 20px",
                                    fontSize: "15px",
                                    color: "primary"
                                }}>Создать ссылку</Button>  
                            </Link> 

                            <Link to="/add-post">
                                <Button variant="outlined"
                                style={{
                                    borderRadius: 15,
                                    padding: "10px 20px",

                                    fontSize: "15px",
                                    color: "primary"
                                }}>Создать статью</Button>  
                            </Link> 
                
                            <Button onClick={onClickLogout} variant="outlined"
                            style={{
                                borderRadius: 15,
                                padding: "10px 20px",
                                fontSize: "15px",
                                backgroundColor: '#e91e63',
                                color: "white"
                            }}>
                                Выйти
                            </Button>
                            </>
                        ) : (
                            <>
                            <Link to='/login'>
                                <Button variant="outlined"
                                style={{
                                    borderRadius: 15,
                                    padding: "10px 20px",
                                    fontSize: "15px",
                                    color: "primary"
                                }}>
                                    Войти
                                </Button>
                            </Link>
            
                            <Link to='/register'>
                                <Button variant="contained"
                                style={{
                                    borderRadius: 15,
                                    padding: "10px 20px",
                                    fontSize: "15px",
                                    color: "primary"
                                }}>
                                    Создать аккаунт
                                </Button>
                            </Link>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};
