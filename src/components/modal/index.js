import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const Modal = ({ open, handleModal }) => {
  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog open={open} onClose={() => handleModal(false)} scroll={"paper"}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join("\n")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleModal(false)}>Cancel</Button>
          <Button onClick={() => handleModal(false)}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
