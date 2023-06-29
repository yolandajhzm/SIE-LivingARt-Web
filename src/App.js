import React from "react";

import { Flex } from "@chakra-ui/react";
import Footer from "./components/Footer";
import HomePage from "./views/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Flex direction="column" minH="100vh">
      <Router>
        <Flex flex="1">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Flex>
        <Footer />
      </Router>
    </Flex>
    
    
  );
}

export default App;
