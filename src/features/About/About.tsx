import { Container } from "@mui/material";
import CountdownText from "./CountdownText";
import { CountdownVideo } from "./CountdownVideo";
import MapView from "./MapView";

function About() {
  return (
    <Container sx={{ pe: 8 }} maxWidth="md">
      <CountdownText />
      <CountdownVideo />
      <MapView/>
    </Container>
  );
}

export default About;
