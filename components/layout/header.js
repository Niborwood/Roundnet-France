import PropTypes from 'prop-types';
import menuElements from './menu-elements';
import Image from 'next/image';
import Link from 'next/link';

// MATERIAL COMPONENTS
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

// OUTER COMPONENTS
import MenuDrawer from './menu-drawer';

function HideOnScroll(props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

function Header(props) {
  const menuItems = menuElements.map((item) => (
    <Link key={item.name} href={item.url} passHref>
      <Button color="inherit">
        {item.name}
      </Button>
    </Link>
  ));

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <HideOnScroll {...props}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Toolbar>
            <MenuDrawer />
            <span>Logo</span>
            <Typography ml={2} variant="h6" component="h1" sx={{ flexGrow: 1 }}>
              Roundnet France
            </Typography>
            <ButtonGroup variant="text" sx={{ display: { xs: 'none', md: 'block' } }}>
              {menuItems}
            </ButtonGroup>
          </Toolbar>
        </AppBar>
      </Box>
    </HideOnScroll>
  );
}

export default Header;