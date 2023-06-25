import { AppBar, Avatar, Box, Toolbar, ButtonBase, Chip } from "@mui/material";
import React from "react";

const settings = ['Profile', 'Logout'];

const BoardHeader = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [isLogin, setLogin] = React.useState<Boolean>(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    //setAnchorElUser(event.currentTarget);
    window.location.href = 'http://localhost:3000/setting'
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    const hasToken = localStorage.getItem('test');
    if (hasToken === null) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  return (
    <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        // sx={{
        //   bgcolor: theme.palette.background.default,
        //   transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
        // }}
      >
        <Toolbar>
        <>
          <Box
            sx={{
              width: 228,
              display: 'flex',
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
              {/* <LogoSection /> */}
              <h1>헤헷</h1>
            </Box>
            <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
              <Avatar
                variant="rounded"
                // sx={{
                //   ...theme.typography.commonAvatar,
                //   ...theme.typography.mediumAvatar,
                //   transition: 'all .2s ease-in-out',
                //   background: theme.palette.secondary.light,
                //   color: theme.palette.secondary.dark,
                //   '&:hover': {
                //     background: theme.palette.secondary.dark,
                //     color: theme.palette.secondary.light
                //   }
                // }}
                // onClick={handleLeftDrawerToggle}
                color="inherit"
              >
                {/* <IconMenu stroke={1.5} size="1.3rem" /> */}
              </Avatar>
            </ButtonBase>
          </Box>

          {/* header search */}
          {/* <SearchSection /> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 1 }} />

          <Chip
            // sx={{
            //   height: '48px',
            //   alignItems: 'center',
            //   borderRadius: '27px',
            //   transition: 'all .2s ease-in-out',
            //   borderColor: theme.palette.primary.light,
            //   backgroundColor: theme.palette.primary.light,
            //   '&[aria-controls="menu-list-grow"], &:hover': {
            //     borderColor: theme.palette.primary.main,
            //     background: `${theme.palette.primary.main}!important`,
            //     color: theme.palette.primary.light,
            //     '& svg': {
            //       stroke: theme.palette.primary.light
            //     }
            //   },
            //   '& .MuiChip-label': {
            //     lineHeight: 0
            //   }
            // }}
            icon={
              <Avatar
                // src={User1}
                sx={{
                  // ...theme.typography.mediumAvatar,
                  margin: '8px 0 8px 8px !important',
                  cursor: 'pointer'
                }}
                // ref={anchorRef}
                // aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                color="inherit"
              />
            }
            // label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
            variant="outlined"
            // ref={anchorRef}
            // aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            // onClick={handleToggle}
            color="primary"
          />
        </>
        </Toolbar>
    </AppBar>
  );
}

export default BoardHeader;
