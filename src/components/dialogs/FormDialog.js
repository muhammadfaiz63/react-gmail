import * as React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

export default function FormDialog({ title, content, actions, open, onClose, maxWidth, minWidth, fullWidth }) {
	return (
		<Dialog
			scroll="body"
			open={open}
			onClose={onClose}
			maxWidth={maxWidth ? maxWidth : false}
			minWidth={minWidth ? minWidth : false}
			fullWidth={fullWidth}
		>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>{content}</DialogContent>
			<DialogActions>{actions}</DialogActions>
		</Dialog>
	)
}
