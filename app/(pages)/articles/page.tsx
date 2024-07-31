import { Metadata } from "next";
import ArticleList from "./articleList";
//import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// const useGet = (key:string, url: string) => {
//   // throw new Error("some error occured")
//     return useQuery({
//       queryKey: [key],
//       queryFn: () => axios.get(`${url}`).then((res) => res.data),
//       refetchOnWindowFocus: true ,
//       gcTime: 6000,
//       retry: 3,
//       //refetchInterval: 3000
//     })
//   }

const getData = async() => {
    let res = await axios.get("http://localhost:8000/articles")
    let data = await res.data
    return data
}

export const metadata: Metadata = {
    title: "AMS - Articles",
    description: "List of Articles",
  };
  

const Articles = async() => {

  const data = await getData()
 
  return (
    <ArticleList list={data} />
  );
};

export default Articles;
