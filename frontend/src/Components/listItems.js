import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import CollectionsIcon from "@mui/icons-material/Collections";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BadgeIcon from "@mui/icons-material/Badge";
import { Link } from "react-router-dom";

let iconColor = { color: "#1976d2" };
export const MainListItems = ({ open }) => {
  return (
    <React.Fragment>
      <Link to="/dashboard" style={{ all: "unset" }}>

      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon sx={iconColor} />
        </ListItemIcon>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "17px",
            mb: 1,
            mt: 1,
            fontFamily:
            "Open Sans,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
          }}
          >
          Dashboard
        </Typography>
      </ListItemButton>
          </Link>

    

        <Link to="/home" style={{ all: "unset" }}>
      <ListItemButton>
        <ListItemIcon>
          <CollectionsIcon sx={iconColor} />
        </ListItemIcon>

        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "17px",
            mb: 1,
            mt: 1,
            fontFamily:
            "Open Sans,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
          }}
          >
          Home
        </Typography>
      </ListItemButton>
          </Link>
      
      
      <Accordion sx={{ all: "unset", mt: 1, mb: 1 }}>
        <AccordionSummary
          sx={{ pb: 1, "&:hover": { backgroundColor: "#f5f5f5" } }}
          expandIcon={open && <ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          {" "}
          <BadgeIcon sx={{ color: "#1976d2", mr: "10px" }} />
          {open && (
            <Typography
              sx={{
                ml: "20px",
                fontWeight: 600,
                fontSize: "17px",
                fontFamily:
                  "Open Sans,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
              }}
            >
              Add Image or Album
            </Typography>
          )}
        </AccordionSummary>
        {open && (
          <AccordionDetails>
            <Link to="/addpost" style={{ all: "unset" }}>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon sx={iconColor} />
                </ListItemIcon>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "15px",
                    fontFamily:
                      "Open Sans,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
                  }}
                >
                  Add Image
                </Typography>
              </ListItemButton>
            </Link>
            <Link to="/addalbum" style={{ all: "unset" }}>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon sx={iconColor} />
                </ListItemIcon>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "15px",
                    fontFamily:
                      "Open Sans,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
                  }}
                >
                  Add Album
                </Typography>
              </ListItemButton>
            </Link>
            <Link to="/createalbum" style={{ all: "unset" }}>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon sx={iconColor} />
                </ListItemIcon>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "15px",
                    fontFamily:
                      "Open Sans,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
                  }}
                >
                  Create Album
                </Typography>
              </ListItemButton>
            </Link>
          </AccordionDetails>
        )}
      </Accordion>
    </React.Fragment>
  );
};