import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

import Header from "./components/Header";
import NotePage from "./pages/NotePage";
import NotesListPage from "./pages/NotesListPage";
import { ThemeProvider } from "next-themes";

function App() {
  return (
    <Router>
      <ThemeProvider attribute="class">
        <div className="min-h-screen bg-yellow-100 dark:bg-gray-900 font-lexend transition-colors duration-1000">
          <section className=" border-sky-600 px-4 md:px-16">
            <Header/>
            <Routes>
              <Route path="/" exact element={<NotesListPage />} />
              <Route path="/note/:id" element={<NotePage />} />
            </Routes>
            <Footer/>
          </section>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
