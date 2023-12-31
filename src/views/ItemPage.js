import { Flex, Box, Spacer, useDisclosure, Image, Button, Text, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { AiOutlineUser, AiOutlineEdit } from 'react-icons/ai';
import { Divider } from '@chakra-ui/react'
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import EditModal from "../components/EditModal";
import URL from "../components/URL";


function ItemPage(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const itemId = location.pathname.split("/")[2]; // Get the id from the url
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [allData, setAllData] = useState([]); 
    const [furniture, setFurniture] = useState(null); 

    const handleSignout = async () => {
        localStorage.removeItem("userId"); 
        localStorage.removeItem("email"); 
        navigate("/"); 
    };
    useEffect(() => {
        const fetchFurniture = async () => {
            try {
              const response = await axios.post(URL.GET_USER_FURNITURE, { email } 
            ,{
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            console.log(response);
            if (response.data.code === 0) {
                setAllData(response.data.data);
            } else {
              alert(response.data.msg);
              console.error("Get failed");
            }
          } catch (error) {
            // Handle error
            console.error("Error during get", error);
          }
        };
        fetchFurniture();

    }, []);

    useEffect(() => {
        setFurniture(allData.filter((item) => item.id == itemId)[0]);
    }, [allData]);


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
                    {furniture && (
                    <EditModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} vendorId={userId} furniture={allData.filter((item) => item.id == itemId)[0]}/>
                    )}
                    <Button  pl='5' pt='3' variant='link' onClick={onOpen} leftIcon={<AiOutlineEdit />} colorScheme="darkgray">Edit</Button>
                </Flex>
            </Flex>
            <Divider />
                <Flex flex="10" p={4} direction="column" >
                    {furniture && (
                        <>
                            <Flex flex='3' alignItems="center" justifyContent="center">
                                    <Image src={furniture.imageSource} height="500" borderRadius="20"/>
                            </Flex>
                            <Flex flex='2' direction="column" alignItems="center" justifyContent="center">
                                    <Text mb="10" fontFamily={"Avenir"} fontWeight={"bold"} fontSize={"25"}>{furniture.name}</Text>
                                    <Text fontFamily={"Avenir"} fontSize={"15"} wordWrap="break-word" maxW="600px">{furniture.description}</Text>
                            </Flex>
                        </>
                    )}
                </Flex>
        </Flex>
    );
}

export default ItemPage;