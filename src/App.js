import {Routes, Route} from 'react-router-dom';
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from 'react-redux';
import { Header, UserInfo } from "./components";
import { Home, FullPost, Registration, AddPost, Login, ShopVitrin, Product, AddCard } from "./pages";
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
import React from 'react';

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    React.useEffect(() => {
        dispatch(fetchAuthMe());
    }, []);

    return (
    <>
        <Header />
            <Container maxWidth="lg">
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path="posts/:id" element={<FullPost/>} />
                    <Route path="posts/:id/edit" element={<AddPost/>} />
                    <Route path="/add-post" element={<AddPost/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Registration/>}/>
                    <Route path="/shop" element={<ShopVitrin />} />
                    <Route path="cards/:id" element={<Product />} />
                    <Route path="cards/:id/edit" element={<AddCard/>} />
                    <Route path="/add-card" element={<AddCard/>} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
