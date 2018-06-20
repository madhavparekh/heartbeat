import { createMuiTheme } from "@material-ui/core/styles";

const Theme = createMuiTheme({
  overrides: {
    MuiTableRow: {
      root: { height: "20px" },
    },
    MuiTableCell: {
      root: { height: "20px" },
    },
  },
});

export default Theme;
