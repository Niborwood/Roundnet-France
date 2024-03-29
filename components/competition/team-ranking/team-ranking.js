import { useState } from "react";
import PropTypes from "prop-types";

// MUI IMPORTS

import {
  Paper,
  Box,
  Stack,
  IconButton,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Typography,
  SvgIcon,
} from "@mui/material";

// MUI ICONS
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPageIcon />
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function TeamRanking({ ranking, title, altColor, headers }) {
  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Avoid a layout jump when reaching the last page with empty ranking.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ranking.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Stack direction="column">
      <Typography variant="h5" color="initial" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="center"
      >
        <TableContainer component={Paper} variant="outlined">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  Rang
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  {headers?.player || "Joueur.euse"}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  Club
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                  align="right"
                >
                  Points
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? ranking?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : ranking
              )?.map((row) => (
                <TableRow
                  key={row.rank}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:nth-of-type(odd)": {
                      background: altColor ? "#fee5ee" : "#c5cef0",
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Box display="flex" alignItems="center" gap={2}>
                      {row.Rang}
                      {row.Baguette ? (
                        <SvgIcon
                          sx={{
                            background: `url(/images/misc/baguette.svg) center left no-repeat`,
                            width: "29px",
                            height: "29px",
                          }}
                        ></SvgIcon>
                      ) : null}
                      {row.Pro ? (
                        <SvgIcon
                          sx={{
                            background: `url(/images/misc/PRO.svg) center left no-repeat`,
                            width: "35px",
                            height: "25px",
                          }}
                        ></SvgIcon>
                      ) : null}
                    </Box>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Box display="flex" alignItems="center" gap={2}>
                      {row.Prénom} {row.Nom}
                      {row["Carton O"] ? (
                        <SvgIcon
                          sx={{
                            background: `url(/images/misc/carton-orange.svg) no-repeat`,
                            width: "19px",
                            height: "29px",
                          }}
                        ></SvgIcon>
                      ) : null}
                      {row["Carton R"] ? (
                        <SvgIcon
                          sx={{
                            background: `url(/images/misc/carton-rouge.svg)  no-repeat`,
                            width: "19px",
                            height: "29px",
                          }}
                        ></SvgIcon>
                      ) : null}
                    </Box>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.Club}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    {Math.round(row.Points * 10) / 10}
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15, { label: "Tous", value: -1 }]}
                  colSpan={4}
                  count={ranking?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "résultats par page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  );
}

export default TeamRanking;
