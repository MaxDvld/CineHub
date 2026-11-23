import { Routes , Route } from "react-router-dom"
import { Container } from "react-bootstrap"

import Home from "./pages/Home.jsx"
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import FilmDetail from "./pages/FilmDetail.jsx"
import NavBar from "./components/NavBar.jsx"

function App(){
  return (
    <>
    <NavBar/>
    <Container className="mt-4">
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/films/:id" element={<FilmDetail/>}/>
      </Routes>
    </Container>
    </>
  )
}

export default App