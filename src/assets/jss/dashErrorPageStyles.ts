import { createStyles, Theme } from "@material-ui/core";
import { primaryColor, title } from ".";

const dashErrorPageStyles = (theme: Theme) =>
  createStyles({
    contentCenter: {
      position: "absolute",
      top: "50%",
      left: "50%",
      zIndex: 3,
      transform: "translate(-50%,-50%)",
      textAlign: "center",
      color: primaryColor[0],
      padding: "0 15px",
      width: "100%",
      maxWidth: "880px",
    },
    title: {
      ...title,
      fontSize: "13.7em",
      color: primaryColor[0],
      letterSpacing: "14px",
      fontWeight: 700,
    },
    subTitle: {
      fontSize: "2.25rem",
      marginTop: "0",
      marginBottom: "8px",
    },
    description: {
      fontSize: "1.125rem",
      marginTop: "0",
      marginBottom: "8px",
    },
  });

export { dashErrorPageStyles };
