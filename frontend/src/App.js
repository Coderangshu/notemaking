import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NotePage from "./pages/NotePage";
import NotesListPage from "./pages/NotesListPage";
import SignupPage from "./pages/SignupPage";
import Scribble from "./pages/Scribble";
import Scribs from "./pages/Scribs";
import LoginPage from "./pages/LoginPage";
import { jwtDecode } from "jwt-decode";

function AuthRoute({ username, setUsername, routeAction }){
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem("access");
    if(token){
      navigate("/");
    }
  }, [navigate]);
  return routeAction=="login"?<LoginPage username={username} setUsername={setUsername}/>:<SignupPage username={username} setUsername={setUsername}/>;
}

function App() {
  const [refreshList, setRefreshList] = useState(false);
  const [canvasHeight, setCanvasHeight] = useState(window.innerHeight); // Initial canvas height

  const increaseCanvasHeight = () => {
    setCanvasHeight((prevHeight) => prevHeight + 50); // Increase height by 50px
  };

  const refreshNotes = () => {
    setRefreshList((prev) => !prev);
  };
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);


  return (
    <Router>
      <ThemeProvider attribute="class">
        <div className="min-h-screen bg-yellow-100 dark:bg-gray-900 dark:text-white font-lexend transition duration-500 ease-in-out">
            <Header username={username} setUsername={setUsername} />
          <section className=" border-sky-600 px-4 md:px-16">
            <Routes>
              <Route path="/login" element={<AuthRoute username={username} setUsername={setUsername} routeAction={"login"}/>} />
              <Route path="/signup" element={<AuthRoute username={username} setUsername={setUsername} routeAction={"signup"} />} />
              <Route path="/notes" exact element={<NotesListPage refreshList={refreshList} refreshNotes={refreshNotes}/>} />
              <Route path="/" exact element={<NotesListPage refreshList={refreshList} refreshNotes={refreshNotes}/>} />
              <Route path="/note/:id" element={<NotePage refreshNotes={refreshNotes}/>} />
              <Route path="/scribble/:id" element={<Scribs/>} />
              <Route path="/note/scribble/:id" element={<Scribble canvasHeight={canvasHeight} increaseCanvasHeight={increaseCanvasHeight} />} />
            </Routes>
          </section>
            <Footer/>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
