import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

const InputModal = ({isOpen,onClose}) => {
  return (
    <Modal
    isOpen={isOpen}
    onClose={onClose}
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>CREATE YOUR TODO</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input placeholder='Title' />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Description</FormLabel>
          <Input placeholder='Description' />
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3}>
          Save
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}
export default InputModal