import React from "react";
import { Box, Image, Flex, Button } from "@chakra-ui/react";
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Flex >
        <Box flex='1'></Box>
        <Box flex='1'>
            <Flex justify='center'>
                <Link to="/">
                    <Image mt='-5' src="../assets/name.png" w={["300px", "300px", "350px"]} />
                </Link>
            </Flex>
        </Box>
        {/* <Spacer /> */}
        <Box flex='1'>
            <Flex justify='flex-end'>
                <Button pr={["10", "15", "20"]} pt={["5", "5", "9"]} variant='link' leftIcon={<AiOutlineUser />} colorScheme="darkgray">Sign In</Button>
            </Flex>
        </Box>   
    </Flex>
  );
};

export default Header;
