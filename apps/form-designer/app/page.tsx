"use client";

import { useState } from "react";
import { Button } from "@repo/mui/button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import styles from "./page.module.css";

export default function Home() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className={styles.page}>
      <section className={styles.field_box}>
        <header className={styles.title}>Components</header>
        <Accordion
          expanded={expanded === "basic"}
          onChange={handleChange("basic")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="basic-content"
            id="basic-header"
          >
            Basic
          </AccordionSummary>
          <AccordionDetails>
            <Button variant="outlined" size="small">
              Text Field
            </Button>
            <Button variant="outlined" size="small" disabled>
              Text Area
            </Button>
            <Button variant="outlined" size="small" disabled>
              Checkbox
            </Button>
            <Button variant="outlined" size="small" disabled>
              Radio
            </Button>
            <Button variant="outlined" size="small" disabled>
              Switch
            </Button>
            <Button variant="outlined" size="small" disabled>
              Select
            </Button>
            <Button variant="outlined" size="small" disabled>
              Autocomplete
            </Button>
            <Button variant="outlined" size="small">
              Button
            </Button>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "advanced"}
          onChange={handleChange("advanced")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="advanced-content"
            id="advanced-header"
          >
            Advanced
          </AccordionSummary>
          <AccordionDetails>
            <Button variant="outlined" size="small" disabled>
              More
            </Button>
          </AccordionDetails>
        </Accordion>
      </section>
      <main className={styles.mian_box}>
        <header className={styles.title}>You can build a form</header>
        <section className="container">
          <p className={styles.tip}>Drag here</p>
        </section>
      </main>
      <main className={styles.json_box}>
        <header className={styles.title}>
          JSON Schema
          <Button variant="text">Copy Data</Button>
        </header>
        <pre className="container">{`{"components": []}`}</pre>
      </main>
    </div>
  );
}
