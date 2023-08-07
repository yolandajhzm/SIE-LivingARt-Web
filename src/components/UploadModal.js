import { useState } from "react";
import { Button, Modal, ModalOverlay, Textarea, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, FormControl, FormLabel, Input, Select, Grid } from "@chakra-ui/react";

import axios from 'axios';
import URL from "./URL";

const UploadModal = ({ isOpen, onClose, onOpen, vendorId }) => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [furnitureType, setFurnitureType] = useState("chair");
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");

  const handleUpload = async() => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("type", furnitureType);
      formData.append("image-file", selectedImage);
      formData.append("three-model", selectedModel);
      formData.append("description", description);
      formData.append("height", height);
      formData.append("width", width);
      formData.append("length", length);
      formData.append("vendorId", vendorId); 
  
      console.log([...formData]); // Log the form data for debugging
     
      // const response = await axios.post(URL.UPLOAD_FURNITURE, {
      // headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // },  { data: formData });
      const response = await axios.post(URL.UPLOAD_FURNITURE, formData);

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
    
    handleClose();
  };
  
  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleWidthChange = (event) => {
    setWidth(event.target.value);
  };

  const handleLengthChange = (event) => {
    setLength(event.target.value);
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
    setFurnitureType(event.target.value)
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setSelectedModel(null);
    setSelectedImage(null);
    setHeight("");
    setWidth("");
    setLength("");
    onClose(); 
  };

  // true: not all fields are filled
  const areAllFieldsFilled = () => {
    return (
      name.trim() == "" ||
      selectedModel == null ||
      selectedImage == null ||
      height.trim() == "" ||
      width.trim() == "" ||
      length.trim() == "" ||
      description.trim() == ""
    );
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
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            <FormControl mt={4}>
              <FormLabel>Height (cm)</FormLabel>
              <Input
                value={height}
                onChange={handleHeightChange}
                type="number"
                step="0.01" 
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Width (cm)</FormLabel>
              <Input
                value={width}
                onChange={handleWidthChange}
                type="number"
                step="0.01" 
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Length (cm)</FormLabel>
              <Input
                value={length}
                onChange={handleLengthChange}
                type="number"
                step="0.01" 
              />
            </FormControl>
          </Grid>
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
          <Button bgColor='#272727' color='white' mr={3} onClick={handleUpload} disabled={areAllFieldsFilled}>
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
