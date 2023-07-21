import { useState } from "react";
import { Button, Modal, ModalOverlay, Select, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { callApi } from "./API";
import URL from "./URL";

const LogInModal = ({ isOpen, onClose, onOpen }) => {
  const navigate = useNavigate();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { handleSubmit, register, formState: { errors }, watch, reset } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const openSignUp = () => {
    reset(); 
    onClose(); 
    setShowRegisterModal(true);
  };

  const onLogin = async (data) => {
    setEmail(data.email);
    setPassword(data.password);
    // TODO: Send the login data to the backend
    // try {
    //   const response = await callApi(URL.LOGIN_USER, "PUT", {
    //     email: data.email,
    //     password: data.password,
    //   });

    //   reset();

    //   //successs code = 0, error code = 1
    //   if (response.code === 0) { 
    //     const userId = response.data.id; 
    //     const userType = response.data['user-type'];
    //     if(userType === 0) {
    //       alert("This is a customer account. Please log in with a vendor account.");
    //       onClose();
    //     } else {
    //       onClose();
    //       localStorage.setItem("userId", userId);
    //       localStorage.setItem("email", data.email);
    //       navigate("/home", { state: { userId, email: data.email } });
    //   }
    //   } else {
    //     alert(response.msg);
    //     console.error("Login failed");
    //   }
    // } catch (error) {
    //   console.error("Error during login", error);
    // }
    const userId = 1;
    localStorage.setItem("userId", userId);
    localStorage.setItem("email", data.email);
    navigate("/home", { state: { userId, email: data.email } });
  };

  const onSignUp = async (data) => {
    setEmail(data.email);
    setPassword(data.password);
    setUserType(data.userType);
    // TODO: Send the sign up data to the backend
    try {
      const response = await callApi(URL.REGISTER_USER, "POST", {
        email: data.email,
        password: data.password,
        type: data.userType,
      });
      console.log("response: ", response);
      //successs code = 0, error code = 1
      if (response.code === 0) { 
        setShowRegisterModal(false);
        reset(); 
        onOpen();
      } else {
        alert(response.msg);
        console.error("Sign up failed");
      }
    } catch (error) {
      console.error("Error during sign up", error);
    }
  };

  const closeModal = () => {
    setShowRegisterModal(false)
    reset(); 
    onClose(); 
  };

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="email" isInvalid={errors.email}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })} />
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="password" mt={4} isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <Input type="password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })} />
              <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button pr="40" variant="link" onClick={openSignUp}>Sign Up</Button>
            <Button bgColor='#272727' color='white' mr={3} onClick={handleSubmit(onLogin)}>
              Login
            </Button>
            <Button variant="ghost" onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {showRegisterModal && (
        <Modal isOpen={showRegisterModal} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="email" isInvalid={errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input type="email" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })} />
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="password" mt={4} isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <Input type="password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })} />
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="confirmPassword" mt={4} isInvalid={errors.confirmPassword}>
                <FormLabel>Confirm Password</FormLabel>
                <Input type="password" {...register("confirmPassword", { required: "Confirm Password is required", validate: (value) => value === watch("password") || "Passwords do not match" })} />
                <FormErrorMessage>{errors.confirmPassword && errors.confirmPassword.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="userType" mt={4} onChange={(event) => setUserType(event.target.value)}>
                <FormLabel>Are you a vendor?</FormLabel>
                <Select {...register("userType")}>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </Select>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button bgColor='#272727' color='white' mr={3} onClick={handleSubmit(onSignUp)}>
                Sign Up
              </Button>
              <Button variant="ghost" onClick={closeModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default LogInModal;
