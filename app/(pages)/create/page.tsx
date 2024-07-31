'use client'
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
  VStack
} from "@chakra-ui/react";
import {  useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import * as Yup from 'yup';
import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { Article } from "../articles/articleList";




export type Tag = {
    id: number,
    label: string,
    value: string
}

const usePost = ( url: string) => {
    return useMutation({
         //mutationKey: [key],
         mutationFn: (post) => axios.post(`${url}`, post).then((res) => res.data) 
    })
}


export const tags = [{id:1, label:'Science', value: 'Science'}, {id:2, label:'Tech', value: 'Tech'}, 
    {id:3, label:'Dogs', value: 'Dogs'}, {id:4, label:'Cats', value: 'Cats'},
    {id:5, label:'Fiction', value: 'Fiction'}, {id:6, label:'Literature', value: 'Literature'},
    {id:7, label:'Anime', value: 'Anime'}, {id:8, label:'Food', value: 'Food'}]

const CreateArticle = () => {

    const { mutate } = usePost('http://localhost:8000/articles')
    const queryClient = useQueryClient()
    const toast = useToast()

    const [selectedTags, setSelectedTags] = useState<Tag[]>([])


    const formik = useFormik({
        initialValues: {
          userId: "",
          title: "",
          body: "",
        },
        validationSchema: Yup.object({
            userId: Yup.string().required('The name of the author is a required field'),
            title: Yup.string().required('Title is a required field'),
            body: Yup.string().required('Content of the article is a required field'),
          }),
        onSubmit: (values: any) => {
         let newArticle = {
            id: Math.ceil(Math.random()* (200 - 100 + 1) + 100), //random number greater than 100 and less than 200
            dateOfPublication: new Date().toISOString(),
            tags: selectedTags,
            ...values
         }
         mutate(newArticle, {
            onSuccess(data) {
                formik.resetForm()
                setSelectedTags([])
                toast({
                    position: 'top-right',
                    title: 'Article created.',
                    description: "List of articles has been updated with your post.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })
                queryClient.setQueryData(['articles'], (oldData: Article[]) => [data, ...oldData])
            },
            onError(error){
                console.log(error)
            }
        })
        }
      });

    return (
      
          <Box bg="white" p={6} rounded="md">
            <Heading size={'md'} pb={10}>New Article</Heading>
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
                   {formik.errors.title && formik.touched.title ? ( <span style={{color:'red'}}>Title is a required field.</span>) : null}
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
                  {formik.errors.userId && formik.touched.userId ? ( <span style={{color:'red'}}>The name of the author is a required field.</span>) : null}
                </FormControl>


                <FormControl>
                  <FormLabel htmlFor="body">Content</FormLabel>
                  <Textarea
                    id="body"
                    name="body"
                    rows={5}
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.body}
                  ></Textarea>
                  {formik.errors.body && formik.touched.body ? ( <span style={{color:'red'}}>Content of the article is a required field.</span>) : null}
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
              
                <Button type="submit" colorScheme="teal" >
                  Post
                </Button>
              </VStack>
            </form>
          </Box>
 
      );
  
}

export default CreateArticle


