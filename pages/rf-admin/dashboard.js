import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

// MUI IMPORTS
import { Paper, Typography, Box, Stack, Divider, Card, CardContent, CardActions, Button, CardActionArea } from '@mui/material';
import Masonry from '@mui/lab/Masonry';

// MUI ICONS
import ModeEditIcon from '@mui/icons-material/ModeEdit';

// COMPONENT IMPORTS
import DashboardWrapper from '../../components/layout/admin/dashboard-wrapper';
import Loader from '../../components/ui/loader';
import IconWithBackground from '../../components/ui/icon-with-background';

// CONTENTS
import { dashboardElements } from '../../contents/admin';

export default function DashboardPage() {
  // Hooks calls
  const router = useRouter();

  // Handle redirect if no session
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      return router.push('/rf-admin');
    }
  })

  // If loading, display loading screen
  if (status === "loading") return <Loader />

  return (
    <DashboardWrapper>
      <Box my={4}>

        {/* Intro Paper */}
        <Paper sx={{ backgroundColor: 'primary.main', py: { xs: 2, sm: 4, md: 8 }, px: { xs: 2, md: 4 } }}>
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" spacing={1}>
            <Typography variant="h2" color="#fff" sx={{ flexGrow: 0.5 }}>
              <strong>Bonjour,</strong>
              <br />
              {session.user.name}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Box textAlign={{ xs: 'initial', md: 'right' }}>
              <Typography variant="h6" color="#fff">
                <strong>Administrateur</strong>
              </Typography>
              <Typography variant="h6" color="#fff">
                {session.user.email}
              </Typography>
            </Box>
          </Stack>
        </Paper>


        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2} sx={{ my: 4 }}>
          {dashboardElements.map(element => (
            <Card key={element._id}>
              <CardActionArea>
                <NextLink href={element.url} passHref>
                  <CardContent sx={{ p: 2 }}>
                    <Stack direction={{ xs: 'column-reverse', sm: 'row' }} justifyContent="space-around" alignItems={{ xs: 'center', sm: 'flex-start' }} spacing={2}>
                      <Box>
                        <Typography gutterBottom variant="h5" component="div">
                          {element.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {element.description}
                        </Typography>
                      </Box>
                      <IconWithBackground color={element.color || 'primary'} icon={element.icon} size={40} />
                    </Stack>
                  </CardContent>
                </NextLink>
              </CardActionArea>
              <Divider />

              <CardActionArea>
                <NextLink href={element.url} passHref>

                  <CardActions sx={{ backgroundColor: `${element.color || 'primary'}.main` }}>
                    <Button color={element.color === 'disabled' ? "primary" : "neutral"} startIcon={<ModeEditIcon />} size="small" fullWidth><strong>
                      Administrer
                    </strong></Button>

                  </CardActions>
                </NextLink>
              </CardActionArea>
            </Card>
          ))}
        </Masonry>

      </Box>
    </DashboardWrapper >
  )
}

export function getStaticProps() {
  return {
    props: {
      adminLayout: true,
    }
  }
}

