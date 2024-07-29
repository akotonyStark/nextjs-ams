import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react"
import { Article } from "../pages/Articles"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"


type DeleteModalProps = {
    isOpen: boolean,
    onClose: () =>  void,
    articles: Article[],
    setArticles: React.Dispatch<React.SetStateAction<Article[]>>
    selectedArticle: any
}


export default function DeleteModal({ isOpen, onClose, selectedArticle, articles, setArticles }: DeleteModalProps) {
   
    const mutation = useMutation({
        mutationFn: (id:number) => {
          return axios.delete(`http://localhost:8000/articles/${id}`)
        },
      })

      const toast = useToast();

    const handleDelete = () => {
        onClose()
        //mutation.mutate(selectedArticle.id)
        mutation.mutate(selectedArticle.id, {
          onSuccess() {
            toast({
              position: "top-right",
              title: "Article Deleted.",
              description: "List of articles has been updated",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            let updated = articles.filter(article => article.id !== selectedArticle.id)
            setArticles(updated);
          },
          onError(error) {
            toast({
              position: "top-right",
              title: "Error. Failed to delete.",
              description: JSON.stringify(error.message),
              status: "error",
              duration: 9000,
              isClosable: true,       
            });
          },
        });
    }
    return (
      <>
       
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Message</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to delete the article <strong>{selectedArticle?.title}</strong>?
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='teal' mr={3} onClick={handleDelete}>
                Yes
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }