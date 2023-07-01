import React from "react";
import { Flex } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import WelcomePage from "./views/WelcomePage";
import HomePage from "./views/HomePage";

function App() {
  return (
    <Flex direction="column" minH="100vh">
      <Router>
        <Flex flex="1">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </Flex>
        <Footer />
      </Router>
    </Flex>
    
    
  );
}

export default App;
