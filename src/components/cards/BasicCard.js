import * as React from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import { useTheme } from "@mui/material/styles"

export default function BasicCard(props) {
	let { content, action, elevation, border, boxShadow, shadow, sxcontent } = props
	const theme = useTheme()
	boxShadow = theme.palette.mode === "dark" ? boxShadow || true : boxShadow
	return (
		<Card
			elevation={elevation || 0}
			sx={{
				border: border ? "1px solid" : "none",
				borderRadius: 2,
				// borderColor: theme.palette.mode === "dark" ? theme.palette.divider : theme.palette.grey.A800,
				boxShadow: boxShadow && (!border || theme.palette.mode === "dark") ? shadow || theme.customShadows.z1 : "inherit",
				":hover": {
					boxShadow: boxShadow ? shadow || theme.customShadows.z1 : "inherit"
				},
				"& pre": {
					m: 0,
					p: "16px !important",
					fontFamily: theme.typography.fontFamily,
					fontSize: "0.75rem"
				}
			}}
		>
			<CardContent sx={sxcontent}>{content}</CardContent>
			{action && <CardActions>{action}</CardActions>}
		</Card>
	)
}
