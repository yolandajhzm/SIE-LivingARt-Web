import { useState, useEffect } from "react";
import { Flex, Box, Spacer, Image, Button, Grid, Text, Menu, useDisclosure, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { AiOutlineUser, AiOutlineUpload } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Divider } from '@chakra-ui/react'
import { useNavigate, useLocation } from "react-router-dom";

import UploadModal from "../components/UploadModal";
import { callApi } from "../components/API";

// TODO: Pagination

const dummyData = [
    {
        id: 1,
        name: "Chair1",
        imageSrc: "../assets/chair.png",
        description: "This is Chair1.",
    },
    {
        id: 2,
        name: "Table1",
        imageSrc: "../assets/table.png",
        description: "This is Table1.",
    },
    {
        id: 3,
        name: "Chair2",
        imageSrc: "../assets/chair.png",
        description: "This is Chair2.",
    },
    {
        id: 4,
        name: "Table2",
        imageSrc: "../assets/table.png",
        description: "This is Table2.",
    },
    {
        id: 5,
        name: "Sofa1",
        imageSrc: "../assets/sofa.png",
        description: "This is Sofa1.",
    },
  ];

function HomePage(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state;
    const [allData, setAllData] = useState([]); 
    const { isOpen, onOpen, onClose } = useDisclosure();

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

    // const fetchFurniture = async () => {
    //     try {
    //       const response = await callApi("url", email);
    //       setAllData(response.data);
    //     } catch (error) {
    //       console.error(error);
    //     }
    // };
    
    // useEffect(() => {
    //   fetchFurniture(); 
    // }, []);

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
                <Box flex='1'>
                    <Text pt="5" fontFamily={"Avenir"} fontSize={["20", "20", "30"]}> My Furniture List </Text>
                </Box>
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
                    <UploadModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
                    <Button  pl='5' pt='3' variant='link' onClick={onOpen} leftIcon={<AiOutlineUpload />} colorScheme="darkgray">Upload</Button>
                </Flex>
            </Flex>
            <Divider />
            {/* Furniture grid */}
            <Box flex="10" p={4}>
                <Grid
                templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} // Responsive grid layout
                gap={4}
                >
                {dummyData.map((furniture) => (
                    <Box
                    key={furniture.id}
                    p={2}
                    bgColor="white"
                    borderRadius="md"
                    boxShadow="md"
                    cursor="pointer"
                    height="300px"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    onClick={() => navigate(`/furniture/${furniture.id}`, { state: { email: email } })}
                    >
                    <Image src={furniture.imageSrc} alt={furniture.name} height="230px" borderRadius={"10"}/>
                    <Text mt={2}  fontFamily={"Avenir"} fontWeight={"bold"}>
                        {furniture.name}
                    </Text>
                    </Box>
                ))}
                </Grid>
            </Box>
        </Flex>
    );
}

export default HomePage;