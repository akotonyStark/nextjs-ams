import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Article } from "../(pages)/articles/page"
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Tag, tags } from "../(pages)/create/page";
import { MultiSelect } from "react-multi-select-component";

type UpdateModalProps = {
  isOpen: boolean;
  onClose: () =>  void;
  selectedArticle: any;
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
};


const useUpdate = (url: string) => {
  return useMutation({
    //mutationKey: [key],
    mutationFn: (data: Article) =>
      axios.put(`${url}`, data).then((res) => res.data)
  });
};

export default function UpdateModal({
  isOpen,
  onClose,
  articles,
  setArticles,
  selectedArticle
}: UpdateModalProps) {
  const { mutate } = useUpdate(`http://localhost:8000/articles/${selectedArticle?.id}`);
  const toast = useToast();



  const [selectedTags, setSelectedTags] = useState<Tag[]>([])

  const formik = useFormik({
    initialValues: {
      userId: "",
      title: "",
      body: "",
    },
    validationSchema: Yup.object({
      userId: Yup.string().required(
        "The name of the author is a required field"
      ),
      title: Yup.string().required("Title is a required field"),
      body: Yup.string().required("Content of the article is a required field"),
    }),
    onSubmit: (values: any) => {
      let article = {
        id: selectedArticle?.id,
        dateOfPublication: new Date().toISOString(),
        tags: selectedTags,
        ...values,
      };

      mutate(article, {
        onSuccess(data) {
          toast({
            position: "top-right",
            title: "Article updated successfully.",
            description: "List of articles has been updated with your post.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          let updated = [...articles]
          let index = updated.findIndex(article => article.id == data.id)
          updated[index] = data
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
      onClose()
    },
  });


  useEffect(() => {
        formik.setFieldValue("title", selectedArticle?.title)
        formik.setFieldValue("userId", selectedArticle?.userId)
        formik.setFieldValue("body", selectedArticle?.body)
        setSelectedTags(selectedArticle?.tags || [])
  }, [selectedArticle])


  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {selectedArticle?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box bg="white" p={6} rounded="md">
              <form onSubmit={formik.handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input
                      id="title"
                      name="title"
                      type="text"
                      variant="filled"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                    />
                    {formik.errors.title && formik.touched.title ? (
                      <span style={{ color: "red" }}>
                        Title is a required field.
                      </span>
                    ) : null}
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="userId">Author</FormLabel>
                    <Input
                      id="userId"
                      name="userId"
                      type="text"
                      variant="filled"
                      onChange={formik.handleChange}
                      value={formik.values.userId}
                    />
                    {formik.errors.userId && formik.touched.userId ? (
                      <span style={{ color: "red" }}>
                        The name of the author is a required field.
                      </span>
                    ) : null}
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="body">Content</FormLabel>
                    <Textarea
                      id="body"
                      name="body"
                      rows={7}
                      variant="filled"
                      onChange={formik.handleChange}
                      value={formik.values.body}
                    ></Textarea>
                    {formik.errors.body && formik.touched.body ? (
                      <span style={{ color: "red" }}>
                        Content of the article is a required field.
                      </span>
                    ) : null}
                  </FormControl>

                  <FormControl>
                  <FormLabel htmlFor="tags">Tags</FormLabel>
                  <MultiSelect
                    options={tags}
                    value={selectedTags}
                    onChange={setSelectedTags}
                    labelledBy="Select"
                />
                 
                </FormControl>

                  <Button type="submit" colorScheme="teal">
                    Update
                  </Button>
                </VStack>
              </form>
            </Box>
          </ModalBody>

          
        </ModalContent>
      </Modal>
    </>
  );
}
