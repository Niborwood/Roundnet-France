import Slider from "react-slick";
import Image from "next/image";

// MUI IMPORTS
import { Container, Box, Typography, Stack } from "@mui/material";

// COMPONENT IMPORTS
import Link from "../ui/link";

function LogoCarousel({ title, logos }) {
  if (!logos) return null;

  const logosSlider = logos.map((logo) => {
    // Generating the image
    const image = (
      <Image
        src={logo.src}
        alt={logo.alt}
        width={150}
        height={150}
        title={logo.alt}
        style={{ objectFit: "cover" }}
      />
    );

    // Return with link condition
    return (
      <Box key={logo.alt} sx={{ textAlign: "center", position: "relative" }}>
        {logo.link ? <Link href={logo.link}>{image}</Link> : image}
      </Box>
    );
  });

  const numberOfLogos = logos.length;
  const logosOnMultipleSlides = numberOfLogos > 5;

  // RETURN
  return (
    <Container
      maxWidth="md"
      sx={{
        mb: 6,
      }}
    >
      <Stack mb={2} sx={{ textAlign: "center" }}>
        <Typography align="center" variant="h4" component="h2">
          {title}
        </Typography>
      </Stack>
      <Slider
        dots
        arrows={logosOnMultipleSlides}
        autoplay
        infinite={true}
        speed={800}
        slidesToShow={logosOnMultipleSlides ? 5 : numberOfLogos}
      >
        {logosSlider}
      </Slider>
    </Container>
  );
}

export default LogoCarousel;
