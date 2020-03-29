import React,{useState, useEffect} from 'react';
import firebase from '../../firebase'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Map from './../googleMap'
import GlobalOrder from './../globalOrder'
import PostRequest from './../postRequest'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 0,
    backgroundColor: theme.palette.background.paper,
    height: 50,
    width:840,
    position:`relative`,
    top:150
  },
}));
const useStylesTab = makeStyles(theme => ({
  root: {
    height: 50,
    position:`fixed`,
    top:100,
  },
}));
function Homepage() {
  const classesTabs = useStylesTab();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:3001/get_all_orders');
      setData(result.data);
    };
  
    fetchData();
  }, []);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  

  return (
    <div className='homeContainer'>
      <div className={classes.root}>
        <AppBar className={classesTabs.root} position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Global Orders" {...a11yProps(0)} />
            <Tab label="Near Orders" {...a11yProps(1)} />
            <Tab label="Pending Orders" {...a11yProps(2)} />
            <Tab label="Completed Orders" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} className='tabPanel'>
          <PostRequest/>
          <GlobalOrder data={data}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Three
        </TabPanel>
      </div>
      <div className='map'>
        <Map data={data}/>
      </div>
    </div>
  );
}
export default withRouter(Homepage)