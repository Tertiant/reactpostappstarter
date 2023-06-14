import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { createStyles } from '@mantine/core';


const useStyles = createStyles((theme) => ({ 
postContainer: {
    width: 50%,
    height: auto,
    borderRadius: 6px,
    boxShadow: 0px 0px 30px rgba(0, 0, 0, 0.25),
},


}))


function PostDetailsPage() {
  const post = useLoaderData();
  const { classes, cx } = useStyles();
  console.log(post);

  return (
    <div className={classes.postContainer}>
      <ul>
        <li>{post.userId}</li>
        <li>{post.title}</li>
        <li>{post.category}</li>
        <li>{post.content}</li>
      </ul>
      <img src={post.image} alt={post.content} />
    </div>
  );
}

export const postDetailsLoader = async ({params}) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id-1}`);
  return res.data;
};

export default PostDetailsPage;
