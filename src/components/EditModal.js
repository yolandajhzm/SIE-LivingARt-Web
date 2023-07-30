import { useState } from "react";
import { Button, Modal, ModalOverlay, Textarea, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { set } from "react-hook-form";

import { callApi } from "./API";
import URL from "./URL";

// TODO: Connect to backend

const EditModal = ({ isOpen, onClose, onOpen, vendorId, furniture }) => {
  const navigate = useNavigate();
  const [description, setDescription] = useState(furniture.description);
  const [name, setName] = useState(furniture.name);
  const [furnitureType, setFurnitureType] = useState(furniture.type);

  const handleDelete = async() => {
    try {
      const formData = new FormData();
      formData.append("itemId", furniture.id);
      console.log('furniture.id: ', furniture.id);

      const idArray = [
        furniture.id
      ];

      const response = await axios.delete(URL.DELETE_FURNITURE, { data: idArray }, {
        headers: {
            'Content-Type': 'application/json',
          },
      });

      console.log(response);
      if (response.data.code === 0) {
        console.log("Delete successful");
        navigate("/home");
      } else {
        alert(response.data.msg);
        console.error("Delete failed");
      }
    } catch (error) {
      // Handle error
      console.error("Error during delete", error);
    }
  
    // Reset the state and close the modal
    onClose();
  };

  const handleEdit = async() => {
    try {
      const formData = new FormData();
      formData.append("itemId", furniture.id);
      formData.append("name", name);
      formData.append("type", furnitureType);
      formData.append("description", description);
      formData.append("vendorId", vendorId); 
  
      console.log([...formData]); // Log the form data for debugging

      const response = await axios.post(URL.UPDATE_FURNITURE, formData, {
      headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);
      if (response.data.code === 0) {
        console.log("Edit successful");
        // window.location.reload();
      } else {
        alert(response.data.msg);
        console.error("Edit failed");
      }
    } catch (error) {
      // Handle error
      console.error("Error during edit", error);
    }
  
    // Reset the state and close the modal
    onClose();
  };
  
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTypeChange = (event) => {
    setFurnitureType(event.target.value)
  };

  const handleClose = () => {
    onClose(); 
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Furniture Info</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <FormControl>
            <FormLabel>Furniture Name</FormLabel>
            <Textarea
              value={name}
              onChange={handleNameChange}
              rows={1}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={handleDescriptionChange}
              rows={4}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Furniture Type</FormLabel>
            <Select value={furnitureType} onChange={handleTypeChange}>
              <option value="chair">Chair</option>
              <option value="table">Table</option>
              <option value="sofa">Sofa</option>
              <option value="lamp">Lamp</option>
              {/* Add more options here */}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button bgColor='#545454' color='white' mr={3} onClick={handleDelete}>
            Delete
          </Button>
          <Button bgColor='#272727' color='white' mr={3} onClick={handleEdit}>
            Apply
          </Button>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
