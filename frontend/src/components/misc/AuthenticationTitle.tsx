import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import React from 'react';
import useBoundStore from "../../store/Store";

export function AuthenticationTitle() {
    const { 
            loginService, 
            authLoading, 
            user,
            email,
            setEmail,
            password,
            setPassword,
          } = useBoundStore((state) => state);

    const onLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) return;
        loginService(email, password);
        // clearInputs();
      };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome back!
      </Title>
      {/* <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text> */}

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput value={email} label="Email" placeholder="you@mantine.dev" required onChange={(e)=>(setEmail(e.target.value))}/>
            <PasswordInput value={password} label="Password" placeholder="Your password" required mt="md" onChange={(e)=>(setPassword(e.target.value))}/>
            {/* <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
                Forgot password?
            </Anchor>
            </Group> */}
            <Button fullWidth mt="xl" onClick={onLogin}>
            Sign in
            </Button>
      </Paper>
    </Container>
  );
}