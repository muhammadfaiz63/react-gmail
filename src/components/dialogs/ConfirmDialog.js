import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"

export default function AlertDialog(props) {
    let { open, onClose, title, content, actions } = props

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {title && <DialogTitle>{title}</DialogTitle>}

            <DialogContent>{content}</DialogContent>
            <DialogActions>{actions}</DialogActions>
        </Dialog>
    )
}
