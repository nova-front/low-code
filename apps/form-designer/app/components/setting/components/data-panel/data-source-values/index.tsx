import { useCallback, useState } from "react";
import update from "immutability-helper";
import {
  Box,
  FormControl,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button } from "@/components/mui";

import { TableRowCard } from "./TableRowCard";

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

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

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setRows((prevCards: Item[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Item],
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
    (card: { id: number; text: string }, index: number) => {
      return (
        <TableRowCard
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          row={card}
          moveCard={moveCard}
          onDelete={onDelete}
        />
      );
    },
    [moveCard, onDelete]
  );

  return (
    <FormControl fullWidth sx={{ mt: 2 }}>
      <div>Data Source Values 【string or array】</div>
      <TableContainer component={Paper} sx={{ mt: 1 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Label</TableCell>
              <TableCell>Value</TableCell>
              <TableCell align="right">&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows.map((row, i) => renderCard(row, i))}</TableBody>
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
