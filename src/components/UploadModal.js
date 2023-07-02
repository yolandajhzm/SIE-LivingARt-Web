import { useState } from "react";
import { Button, Modal, ModalOverlay, Textarea, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";

const UploadModal = ({ isOpen, onClose, onOpen }) => {
  const [description, setDescription] = useState("");
  const [furnitureType, setFurnitureType] = useState("");
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUpload = async () => {
    // try {
    //     const formData = new FormData();
    //     formData.append("description", description);
    //     formData.append("furnitureType", furnitureType);
    //     formData.append("model", selectedModel);
    //     formData.append("image", selectedImage);
        
    //     const response = await callApi("url", "POST", formData);

    //     if (response.success) {
    //         //TODO: Handle success
    //         // reload the page
    //         console.log("Upload successful");
    //     } else {
    //         // Handle failure
    //         console.error("Upload failed");
    //     }
    // } catch (error) {
    //   // Handle error
    //   console.error("Error during upload", error);
    // }
    // Reset the state and close the modal
    setDescription("");
    setFurnitureType("");
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

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTypeChange = (event) => {
    setFurnitureType(event.target.value)
  };

  const handleClose = () => {
    setDescription(""); // Clear the description
    onClose(); // Close the modal
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload New Furniture</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Select 3D Model</FormLabel>
            <Input type="file" accept=".obj,.glb" onChange={handleModelChange} borderWidth={0} />
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
              <option value="1">Chair</option>
              <option value="2">Table</option>
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
