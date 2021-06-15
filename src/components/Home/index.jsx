
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import HomeIcon from '@material-ui/icons/Home';
import DescriptionIcon from '@material-ui/icons/Description';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { AttachMoney, Navigation } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { auth, db } from '../../firebase';
import { useHistory } from "react-router-dom"



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useHistory();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }

  const handleLogout = () => {
    auth.signOut();
    history.push('/');
  }

  const handleLink = (index) => {
    switch(index) {
        case 0:
            document.location.href = '/home';
            break;
        case 1:
            document.location.href = '/service';
            break;
        case 2:
            document.location.href = '/invoice';
            break;
        case 3:
            document.location.href = '/information';
            break;
        case 4: 
            document.location.href = '/revenue';
            break;
        case 5: 
            document.location.href = '/fee';
            break;
    }
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button key="Home" onClick={() => handleLink(0)}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Trang chủ" />
        </ListItem>
        <ListItem button key="Service" onClick={() => handleLink(1)}>
          <ListItemIcon><MenuIcon /></ListItemIcon>
          <ListItemText primary="Dịch vụ" />
        </ListItem>
        <ListItem button key="Fee" onClick={() => handleLink(5)}>
          <ListItemIcon><MenuIcon /></ListItemIcon>
          <ListItemText primary="Phí phát sinh" />
        </ListItem>
        <ListItem button key="Invoice" onClick={() => handleLink(2)}>
          <ListItemIcon><DescriptionIcon /></ListItemIcon>
          <ListItemText primary="Hoá đơn" />
        </ListItem>
        <ListItem button key="Infor" onClick={() => handleLink(3)}>
          <ListItemIcon><InfoIcon /></ListItemIcon>
          <ListItemText primary="Thông tin" />
        </ListItem>
        <ListItem button key="Revenue" onClick={() => handleLink(4)}>
          <ListItemIcon><AttachMoney /></ListItemIcon>
          <ListItemText primary="Doanh thu" />
        </ListItem>
        <ListItem button key="Logout" onClick={handleLogout}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Đăng xuất" />
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  // const getData = async (uid) => {
  //   console.log(uid);  
  //   await db.collection('store').doc(uid).get().then((doc) => {
  //       const data = doc.data()
  //       console.log(data.name);
  //   })
  // }

  // const authListener = () => {
  //   auth.onAuthStateChanged((user) => {
  //       if (user) {
  //           getData(user.uid)
  //           setUser(user);
  //       } else {
  //           setUser('');
  //       }
  //   });
  // }

  // React.useEffect(() => {
  //   authListener();
  // },[]);
  
  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            dvRescue
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
     
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
