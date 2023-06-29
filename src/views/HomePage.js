import React from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import Header from "../components/Header";
import LogInModal from '../components/LogInModal';

const HomePage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Flex 
        direction="column"
        flex="1"
        bgImage="url('/assets/background2.jpg')"
        bgPosition="top"
        bgRepeat="no-repeat"
        bgSize={["100% auto", "cover", "cover"]}
        minH={["calc(100vh - 30px)", "calc(100vh - 30px)", "calc(100vh - 30px)"]}
        >
            <Header onOpen={onOpen} /> 
            <LogInModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />     
        </Flex>
    );
};

export default HomePage;
