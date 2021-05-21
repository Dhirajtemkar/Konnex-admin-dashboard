import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    margin: theme.spacing(1),
    flex: 0.5,
  },
  margin: {
    margin: theme.spacing(1),
    flex:0.5,
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default function SpringModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.delOpen);

  const handleOpen = () => {
    setOpen(props.delOpen);
  };

  const handleClose = () => {
    // props.handleDeleteModalClose()
    // setOpen(false);
    props.setDelModal(false)
  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={props.delModal}
        onClose={props.delClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.delModal}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title">Delete Issue Entry</h2>
            <p id="spring-modal-description">Are your sure you want to delete issue with id <span style={{fontWeight:"bold", color: "red"}}>{props.delInfo.tId}</span>.</p>
            <div style={{width:"100%", display:"flex", flexDirection:"row",}}>
              <Button 
                variant="contained" 
                // size="small" 
                color="primary" 
                className={classes.margin}
                onClick={props.delClose}
              >
                Cancel
              </Button>
              <div style={{flex:0.5}}/>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={() => {
                  props.handleDbDelete()
                  props.delClose()
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
