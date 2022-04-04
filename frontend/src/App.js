import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home"
import SigninPage from "./pages/signin"
import SignupPage from "./pages/signup"
import Navbar from "./components/Navbar"
import ErrorPage from "./pages/error"

// Routing V6: https://www.youtube.com/watch?v=UjHT_NKR_gU&ab_channel=PedroTech
function App() {
  return (
    <>
     <Router>
       <Navbar/>
       <Routes>
          <Route path="/" element = {<Home/>} />
          <Route path="signin" element={<SigninPage/>} />
          <Route path="signup" element={<SignupPage/>} />
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
