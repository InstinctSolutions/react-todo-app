import React from "react";

import { CssBaseline, Container, Box } from "@material-ui/core";
import Navbar from "../components/appbar/AppBarContainer";
import NavDrawer from "../components/drawers/NavDrawer";
import NoteArea from "../components/bodyarea/NotesArea";

const Main: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <NavDrawer />
      <Container maxWidth={false}>
        <Box mt={8}>
          <NoteArea />
        </Box>
      </Container>
    </>
  );
};

export default Main;
