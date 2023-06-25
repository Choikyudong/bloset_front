import { Box, Stack, Drawer, Grid, useMediaQuery, Typography, Chip } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import { Outlet, Route, Routes } from "react-router-dom";
import React from 'react';
import BlogPostCard from "../../compoent/board/BoardPost";
import NavGroup from "./BoardNav";
// theme constant
export const gridSpacing = 3;
export const drawerWidth = 260;
export const appDrawerWidth = 320;

interface MainProps {
  open: boolean;
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<MainProps>(({ theme, open }) => ({
  width: '100%',
  minHeight: 'calc(100vh - 88px)',
  flexGrow: 1,
  padding: '20px',
  marginTop: '88px',
  marginRight: '20px',
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(
    'margin',
    open
      ? {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }
      : {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }
  ),
  [theme.breakpoints.up('md')]: {
    marginLeft: open ? 0 : -(drawerWidth - 20),
    width: `calc(100% - ${drawerWidth}px)`
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: '20px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px'
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px',
    marginRight: '10px'
  }
}));

const BoardBody = () => {
  const [test, setTest] = React.useState<boolean>(true);
  const theme = useTheme();
  
interface Post {
  boardId: string;
  cover: string;
  title: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  createdAt: string; // createdAt 속성의 타입을 적절히 지정해주세요.
}

  // 샘플 데이터
  const testData = [
    {
      boardId: 'test1',
      cover: `/assets/images/covers/cover_.jpg`,
      title: '테스트1번',
      createdAt: '2023-03-05',
      author: {
        name: '테스트1번',
        avatarUrl: `/assets/images/avatars/avatar_.jpg`,
      },
    },
    {
      boardId: 'test1',
      cover: `/assets/images/covers/cover_.jpg`,
      title: '테스트1번',
      createdAt: '2023-03-05',
      author: {
        name: '테스트1번',
        avatarUrl: `/assets/images/avatars/avatar_.jpg`,
      },
    },
    {
      boardId: 'test1',
      cover: `/assets/images/covers/cover_.jpg`,
      title: '테스트1번',
      createdAt: '2023-03-05',
      author: {
        name: '테스트1번',
        avatarUrl: `/assets/images/avatars/avatar_.jpg`,
      },
    },
    {
      boardId: 'test1',
      cover: `/assets/images/covers/cover_.jpg`,
      title: '테스트1번',
      createdAt: '2023-03-05',
      author: {
        name: '테스트1번',
        avatarUrl: `/assets/images/avatars/avatar_.jpg`,
      },
    },
    {
      boardId: 'test1',
      cover: `/assets/images/covers/cover_.jpg`,
      title: '테스트1번',
      createdAt: '2023-03-05',
      author: {
        name: '테스트1번',
        avatarUrl: `/assets/images/avatars/avatar_.jpg`,
      },
    },
    {
      boardId: 'test1',
      cover: `/assets/images/covers/cover_.jpg`,
      title: '테스트1번',
      createdAt: '2023-03-05',
      author: {
        name: '테스트1번',
        avatarUrl: `/assets/images/avatars/avatar_.jpg`,
      },
    },
    {
      boardId: 'test1',
      cover: `/assets/images/covers/cover_.jpg`,
      title: '테스트1번',
      createdAt: '2023-03-05',
      author: {
        name: '테스트1번',
        avatarUrl: `/assets/images/avatars/avatar_.jpg`,
      },
    },
    {
      boardId: 'test1',
      cover: `/assets/images/covers/cover_.jpg`,
      title: '테스트1번',
      createdAt: '2023-03-05',
      author: {
        name: '테스트1번',
        avatarUrl: `/assets/images/avatars/avatar_.jpg`,
      },
    },
    {
      boardId: 'test1',
      cover: `/assets/images/covers/cover_.jpg`,
      title: '테스트1번',
      createdAt: '2023-03-05',
      author: {
        name: '테스트1번',
        avatarUrl: `/assets/images/avatars/avatar_.jpg`,
      },
    },
    {
      boardId: 'test1',
      cover: `/assets/images/covers/cover_.jpg`,
      title: '테스트1번',
      createdAt: '2023-03-05',
      author: {
        name: '테스트1번',
        avatarUrl: `/assets/images/avatars/avatar_.jpg`,
      },
    },
    {
      boardId: 'test1',
      cover: `/assets/images/covers/cover_.jpg`,
      title: '테스트1번',
      createdAt: '2023-03-05',
      author: {
        name: '테스트1번',
        avatarUrl: `/assets/images/avatars/avatar_.jpg`,
      },
    },
  ];

  return (
    <>
      <Sidebar />
      <Main theme={theme} open={test}>
        <Grid container spacing={3}>
          {testData.map((post:any, index:number) => (
            <BlogPostCard key={post.boardId} post={post} index={index} />
          ))}
        </Grid>
        <Outlet />
      </Main>
    </>
  );
}

const Sidebar = () => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const utilities:MenuItem = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
      {
        id: 'util-typography',
        title: 'Typography',
        type: 'item',
        url: '/utils/util-typography',
        icon: 'icon1',
        breadcrumbs: false
      },
      {
        id: 'util-color',
        title: 'Color',
        type: 'item',
        url: '/utils/util-color',
        icon: 'icon2',
        breadcrumbs: false
      },
    ]
  };

  const menuItems = {
    items: [utilities]
  };

  interface MenuItem {
    id: string;
    type: string;
    title: string;
    children?: Item[];
  }

  interface Item {
    id: string
    title: string
    type: string
    url: string
    icon: string,
    breadcrumbs: false
  }
  
  const MenuList = () => {
    const navItems = menuItems.items.map((item:MenuItem) => {
      switch (item.type) {
        case 'group':
          return <NavGroup key={item.id} item={item} />;
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Menu Items Error
            </Typography>
          );
      }
    });
    return <>{navItems}</>;
  };

  const drawer = (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
          {/* <LogoSection /> */}
        </Box>
      </Box>
      <MenuList />
    </>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
      <Drawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        // open={drawerOpen}
        // onClose={drawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: 'none',
            [theme.breakpoints.up('md')]: {
              top: '88px'
            }
          }
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default BoardBody;
  