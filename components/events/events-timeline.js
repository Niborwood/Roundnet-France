import Image from "next/image";
import propTypes from "prop-types";

// MUI IMPORTS
import { Stack, Box, Typography, Collapse, Divider } from "@mui/material";

// MUI ICONS
import EventNoteIcon from "@mui/icons-material/EventNote";

// COMPONENT IMPORTS
import TimelineSingle from "./timeline-single";
import RowCenteredStack from "../ui/row-centered-stack";

export default function EventsTimeline({ events, fullWidth }) {
  // For each event.date in events, extract the year from the date and create a new array with the events that have the same year
  const eventsByYear = events.reduce((acc, event) => {
    const year = event.date.split("-")[0];
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(event);
    return acc;
  }, {});

  const timeline = Object.keys(eventsByYear).map((year) => (
    <Box key={year} sx={{ mb: 6 }}>
      <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 4 }}>
        <EventNoteIcon color="primary" fontSize="large" />
        <Typography variant="h4">
          <strong>{year}</strong>
        </Typography>
      </Stack>

      {eventsByYear[year].map((event) => (
        <Stack direction="column" gap={4} key={event._id}>
          <Collapse in appear>
            <TimelineSingle event={event} />
            <Divider />
          </Collapse>
        </Stack>
      ))}
    </Box>
  ));

  return (
    <Box sx={{ width: { xs: "100%", md: fullWidth ? "100%" : "75%" } }}>
      <Box mb={6}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Tournois &amp; événements à venir
        </Typography>
        <Typography variant="body1" color="initial">
          Retrouvez tous les tournois et compétitions officielles et non
          officielles de roundnet en France.{" "}
        </Typography>
        <RowCenteredStack sx={{ mb: 4, mt: 2, ml: 1 }} colBelow="xs">
          <Box minWidth={50}>
            <Image
              src="/images/logos/roundnet-france-tp.png"
              width={50}
              height={50}
              layout="fixed"
              alt="Roundnet France Official Tournament"
              title="Roundnet France Official Tournament"
            />
          </Box>
          <Typography
            variant="body1"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            Les compétitions officielles de la fédération nationale <br />
            sont en bleu et ornées de notre logo !
          </Typography>
        </RowCenteredStack>
        {/* If no events, display error message. */}
        {events.length ? (
          timeline
        ) : (
          <Typography variant="body1" color="initial" fontWeight="bold">
            Faute ! On dirait qu&apos;aucun événement ne répond à vos critères.
            Essayez peut-être d&apos;autres filtres ?
          </Typography>
        )}
      </Box>
    </Box>
  );
}

EventsTimeline.propTypes = {
  events: propTypes.arrayOf(propTypes.object).isRequired,
  fullWidth: propTypes.bool,
};

EventsTimeline.defaultProps = {
  fullWidth: false,
};
