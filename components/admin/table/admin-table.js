import propTypes from "prop-types";
import { useState, Fragment } from "react";

// MUI IMPORTS
import {
  Table,
  TableContainer,
  Paper,
  Alert,
  Slide,
  Snackbar,
  Container,
} from "@mui/material";

// COMPONENT IMPORTS
import TableBody from "./table-body.js";
import TableHead from "./table-head.js";

function AdminTable({
  tableConfig: {
    name,
    tableHead,
    tableData,
    endpoint,
    deletable,
    error,
    loading,
  },
}) {
  // State to handle errors & success messages
  const [errorSnackbar, setErrorSnackbar] = useState(null);
  const [successSnackbar, setSuccessSnackbar] = useState(null);
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorSnackbar(null);
    setSuccessSnackbar(null);
  };

  // Return an Alert if there's an error
  if (error)
    return (
      <Container maxWidth="sm">
        <Alert severity="error" variant="filled">
          Une erreur est survenue lors du chargement des données.
        </Alert>
      </Container>
    );

  // Gather the actual keys to display in the table by checking hidden key. Will be used to filter the data in Head and Body.
  const keysToDisplay = tableHead.map((key) => key._id);

  // Gather the editable fields in the table by checking editable key. Will be used to dynamically add editable fields in Body by checking its value type (input for string, clickable icon button for bool...)
  const editableFields = tableHead
    .filter((key) => key.editable)
    .map((key) => key._id);

  // Gather the image fields in the table by checking image key. Will be used to dynamically add image fields in Body.
  const imageFields = tableHead
    .filter((key) => key.image)
    .map((key) => key._id);

  // Gather the file fields in the table by checking file key. Will be used to dynamically add file fields in Body.
  const fileFields = tableHead.filter((key) => key.file).map((key) => key._id);

  // Gather the array fields in the table by checking array key. Will be used to dynamically add array fields in Body.
  const arrayFields = tableHead
    .filter((key) => key.array)
    .map((key) => key._id);
  const arrayValues = tableHead
    .filter((key) => key.array)
    .map((key) => ({
      key: key._id,
      array: key.array,
    }));

  // Gather the date fields in the table by checking date key. Will be used to dynamically add date fields in Body.
  const dateFields = tableHead.filter((key) => key.date).map((key) => key._id);

  // Check if every item of tableData has every keysToDisplay keys in it. If not, add them with a '$empty' value.
  tableData?.forEach((item) => {
    keysToDisplay.forEach((key) => {
      if (!(key in item)) item[key] = "$empty";
    });
  });

  // Create the order of the table by creating an object with values from keysToDisplay, having null values (erased later in TableBody)
  const tableOrder = keysToDisplay.reduce(
    (acc, key) => ({ ...acc, [key]: null }),
    {}
  );

  // If deletable option, add a new '$deletable' element on the tableHead object and on each tableData object.
  if (
    !loading &&
    deletable &&
    !tableHead.find((item) => item._id === "$deletable")
  ) {
    tableHead.push({
      _id: "$deletable",
      name: "Supprimer",
      align: "right",
    });

    tableData.map((item) => {
      item.$deletable = true;
      return item;
    });
  }

  // Used for width of loading skeleton animation
  const nbOfElements = keysToDisplay.length;

  return (
    <Fragment>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <TableContainer component={Paper}>
          <Table aria-label={name}>
            <TableHead tableHead={tableHead} />
            {loading ? (
              <TableBody loading={loading} nbOfElements={nbOfElements} />
            ) : (
              <TableBody
                tableData={tableData}
                keysToDisplay={keysToDisplay}
                endpoint={endpoint}
                editableFields={editableFields}
                fileFields={fileFields}
                imageFields={imageFields}
                dateFields={dateFields}
                arrayFields={arrayFields}
                arrayValues={arrayValues}
                setError={setErrorSnackbar}
                setSuccess={setSuccessSnackbar}
                tableOrder={tableOrder}
              />
            )}
          </Table>
        </TableContainer>
      </Container>

      {/* Snackbar for error display */}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={
          errorSnackbar?.name === "Error" || successSnackbar?.name === "Success"
        }
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        TransitionComponent={Slide}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={
            errorSnackbar?.name.toLowerCase() ||
            successSnackbar?.name.toLowerCase()
          }
          sx={{ width: "100%" }}
        >
          {errorSnackbar && (
            <Fragment>
              <strong>Une erreur est survenue :</strong> <br />
            </Fragment>
          )}
          {errorSnackbar?.message || successSnackbar?.message}
        </Alert>
      </Snackbar>
    </Fragment>
  );
}

AdminTable.propTypes = {
  tableConfig: propTypes.shape({
    name: propTypes.string,
    tableHead: propTypes.arrayOf(
      propTypes.shape({
        _id: propTypes.string.isRequired,
        name: propTypes.string.isRequired,
        align: propTypes.string,
        hidden: propTypes.bool,
      })
    ),
    tableData: propTypes.array,
    endpoint: propTypes.string,
    error: propTypes.bool,
    loading: propTypes.bool,
    deletable: propTypes.bool,
  }).isRequired,
};

AdminTable.defaultProps = {
  name: "Administration table",
  isError: false,
  tableData: [],
  deletable: false,
  keysToDisplay: [],
};

export default AdminTable;
