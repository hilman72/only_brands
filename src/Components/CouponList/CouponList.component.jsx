import React, { useEffect, useState } from "react";
import "./CouponList.style.scss";
import Coupon from "../User-Coupon/Coupon.component";
import ReferalCard from "../ReferalCard/ReferalCard.component";

// tabs from material UI
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { TrendingUpOutlined } from "@material-ui/icons";

import CancelIcon from '@material-ui/icons/Cancel';
import SendIcon from '@material-ui/icons/Send';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';

import { useSelector, useDispatch } from "react-redux";
import { getMyRef } from "../../Redux/Actions/referal_coupon";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabBar:{
    marginTop: '2rem',
  },
}));

//update seperation to  used/unused stage
const CouponList = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [cou, setCou] = useState([]);

  const [first, setFirst] = useState(false);
  const [update, setUpdate] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const needUpdate = () => {
    setUpdate(true);
  };
  const dispatch = useDispatch();
  const my_ref_coupon = useSelector((state) => state.getRefStore);
  const {
    loading: loading,
    sucess: success,
    uploadedObject: description,
  } = my_ref_coupon;

  const x = window.location.href.replaceAll("/", " ").split(" ");
  const render_user = x[x.length - 1];

  const styles = useStyles();

  useEffect(
    () => {
      dispatch(getMyRef(render_user));
      console.log(my_ref_coupon.uploadedObject);
      let x = props.coupon;
      if (x.length > 0) {
        setFirst(true);
      }
      if (first === true) {
        setCou([...x]);
      }
    },
    [first, props.coupon, success],
    update
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" className={styles.tabBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          centered
        >
          <Tab label="Current" icon={<ConfirmationNumberIcon />} {...a11yProps(0)} />
          <Tab label="Used or Expired" icon={<CancelIcon />} {...a11yProps(1)} />
          <Tab label="Referals" icon={<SendIcon />}{...a11yProps(2)} />
          <Tab label="Received Referals" icon={<MoveToInboxIcon />} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid container spacing={3}>
          {cou && cou.length > 0 ? (
            cou.map((data, i) => {
              if (data.used === false && data.expired === false) {
                return (
                  <Grid item xs={12} sm={6}>
                    <Coupon key={i} data={data} passUpdate={needUpdate} />
                  </Grid>
                );
              } else {
                return <div></div>;
              }
            })
          ) : (
            <div>Sorry No Coupon</div>
          )}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={3}>
          {cou && cou.length > 0 ? (
            cou.map((data, i) => {
              if (data.used === true || data.expired === TrendingUpOutlined) {
                return (
                  <Grid item xs={12} sm={6}>
                    <Coupon key={i} data={data} passUpdate={needUpdate} />
                  </Grid>
                );
              } else {
                return <div></div>;
              }
            })
          ) : (
            <div>Sorry No Coupon</div>
          )}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ReferalCard />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ReferalCard />
      </TabPanel>
    </div>
  );
};

export default CouponList;
