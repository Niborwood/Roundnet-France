import Image from "next/image";
import NextLink from "next/link";

// MUI IMPORTS
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";

// MUI ICONS
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// COMPONENT IMPORTS
import AdminCardsLoader from "./admin-cards-loader";
import Error from "../../../components/ui/error";

export default function AdminContent({ config }) {
  const { data, listProps, endpoint, isLoading, isError } = config;

  if (isLoading) return <AdminCardsLoader />;
  if (isError) return <Error />;

  return (
    <Grid spacing={2} container>
      {data.map((item) => {
        // Get the card title, subtitle and description from data and listProps
        const cardTitle = item[listProps.title];
        const cardSubtitle =
          item[listProps.subtitle]?.length > 60
            ? item[listProps.subtitle].substring(0, 120) + "..."
            : item[listProps.subtitle];
        const cardImage = item[listProps.image];
        const cardLink = `/rf-admin/edit/${endpoint}/${item._id}`;

        return (
          <Grid key={item._id} item xs={12} md={6} lg={4}>
            <Card sx={{ height: "100%" }}>
              <Stack
                direction="column"
                justifyContent="space-between"
                sx={{ height: "100%" }}
              >
                {/* Header */}
                <CardHeader
                  title={cardTitle}
                  avatar={
                    <Image
                      src={cardImage || "/images/misc/placeholder.jpg"}
                      alt={cardTitle}
                      title={cardTitle}
                      height="60px"
                      width="60px"
                      objectFit="cover"
                    />
                  }
                  titleTypographyProps={{ variant: "h5" }}
                />
                <Divider />
                {/* Content */}
                <CardContent sx={{ flexGrow: 1, display: "flex" }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography color="text.secondary">
                      {cardSubtitle}
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <NextLink href={cardLink} passHref>
                      <Tooltip title="Modifier">
                        <IconButton color="secondary">
                          <ArrowForwardIcon />
                        </IconButton>
                      </Tooltip>
                    </NextLink>
                  </Stack>
                </CardContent>
              </Stack>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
