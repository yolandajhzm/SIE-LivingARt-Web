import { useState, useEffect } from "react";
import { Flex, Box, Spacer, Image, Button, Grid, Text, Menu, useDisclosure, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { AiOutlineUser, AiOutlineUpload } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Divider } from '@chakra-ui/react'
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import UploadModal from "../components/UploadModal";
import { callApi } from "../components/API";

// TODO: Pagination

const dummyData = [
    {
        id: 1,
        name: "Chair1",
        imageSource: "../assets/chair.png",
        description: "This is Chair1.",
    },
    {
        id: 2,
        name: "Table1",
        imageSource: "../assets/table.png",
        description: "This is Table1.",
    },
    {
        id: 3,
        name: "Chair2",
        imageSource: "../assets/chair.png",
        description: "This is Chair2.",
    },
    {
        id: 4,
        name: "Table2",
        imageSource: "../assets/table.png",
        description: "This is Table2.",
    },
    {
        id: 5,
        name: "Sofa1",
        imageSource: "../assets/sofa.png",
        description: "This is Sofa1.",
    },
  ];

function HomePage(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state.userId || localStorage.getItem("userId");
    const email = location.state.email || localStorage.getItem("email");
    console.log("email: ", email);
    const [allData, setAllData] = useState([]); 
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSignout = () => {
        localStorage.removeItem("userId"); 
        localStorage.removeItem("email"); 
        navigate("/"); 
    };

    useEffect(() => {
    const fetchFurniture = async () => {
        try {
          const response = await axios.post("https://5a45-2601-647-4b80-78a0-c065-8375-c08-9e97.ngrok-free.app/api/furniture/info/user", { email } 
        ,{
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(response);
        if (response.data.code === 0) {
          setAllData(response.data.data);
          console.log("Get successful");
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
                    <UploadModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} vendorId={userId} />
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
                {allData.map((furniture) => (
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
                    onClick={() => navigate(`/furniture/${furniture.id}`, { state: { furniture } })}
                    >
                    <Image src={furniture.imageSource} alt={furniture.name} height="230px" borderRadius={"10"}/>
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