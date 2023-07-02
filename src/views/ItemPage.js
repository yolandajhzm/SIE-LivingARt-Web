import { Flex, Box, Spacer, Image, Button, Text, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { AiOutlineUser } from 'react-icons/ai';
import { Divider } from '@chakra-ui/react'
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { callApi } from "../components/API";

const dummyData = 
    {
        id: 1,
        name: "Chair1",
        imageSrc: "../assets/chair.png",
        description: "This is Chair1. This is Chair1. This is Chair1. This is Chair1. This is Chair1. This is Chair1. This is Chair1. This is Chair1. This is Chair1. This is Chair1.",
    };

function ItemPage(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const itemId = location.pathname.split("/")[2]; // Get the id from the url
    const { email } = location.state;
    const [item, setItem] = useState(null); 

    //Fetch the item from backend using its id 
    // const fetchFurniture = async () => {
    //     try {
    //       const response = await callApi("url", itemId);
    //       setItem(response.data);
    //     } catch (error) {
    //       console.error(error);
    //     }
    // };
    
    // useEffect(() => {
    //   fetchFurniture(); 
    // }, []);

    const handleSignout = async () => {
        // TODO: Send the sign out data to the backend
        // try {
        //   const response = await callApi("url", "PUT", email);

        //   if (response.success) {
        //     navigate("/"); 
        //   } else {
        //     // Handle sign out error
        //     console.error("Sign out failed");
        //   }
        // } catch (error) {
        //   console.error("Error during sign out", error);
        // }
        navigate("/"); 
    };


    return (
        <Flex 
        direction="column"
        flex="1"
        >
            <Flex flex='1'>
                <Box flex='1'>
                    <Image  pl='5' src="../assets/name.png" w={["300px", "300px", "250px"]} />
                </Box>
                <Spacer />
                <Spacer />
                <Flex flex='1' justifyContent={"center"}>
                    <Menu>
                        <MenuButton as={Button} pl='5' pt='3' variant='link' colorScheme="darkgray" leftIcon={<AiOutlineUser />}>
                            Account
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={handleSignout}>Sign Out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
            <Divider />
            <Flex flex="10" p={4} direction="column" >
               <Flex flex='3' alignItems="center" justifyContent="center">
                    <Image src={dummyData.imageSrc} height="500" borderRadius="20"/>
               </Flex>
               <Flex flex='2' direction="column" alignItems="center" justifyContent="center">
                    <Text mb="10" fontFamily={"Avenir"} fontWeight={"bold"} fontSize={"25"}>{dummyData.name}</Text>
                    <Text fontFamily={"Avenir"} fontSize={"15"} wordWrap="break-word" maxW="600px">{dummyData.description}</Text>
               </Flex>

            </Flex>
        </Flex>
    );
}

export default ItemPage;