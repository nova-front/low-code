import { useState } from "react";
import { Button } from "@repo/mui/button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FieldBox from "./Box";
import { basicComponents, advancedComponents } from "./config";

import type { FC } from "react";
import globalStyle from "../../page.module.css";
import styles from "./styles.module.css";

export interface ContainerProps {
  onAdd: any;
}

const Container: FC<ContainerProps> = ({ onAdd }) => {
  const [expanded, setExpanded] = useState<string | false>("basic");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <section className={styles.field_box}>
      <header className={globalStyle.title}>Components</header>
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
          {basicComponents?.map((item: any) => {
            return (
              <FieldBox key={item.name} name={item.name} onAdd={onAdd}>
                <Button
                  variant="outlined"
                  size="small"
                  disabled={item.disabled}
                >
                  {item.name}
                </Button>
              </FieldBox>
            );
          })}
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
          {advancedComponents?.map((item: any) => {
            return (
              <FieldBox key={item.name} name={item.name} onAdd={onAdd}>
                <Button
                  variant="outlined"
                  size="small"
                  disabled={item.disabled}
                >
                  {item.name}
                </Button>
              </FieldBox>
            );
          })}
        </AccordionDetails>
      </Accordion>
    </section>
  );
};

export default Container;
