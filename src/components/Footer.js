import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box>
      <Text fontSize={10}>&copy; {new Date().getFullYear()} LivingARt</Text>
    </Box>
  );
};

export default Footer;
