import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import { createStyles, Button, TextInput, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import useBoundStore from "../../store/Store";
import { Link } from "react-router-dom";
import { useState } from "react";

const useStyles = createStyles((theme) => ({ 
postContainer: {
  margin: "0px 10% 0px 10%",
  maxWidth: "1000px",
  height: "auto",
  borderRadius: "8px",
  boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.25)",
  display: "flex",
  justifyContent: "space-between",
  padding: "64px",
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


export const EditPostPage = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const post = useLoaderData();

  const form = useForm({
    initialValues: {...post},
  });

  const handleSubmit = async (values) => {
    // console.log(values.id);
    const res = await axios.post(`${DOMAIN}/api/posts/edit/${values.id}`, values);
    navigate(`/posts/${values.id}`);
  };

  return (
    <div className={classes.centeringDiv}>
      <div className={classes.postContainer}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Title"
            placeholder={post.title}
            {...form.getInputProps("title")}
          />

          <TextInput
            label="Category"
            placeholder={post.category}
            {...form.getInputProps("category")}
          />
          <TextInput
            label="Image"
            placeholder={post.image}
            {...form.getInputProps("image")}
          />

          <TextInput
            label="Content"
            placeholder={post.content}
            {...form.getInputProps("content")}
          />

          <Group position="right" mt="md">
            <Button type="submit">Update</Button>
          </Group>
        </form>
      </div>
    </div>
  );
}

export const postEditsLoader = async ({params}) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return res.data;
};

// export default EditPostPage;
