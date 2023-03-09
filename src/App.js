import Container from "@mui/material/Container";
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { selectIsAuth, fetchAuthMe } from "./redux/slices/auth";
import React from "react";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/posts/:id" element={<FullPost />}></Route>
          <Route path="/add-post" element={<AddPost />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Registration />}></Route> 
        </Routes>
      </Container>
    </>
  );
}

export default App;
