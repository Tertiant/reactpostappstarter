import { useState } from 'react';
import { createStyles, Header, Container, Group, Burger, rem, Transition, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantine/ds';
import React from 'react';
import { NavLink } from 'react-router-dom';
import useBoundStore from "../../store/Store";
import { SwitchToggle } from './SwitchToggle';

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

interface HeaderSimpleProps {
  links: { link: string; label: string }[];
}



export function HeaderSimple(/*{ links }: HeaderSimpleProps*/) {
  const [opened, { toggle }] = useDisclosure(false);
  // const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();
  const { logoutService, user } = useBoundStore((state) => state);
  const onLogout = () => {
    logoutService();
  };

  // const items = links.map((link) => (
  //   <NavLink
  //     key={link.label}
  //     to={link.link}
  //     className={cx(classes.link, { [classes.linkActive]: active === link.link })}
  //     onClick={(event) => {
  //       // event.preventDefault();
  //       setActive(link.link);
  //     }}
  //   >
  //     {link.label}
  //   </NavLink>
  // ));

  const loggedInItems = [
    <NavLink to="/">Home</NavLink>,
    <NavLink to="/posts">Posts</NavLink>,
    <NavLink to="/" onClick={onLogout}>Logout</NavLink>
  ];
  const loggedOutItems = [
    <NavLink to="/">Home</NavLink>,
    <NavLink to="/login">Login</NavLink>
  ];


  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <NavLink to="/">
        <MantineLogo size={28} />
        </NavLink>
        <Group spacing={5} className={classes.links}>
          {!user && [ // If the user is logged out:
            loggedOutItems
          ]}
          {!!user && [ // If the user is logged in:
            loggedInItems
          ]}
        </Group>
        <SwitchToggle/>
        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {!user && [ // If the user is logged out:
                loggedOutItems
              ]}
              {!!user && [ // If the user is logged in:
                loggedInItems
              ]}
            </Paper>
          )}
        </Transition>

      </Container>
    </Header>
  );
}