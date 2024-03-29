import propTypes from "prop-types";
import { Fragment, useState } from "react";
import Image from "next/image";

// MUI IMPORTS
import {
  Stack,
  Tooltip,
  Typography,
  IconButton,
  Avatar,
  Button,
  Link,
} from "@mui/material";

// MUI ICONS
import FileUploadIcon from "@mui/icons-material/FileUpload";

// COMPONENT IMPORTS
import Dialog from "../../../../ui/dialog";

export default function AdminFileField({
  id,
  value,
  image,
  setImage,
  editable,
  handleChange,
  fileType,
  label,
}) {
  // Handle modal state and open/close functions
  const [dialogOpen, setDialogOpen] = useState(false);
  function handleDialogOpen() {
    setDialogOpen(true);
  }
  function handleDialogClose() {
    setDialogOpen(false);
  }
  function handleDialogCancel() {
    setDialogOpen(false);
    handleChange(id, image);
  }

  // Handle HTML validation of file type
  let accept;
  switch (fileType) {
    case "image":
      accept = "image/*";
      break;

    case "pdf":
      accept = "application/pdf";
      break;

    default:
      accept = "*";
      break;
  }

  return (
    <Fragment>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={1}
      >
        {editable && (
          <Tooltip title="Modifier">
            <IconButton
              variant="contained"
              component="label"
              color="primary"
              onClick={handleDialogOpen}
            >
              <FileUploadIcon />
            </IconButton>
          </Tooltip>
        )}
        {/* Image Avatar (conditional) */}
        {fileType === "image" && (
          <Avatar sx={{ width: 60, height: 60 }}>
            <Image
              src={image || "/images/misc/placeholder.jpg"}
              width={60}
              height={60}
              style={{ objectFit: "cover" }}
              alt={label}
              onError={() => setImage("/images/misc/placeholder.jpg")}
            />
          </Avatar>
        )}
        {/* Display download link if image or value is defined */}
        {(image || value) && (
          <Typography sx={{ my: { xs: 0, sm: 1 } }}>
            <Link href={fileType === "image" ? image : value} target="_blank">
              Télécharger le fichier
            </Link>
          </Typography>
        )}
      </Stack>

      {/* Dialog component */}
      <Dialog
        open={dialogOpen}
        title="Uploader"
        handleClose={handleDialogCancel}
        cancelText="Annuler"
        confirmButton={
          <Button variant="contained" onClick={handleDialogClose}>
            Choisir ce fichier
          </Button>
        }
      >
        <Button variant="contained" component="label" color="primary">
          Envoyer un fichier
          <input
            type="file"
            name="file"
            accept={accept}
            hidden
            onChange={(event) => handleChange(id, event.target.files[0])}
          />
        </Button>
        <Typography variant="body2" mt={2} pl={2}>
          {value ? value.name : "Aucun fichier sélectionné"}
        </Typography>
      </Dialog>
    </Fragment>
  );
}

AdminFileField.propTypes = {
  id: propTypes.string.isRequired,
  value: propTypes.any,
  editable: propTypes.bool,
  handleChange: propTypes.func.isRequired,
  fileType: propTypes.string,
};

AdminFileField.defaultProps = {
  value: null,
  editable: false,
};
