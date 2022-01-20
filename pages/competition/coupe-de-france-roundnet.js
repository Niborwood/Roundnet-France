import { Fragment } from 'react';

// MUI IMPORTS
import { Container, Typography, Divider } from '@mui/material';

// COMPONENTS IMPORTS
import Hero from '../../components/ui/hero';
import PageTitle from '../../components/ui/page-title';
import Head from '../../components/head';
import InfoBlock from '../../components/ui/info-block';
import HeaderWithIcon from '../../components/ui/header-with-icon';

// CONTENT
import { infoCDF } from '../../contents/competition'

function NationalRankingPage() {
  return (
    <Fragment>
      <Head
        title="Coupe de France de roundnet 2022 - Roundnet France"
        description="Les tournois en France sont régulièrement annoncés sur les réseaux sociaux Facebook et Instagram."
      />

      <Hero
        title="Coupe de France"
        image="/images/hero/classement-national.jpg"
        mini
      />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <PageTitle title="Le tournoi immanquable du roundnet français" />
        <Typography align="left" variant="body1" sx={{ my: 2 }}>
          Le tournoi de la Coupe de France de Roundnet est le plus grand tournoi qui se déroule sur le territoire français. Avec 4 dates, des centaines de joueuses et de joueurs parmi le gratin de l&apos;héxagone, c&apos;est l&apos;événement à ne surtout pas manquer de la saison !
        </Typography>
      </Container>

      <Container maxWidth="md" sx={{ my: 8 }}>
        <InfoBlock
          // imageToLeft
          height={450}
          items={infoCDF}
          title="Comment se déroule la Coupe de France de roundnet ?"
          image="/images/pages/competition/coupe-de-france/coupe-de-france-roundnet.jpg"
          description={
            [
              "La coupe de France est le format classique de la compétition : des équipes de 2 joueurs s’affrontent dans les 3 catégories : femmes, hommes, mixtes.",
              "La coupe de France est composée, de :",
            ]
          }
        />
      </Container>

      <Divider />

      <Container maxWidth="md" sx={{ my: 4 }}>
        <HeaderWithIcon
          title="Cette année, la coupe de France servira à la qualification des équipes qui représenteront la France lors des Worlds (septembre 2022 en Belgique)."
          icon="info"
        />
      </Container>

    </Fragment>
  )
}

export default NationalRankingPage
