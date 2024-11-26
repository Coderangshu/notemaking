import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NotePage from "./pages/NotePage";
import NotesListPage from "./pages/NotesListPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function AuthRoute(props){
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem("access");
    if(token){
      navigate("/");
    }
  }, [navigate]);
  return props.routeAction=="login"?<LoginPage/>:<SignupPage/>;
}

function App() {
  const [refreshList, setRefreshList] = useState(false);
  const refreshNotes = () => {
    setRefreshList((prev) => !prev);
  };

  return (
    <Router>
      <ThemeProvider attribute="class">
        <div className="min-h-screen bg-yellow-100 dark:bg-gray-900 dark:text-white font-lexend transition duration-500 ease-in-out">
            <Header/>
          <section className=" border-sky-600 px-4 md:px-16">
            <Routes>
              <Route path="/login" element={<AuthRoute routeAction="login"/>} />
              <Route path="/signup" element={<AuthRoute routeAction="signup" />} />
              <Route path="/notes" exact element={<NotesListPage refreshList={refreshList} refreshNotes={refreshNotes}/>} />
              <Route path="/" exact element={<NotesListPage refreshList={refreshList} refreshNotes={refreshNotes}/>} />
              <Route path="/note/:id" element={<NotePage refreshNotes={refreshNotes}/>} />
            </Routes>
          </section>
            <Footer/>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
