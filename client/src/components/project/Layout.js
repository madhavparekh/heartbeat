import React from "react";
import Card from "@material-ui/core/Card";

import DescriptionCard from "./DescriptionCard";
import ResearchCard from "./ResearchCard";
import TechCard from "./TechCard";

const Layout = () => (
  <Card className={styles.card}>
    <DescriptionCard />

    <div style={{ display: "flex" }}>
      {/* <ResearchCard />
      <TechCard /> */}
    </div>
  </Card>
);

const styles = {};

export default Layout;
