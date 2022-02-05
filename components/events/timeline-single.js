import Image from "next/image";
import { getEventFormat, getEventType } from "../../helpers/events";

// MUI IMPORTS
import { Stack, Typography, Box, Paper } from "@mui/material";

// MUI ICONS
import VerifiedIcon from "@mui/icons-material/Verified";

// COMPONENT IMPORTS
import IconWithBackground from "../ui/icon-with-background";
import Link from "../ui/link";

export default function TimelineSingle({ event }) {
  // Get event.description and truncate it to a maximum of 160 characters (without breaking words) and add a "..." at the end
  const truncatedDescription = event.description
    ? event.description.substring(0, 160) + "..."
    : "";

  // Check if event.type is a major french tournament (applies to some event details color)
  const isFrenchMajorEvent =
    event.type === "cdf" ||
    event.type === "ric" ||
    event.type === "worlds" ||
    event.type === "euro";

  return (
    <Stack direction="row" gap={2}>
      {/* LEFT PANEL */}
      <Stack
        direction="column"
        sx={{ width: "15%", pr: 1, borderRight: 0, borderColor: "#315bcd" }}
      >
        <Typography
          variant="h6"
          color={isFrenchMajorEvent ? "primary" : "initial"}
          sx={{ fontWeight: "bold" }}
        >
          {new Date(event.date).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
          })}
        </Typography>
        <Typography
          variant="body2"
          color={isFrenchMajorEvent ? "primary" : "text.disabled"}
          sx={{ fontWeight: "bold" }}
        >
          {getEventType(event.type)} / {getEventFormat(event.format)}
        </Typography>
        <Typography variant="body2" color="text.disabled">
          {event.participants} participants
        </Typography>
      </Stack>

      {/* MAIN PANEL */}
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: "85%" }}
      >
        {/* IMAGE & MAIN DETAILS */}
        <Stack direction="row" gap={2}>
          <Link href="/event/slug">
            <Paper
              sx={{
                position: "relative",
                minWidth: "150px",
                height: "150px",
                maxHeight: "150px",
                borderLeft: "4px solid #315bcd",
              }}
            >
              <Image
                src={event.image || "/images/misc/placeholder.jpg"}
                alt={event.title}
                layout="fill"
                objectFit="cover"
              />
            </Paper>
          </Link>

          {/* TEXT DETAIL */}
          <Box>
            <Typography variant="body2" color="primary">
              {event.city}
            </Typography>
            <Stack direction="row" gap={1} alignItems="center" sx={{ mb: 1 }}>
              <Typography
                variant="h6"
                color="primary"
                sx={{ fontWeight: "bold" }}
              >
                <Link href="/event/slug">{event.title}</Link>
              </Typography>
              {isFrenchMajorEvent && <VerifiedIcon color="primary" />}
            </Stack>
            <Typography variant="body1" color="text.disabled" gutterBottom>
              {truncatedDescription}
            </Typography>
          </Box>
          <Box alignSelf="center">
            <Link href="/event/slug">
              <IconWithBackground icon="arrow_forward" size={25} />
            </Link>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}