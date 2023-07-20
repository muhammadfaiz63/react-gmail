import React from "react"
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, ListItemButton } from "@mui/material"

function ListItemComponent(props) {
	let { avatar, secondary, primary, maxWidth, onClick, sx } = props
	return (
		<>
			<ListItem
				alignItems="flex-start"
				sx={sx}
			>
				<ListItemButton onClick={onClick}>
					{avatar && (
						<ListItemAvatar>
							<Avatar
								alt="Remy Sharp"
								src="/static/images/avatar/1.jpg"
							/>
						</ListItemAvatar>
					)}

					<ListItemText
						primaryTypographyProps={{ fontSize: "12px" }}
						primary={primary}
						secondary={secondary}
					/>
				</ListItemButton>
			</ListItem>
			<Divider
				// variant="inset"
				component="li"
			/>
		</>
	)
}

export default ListItemComponent
