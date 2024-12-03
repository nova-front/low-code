import { ChangeEvent, useCallback, useState } from "react";
import update from "immutability-helper";
import {
  Box,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button } from "@/components/mui";

import { TableRowCard } from "./TableRowCard";

const DataSourceValues = () => {
  const [rows, setRows] = useState<any[]>([
    {
      label: "A",
      value: "a",
    },
    {
      label: "B",
      value: "b",
    },
    {
      label: "C",
      value: "c",
    },
  ]);
  const [itemType, setItemType] = useState<"string" | "object">("string");

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setRows((prevCards: any[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as any],
        ],
      })
    );
  }, []);

  const onAdd = useCallback(() => {
    const newCards = update(rows, {
      $push: [{ id: crypto.randomUUID(), label: "", value: "" }],
    });
    setRows(newCards);
  }, [rows]);

  const onDelete = useCallback(
    (index: number) => {
      const newCards = update(rows, {
        $splice: [[index, 1]],
      });
      setRows(newCards);
    },
    [rows]
  );

  const renderCard = useCallback(
    (
      card: { id: number; text: string },
      index: number,
      itemType: "string" | "object"
    ) => {
      return (
        <TableRowCard
          key={card.id}
          index={index}
          id={card.id}
          itemType={itemType}
          row={card}
          moveCard={moveCard}
          onDelete={onDelete}
        />
      );
    },
    [moveCard, onDelete]
  );

  const itemTypeOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, value: any) => {
      setItemType(value);
    },
    []
  );

  return (
    <FormControl fullWidth sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>Data Source Values</Box>
        <RadioGroup
          row
          aria-labelledby="item type label"
          name="item type"
          value={itemType}
          onChange={itemTypeOnChange}
        >
          <FormControlLabel value="string" control={<Radio />} label="String" />
          <FormControlLabel value="object" control={<Radio />} label="Object" />
        </RadioGroup>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 1 }}>
        <Table aria-label="data source values table">
          <TableHead
            sx={{
              bgcolor: "#1976d2",
              "& .MuiTableCell-root": { color: "#fff" },
            }}
          >
            <TableRow>
              {itemType === "object" && <TableCell>Label</TableCell>}
              <TableCell>Value</TableCell>
              <TableCell align="right">&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => renderCard(row, i, itemType))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 1 }}>
        <Button size="small" variant="contained" onClick={onAdd}>
          Add
        </Button>
      </Box>
    </FormControl>
  );
};

export default DataSourceValues;
