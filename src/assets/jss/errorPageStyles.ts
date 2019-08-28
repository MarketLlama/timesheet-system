import { createStyles, Theme } from "@material-ui/core";
import { title, whiteColor } from ".";

const errorPageStyles = (theme: Theme) =>
  createStyles({
    contentCenter: {
      position: "absolute",
      top: "50%",
      left: "50%",
      zIndex: 3,
      transform: "translate(-50%,-50%)",
      textAlign: "center",
      color: whiteColor,
      padding: "0 15px",
      width: "100%",
      maxWidth: "880px",
    },
    title: {
      ...title,
      fontSize: "13.7em",
      color: whiteColor,
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

export { errorPageStyles };
