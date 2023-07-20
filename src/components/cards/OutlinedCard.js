import React from "react"
import { Card, CardActions, CardContent, CardHeader } from "@mui/material"

function OutlinedCard(props) {
    let {
        title,
        content,
        actions,
        subtitle,
        headaction,
        sxheader,
        sxcontent,
        sxcard
    } = props
    return (
        <Card variant="outlined" sx={sxcard}>
            {title && (
                <CardHeader
                    sx={sxheader}
                    action={headaction}
                    title={title}
                    subheader={subtitle}
                />
            )}

            <CardContent sx={sxcontent}>{content}</CardContent>
            <CardActions>{actions}</CardActions>
        </Card>
    )
}

export default OutlinedCard
