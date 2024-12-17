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

import { FormItemProps, OptionsProps } from "@/type";

interface DataSourceValuesProps {
  data: FormItemProps;
  dataSource: OptionsProps;
  onUpdate: any;
}

const DataSourceValues = ({
  data,
  dataSource,
  onUpdate,
}: DataSourceValuesProps) => {
  const [rows, setRows] = useState<any[]>([]);
  const [itemType, setItemType] = useState<"string" | "object">(
    typeof dataSource[0] === "object" ? "object" : "string"
  );

  const onUpdateFn = useCallback(
    (itemType: "string" | "object", cards: any[]) => {
      if (itemType === "string") {
        onUpdate(
          "options",
          cards.map((item) => item.value)
        );
      } else {
        onUpdate(
          "options",
          cards.map((item: any) => {
            return {
              label: item.label,
              value: item.value,
            };
          })
        );
      }
    },
    [onUpdate]
  );

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newCardFn = (prevCards: any[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as any],
          ],
        });
      const cards = newCardFn(rows);
      setRows(cards);
      onUpdateFn(itemType, cards);
    },
    [itemType, onUpdateFn, rows]
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
          if (data.type === "autocomplete") {
            return {
              label: String(row.label),
              value: String(row.label),
            };
          } else {
            return {
              label: String(row.value),
              value: String(row.value),
            };
          }
        });
        setRows(newCards);
        onUpdateFn(value, newCards);
      } else {
        onUpdateFn(value, rows);
      }
    },
    [data.type, onUpdateFn, rows]
  );

  useEffect(() => {
    const _rows = dataSource?.map((item: any) => {
      if (typeof item === "string") {
        return {
          id: crypto.randomUUID(),
          label: item,
          value: item,
        };
      } else {
        return { id: crypto.randomUUID(), ...item };
      }
    });
    setRows(_rows);
  }, [dataSource]);

  if (
    !["checkbox", "radio", "select", "autocomplete", "switch"].includes(
      data.type
    )
  ) {
    return <></>;
  }

  return (
    <FormControl fullWidth sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>Data Source Values【options】</Box>
        {["checkbox", "radio", "select", "switch"].includes(data.type) && (
          <RadioGroup
            row
            aria-labelledby="item type label"
            name="item type"
            value={itemType}
            onChange={itemTypeOnChange}
          >
            <FormControlLabel
              value="string"
              control={<Radio />}
              label="String"
            />
            <FormControlLabel
              value="object"
              control={<Radio />}
              label="Object"
            />
          </RadioGroup>
        )}
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
              <TableCell width={50}>&nbsp;</TableCell>
              {itemType === "object" && <TableCell>Label</TableCell>}
              <TableCell>Value</TableCell>
              <TableCell width={50} align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => renderCard(row, i, itemType))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 1, mb: 1 }}>
        <Button size="small" variant="contained" onClick={onAdd}>
          Add
        </Button>
      </Box>
    </FormControl>
  );
};

export default DataSourceValues;
