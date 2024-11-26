import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NotePage from "./pages/NotePage";
import NotesListPage from "./pages/NotesListPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { jwtDecode } from "jwt-decode";

function App() {
  const [refreshList, setRefreshList] = useState(false);
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
              <Route path="/login" element={<LoginPage username={username} setUsername={setUsername} />} />
              <Route path="/signup" element={<SignupPage />} />
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
