import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container, Loader } from "@mantine/core";
import { useLoaderData, Await, defer } from "react-router-dom";
import React from "react";


export const PostPage = () => {
  const data = useLoaderData();
  console.log(data);

  return (
    <Container>          
      <SimpleGrid cols={3}>
        <React.Suspense
          fallback={<Loader color="gray" />}
            // fallback={<p>Loading Posts</p>}
        >
          <Await
            resolve={data.postPromise}
            errorElement={
              <p>Error loading posts!</p>
            }  
          >
              {(postPromise) => (postPromise.data.map((post) => (
                <ArticleCardImage key={post.title} {...post}/>
              )))}
          </Await>
        </React.Suspense>          
      </SimpleGrid>
    </Container>
  );
};

export const postsLoader = async () => {
  const res = axios.get(`${DOMAIN}/api/posts`);
  return defer({ postPromise: res });
};
