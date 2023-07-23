import { useState } from "react";
import { Button, Modal, ModalOverlay, Textarea, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";

import axios from 'axios';
import URL from "./URL";

const UploadModal = ({ isOpen, onClose, onOpen, vendorId }) => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [furnitureType, setFurnitureType] = useState("chair");
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUpload = async() => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("type", furnitureType);
      formData.append("image-file", selectedImage);
      formData.append("three-model", selectedModel);
      formData.append("description", description);
      formData.append("vendorId", vendorId); // TODO: change to actual vendor id
  
      console.log([...formData]); // Log the form data for debugging

     
     
      const response = await axios.post(URL.UPLOAD_FURNITURE, formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);
      if (response.data.code === 0) {
        console.log("Upload successful");
        window.location.reload();
      } else {
        alert(response.data.msg);
        console.error("Upload failed");
      }
    } catch (error) {
      // Handle error
      console.error("Error during upload", error);
    }
  
    // Reset the state and close the modal
    setName("");
    setDescription("");
    setSelectedModel(null);
    setSelectedImage(null);
    onClose();
  };
  
  
  const handleModelChange = (event) => {
    const modelFile = event.target.files[0];
    setSelectedModel(modelFile);
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTypeChange = (event) => {
    console.log("type change: " + event.target.value);
    setFurnitureType(event.target.value)
  };

  const handleClose = () => {
    setDescription(""); 
    onClose(); 
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload New Furniture</ModalHeader>
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
            <FormLabel>Select 3D Model</FormLabel>
            <Input type="file" accept=".zip" onChange={handleModelChange} borderWidth={0} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Select Image</FormLabel>
            <Input type="file" accept="image/*" onChange={handleImageChange} borderWidth={0} />
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
          <Button bgColor='#272727' color='white' mr={3} onClick={handleUpload}>
            Upload
          </Button>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadModal;
