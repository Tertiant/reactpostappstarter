import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { Flex, createStyles, Button } from '@mantine/core';
import useBoundStore from "../../store/Store";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({ 
postContainer: {
  margin: "0px 10% 0px 10%",
  maxWidth: "1000px",
  height: "auto",
  borderRadius: "8px",
  boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.25)",
  display: "flex",
  justifyContent: "space-between",
},



centeringDiv: {
  width: "100%",
  height: "auto",
  display: "flex",
  justifyContent: "center",
  margin: "0px 0px 500px 0px",
},

detailsList: {
  listStyleType: "none",
  padding: "42px",
  // display: "grid",
  // gridTemplateColumns: "auto",
  // gridTemplateRows: "42px 42px 60% 24px 16px"
},

postImage: {
  borderRadius: "0px 8px 8px 0px",
  maxWidth: "100%",
  height: "auto",
 
},


}))


export const PostDetailsPage = () => {
  const post = useLoaderData();
  const { classes, cx } = useStyles();
  const { user } = useBoundStore((state) => state);
  const truncatedEmail = post.email.split('@')[0];
  console.log(user);
  console.log(post.email);


  return (
    <div className={classes.centeringDiv}>
      <div className={classes.postContainer}>
        <ul className={classes.detailsList}>
          <li><h2>{post.title}</h2></li>
          <li><h3>{`Posted in ${post.category}`}</h3></li>
          <li><p>{post.content}</p></li>
          <li><p>{`Posted by ${truncatedEmail}`}</p></li>
          {user === post.email && 
            <Link to={`/posts/edit/${post.id}`}>
              <Button variant="blue" color="dark">
                Edit
              </Button>
            </Link>
          }
        </ul>
        <img 
          src={post.image}
          alt={post.content} 
          className={classes.postImage}  
        />
      </div>
    </div>
  );
}

export const postDetailsLoader = async ({params}) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return res.data;
};

export default PostDetailsPage;
