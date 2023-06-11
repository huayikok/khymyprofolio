import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { Autocomplete, Container, TablePagination, TextField } from '@mui/material';
import { useLocaleStore } from '../../store/locale';

import logo from '../../logo.svg';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme, collapse) => ({
    overflowX: 'hidden',
    ...(collapse && {
        marginLeft: '-65px',
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    }),
    ...(!collapse && {
        marginLeft: '0px',
        width: `calc(${theme.spacing(7)} + 1px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    }),
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open, collapse }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(collapse && {
            ...closedMixin(theme, collapse),
            '& .MuiDrawer-paper': closedMixin(theme, collapse),
        }),
        ...(!collapse && {
            ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
                ...closedMixin(theme, collapse),
                '& .MuiDrawer-paper': closedMixin(theme, collapse),
            }),
        }),
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const DrawerFooter = styled('div')(({ theme, open }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'fixed',
    bottom: 0,
    zIndex: 1201,
    background: '#f0efef',
    border: '1px solid #e0e0e0',
    width: 'inherit',
    ...(open && {
        padding: theme.spacing(0, 1),
    }),
    ...(!open && {
        padding: '0px 12px',
    }),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const DrawerFooterDivider = styled(Divider)(({ theme }) => ({
    marginBottom: '63px'
}));

const NavbarFooter = styled('footer')(({ theme, open, collapse }) => ({
    padding: '12px',
    background: 'rgb(240 239 239)',
    borderTop: '1px solid #e0e0e0',
    zIndex: 100,
    position: 'fixed',
    bottom: 0,
    width: '100%',
    maxWidth: '100%',
    minHeight: '0px',
    marginLeft: '-24px',
    display: 'flex',
}));

const Space = styled('div')(({ theme, bottom }) => ({
    marginBottom: bottom,
}));

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [collapse, setCollapse] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleDrawerCollapseShow = () => {
        setCollapse(true);
    };

    const handleDrawerCollapseHide = () => {
        setCollapse(false);
    };

    const localeState = useLocaleStore((state) => state);
    const { currentLocale, localesList, translate, setLocale, setLocaleFormat } = localeState;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" elevation={0}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={collapse ? handleDrawerCollapseHide : handleDrawerCollapseShow}
                        edge="start"
                        sx={{ marginRight: 5 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {translate.navbar.title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} collapse={collapse ? 1 : 0}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0 ? <FontAwesomeIcon icon={faLayerGroup} /> : <MailIcon />}
                                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <DrawerFooterDivider />
                <DrawerFooter open={open} sx={{ minHeight: '49px !important' }}>
                    <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
                        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerFooter>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Box sx={{ width: '100%' }}>
                    <Autocomplete
                        options={Object.keys(localesList)}
                        getOptionLabel={(key) => setLocaleFormat(key)}
                        style={{ width: 300 }}
                        value={currentLocale}
                        disableClearable
                        onChange={(event, newValue) => {
                            // Set locale
                            setLocale({ currentLocale: newValue });
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Locale" fullWidth />
                        )}
                    />
                    <TablePagination
                        count={2000}
                        rowsPerPage={10}
                        page={1}
                        component="div"
                        onPageChange={() => { }}
                    />
                </Box>
                <Typography paragraph>
                    {translate.page.landing.content1}
                </Typography>
                <Space bottom={'30px'} />
                <Typography paragraph>
                    {translate.page.landing.content2}
                </Typography>
                <Space bottom={'50px'} />
                <NavbarFooter>
                    <Container sx={{ marginLeft: '-25px' }}>Copyright © 2023, huayikok. All rights reserved.</Container>
                    <Container sx={{ clear: 'both', display: 'inline-block', whiteSpace: 'nowrap' }}>
                        <span style={{ right: 0, display: 'flex', position: 'fixed' }}>
                            <Typography>Power by</Typography>
                            <img src={logo} alt="Company Logo" width="50" style={{ margin: '-12px 5px -12px 0px' }} />
                        </span>
                    </Container>
                </NavbarFooter>
            </Box>
        </Box >
    );
}