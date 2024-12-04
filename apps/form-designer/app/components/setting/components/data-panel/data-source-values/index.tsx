import { ChangeEvent, useCallback, useEffect, useState } from "react";
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

import { OptionsProps } from "@/type";

interface DataSourceValuesProps {
  dataSource: OptionsProps;
  onUpdate: any;
}

const DataSourceValues = ({ dataSource, onUpdate }: DataSourceValuesProps) => {
  const [rows, setRows] = useState<any[]>([]);
  const [itemType, setItemType] = useState<"string" | "object">(
    typeof dataSource[0] === "object" ? "object" : "string"
  );

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

  const onUpdateFn = useCallback(
    (itemType: "string" | "object", cards: any[]) => {
      if (itemType === "string") {
        onUpdate(
          "options",
          cards.map((item) => item.value)
        );
      } else {
        onUpdate("options", cards);
      }
    },
    [onUpdate]
  );

  const onAdd = useCallback(() => {
    const newCards = update(rows, {
      $push: [{ id: crypto.randomUUID(), label: "", value: "" }],
    });
    setRows(newCards);
    onUpdateFn(itemType, newCards);
  }, [itemType, onUpdateFn, rows]);

  const onChange = useCallback(
    (index: number, key: "label" | "value", value: string) => {
      if (itemType === "string") {
        const newCards = update(rows, {
          [index]: {
            [`label`]: { $set: value },
            [`value`]: { $set: value },
          },
        });
        setRows(newCards);
        onUpdateFn(itemType, newCards);
      } else {
        const newCards = update(rows, {
          [index]: {
            [key]: { $set: value },
          },
        });
        setRows(newCards);
        onUpdateFn(itemType, newCards);
      }
    },
    [itemType, onUpdateFn, rows]
  );

  const onDelete = useCallback(
    (index: number) => {
      const newCards = update(rows, {
        $splice: [[index, 1]],
      });
      setRows(newCards);
      onUpdateFn(itemType, newCards);
    },
    [itemType, onUpdateFn, rows]
  );

  const renderCard = useCallback(
    (
      card: { id: number; text: string },
      index: number,
      itemType: "string" | "object"
    ) => {
      return (
        <TableRowCard
          key={index}
          index={index}
          id={card.id}
          itemType={itemType}
          row={card}
          moveCard={moveCard}
          onDelete={onDelete}
          onChange={onChange}
        />
      );
    },
    [moveCard, onChange, onDelete]
  );

  const itemTypeOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, value: any) => {
      setItemType(value);
      if (value === "string") {
        const newCards = rows.map((row: any) => {
          return {
            label: row.value,
            value: row.value,
          };
        });
        setRows(newCards);
        onUpdateFn(value, newCards);
      } else {
        onUpdateFn(value, rows);
      }
    },
    [onUpdateFn, rows]
  );

  useEffect(() => {
    const _rows = dataSource?.map((item: any) => {
      if (typeof item === "string") {
        return {
          label: item,
          value: item,
        };
      } else {
        return item;
      }
    });
    setRows(_rows);
  }, [dataSource]);

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
              bgcolor: "#2196f3",
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
