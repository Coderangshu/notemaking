import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import React, { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NotePage from "./pages/NotePage";
import NotesListPage from "./pages/NotesListPage";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";

function App() {
  const [refreshList, setRefreshList] = useState(false);
  const refreshNotes = () => {
    setRefreshList((prev) => !prev);
  };

  return (
    <Router>
      <ThemeProvider attribute="class">
        <div className="min-h-screen bg-yellow-100 dark:bg-gray-900 font-lexend transition-colors duration-1000">
          <section className=" border-sky-600 px-4 md:px-16">
            <Header/>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/notes" exact element={<NotesListPage refreshList={refreshList} refreshNotes={refreshNotes}/>} />
              <Route path="/" exact element={<NotesListPage refreshList={refreshList} refreshNotes={refreshNotes}/>} />
              <Route path="/note/:id" element={<NotePage refreshNotes={refreshNotes}/>} />
            </Routes>
            <Footer/>
          </section>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
