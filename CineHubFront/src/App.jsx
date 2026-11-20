import { Routes , Route } from "react-router-dom"
import { Container } from "react-bootstrap"

import HomePage from "./pages/Home.jsx"
import RegisterPage from "./pages/Register.jsx"
import LoginPage from "./pages/Login.jsx"

function App(){
  return (
    <Container className="mt-4">
      <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </Container>
  )
}

export default App