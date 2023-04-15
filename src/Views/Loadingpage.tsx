import { CircularProgress, Container, LinearProgress, Typography } from "@mui/material"

export const LoadingPage = () => {
    return (
        <Container sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100vh"}}>
            <Typography variant="h6" component="div" sx={{p:2}}>Loading data, please wait...</Typography>
            <LinearProgress sx={{p:1, width: "50vw"}} color="secondary"/>
        </Container>
    )
}