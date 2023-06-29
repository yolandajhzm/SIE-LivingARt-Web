import React from "react";
import { Box, Image, Flex } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <Flex 
      direction="column"
      flex="1"
      bgImage="url('/assets/background1.jpg')"
      bgPosition="top"
      bgRepeat="no-repeat"
      bgSize={["100% auto", "cover", "cover"]}
      minH={["calc(100vh - 30px)", "calc(100vh - 30px)", "calc(100vh - 30px)"]}
    >
        <Header />     
    </Flex>
  );
};

export default HomePage;
