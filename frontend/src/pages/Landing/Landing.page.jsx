import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({ 

  centeringDiv: {
    width: "100%",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    margin: "0px 0px 500px 0px",
    
    h1: {
      color: '#0060df',
    }
  },

}));

const Landing = () => {
  const {classes} = useStyles();

  return (
  <div className={classes.centeringDiv}>
    <h1>Welcome Home</h1>
  </div>
  );
};

export default Landing;
