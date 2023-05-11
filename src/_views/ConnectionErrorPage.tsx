import { Container, Typography } from "@mui/material"

export const ConnectionErrorPage = () => {
    return (
        <Container sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100vh"}}>
            <Typography variant="h2" component="div" sx={{borderBottom: "2px solid #333", p:1, m:1}}>
                Could not connect to server...
            </Typography>
            <Typography variant="h4" component="div" sx={{p:1, m:1}}>
                Application will retry connection in a short moment
            </Typography>
        </Container>
    )
}