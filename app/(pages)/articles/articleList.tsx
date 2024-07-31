
'use client'
import { Grid, Heading, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { lazy, Suspense, useEffect, useState } from "react";
import Loading from "../../components/Loading"
import Pagination from "../../components/Pagination";
import DeleteModal from "../../components/DeleteModal";
import UpdateModal from "../../components/UpdateModal";

import { Tag } from "../create/page";

export type Article = {
    userId: string;
    id: number;
    title: string;
    body: string;
    dateOfPublication?: any;
    tags?: Tag[]
  };

  type PropTypes = {
    list: Article[]
  }


const ArticleCard = lazy(() => import("../../components/ArticleCard"));

function ArticleList({list}: PropTypes) {

    const [articles, setArticles] = useState<Article[]>([]);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
    const [pageIndex, setpageIndex] = useState<number>(0);
    const [resultsPerPage] = useState<number>(9);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  
  
    const totalNumberOfPages = Math.ceil(articles.length / resultsPerPage);
    const visibleArticles = articles.slice(
      resultsPerPage * pageIndex,
      resultsPerPage * pageIndex + resultsPerPage
    );
    const pages = Array(totalNumberOfPages).fill(0).map((item, index) => item + index);
  
  
   useEffect(() => {
          setArticles(list.reverse())
   }, [])
   
  return (
    <Grid p={4}>
      
    <Heading size={"md"} pb={10}>
      Articles
    </Heading>
      <Pagination pages={pages} pageIndex={pageIndex} totalNumberOfPages={totalNumberOfPages} setpageIndex={setpageIndex}/>

    <SimpleGrid
      p={10}
      spacing={10}
      minChildWidth="400px"
      h={"80vh"}
      minH={"80vh"}
      overflow={"auto"}
    >
      <Suspense fallback={<Loading message="Fetching data"/>}>
        {visibleArticles?.map((article: Article) => (
          <ArticleCard key={article?.id} article={article} onOpen={onOpen} onOpenEdit={onEditOpen} setSelectedArticle={setSelectedArticle}/>
        ))}
      </Suspense>
    </SimpleGrid>
    <Pagination  pages={pages} pageIndex={pageIndex} totalNumberOfPages={totalNumberOfPages} setpageIndex={setpageIndex}/>
    <DeleteModal isOpen={isOpen} onClose={onClose} articles={articles} setArticles={setArticles} selectedArticle={selectedArticle}/>
    <UpdateModal isOpen={isEditOpen} onClose={onEditClose} articles={articles} setArticles={setArticles} selectedArticle={selectedArticle}/>
  </Grid>
  )
}

export default ArticleList