import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../components/Link';
import Footer from '../components/Footer';

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box m={4}>
        <Typography variant="h4" component="h1" gutterBottom> Next.js example </Typography>
        <Link href="/about" color="secondary"> Go to the about page </Link>
      </Box>
    </Container>
  );
}