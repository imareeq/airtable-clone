import type { Row } from "@tanstack/react-table";
import { ColumnType } from "generated/prisma";
import { useState, useEffect } from "react";
import type { ActiveCell } from "~/app/(authenticated)/[baseId]/[tableId]/[viewId]/page";
import { isValidNumberInput } from "~/lib/cell-utils";

export function useEditingCell<TData extends { id: string }>(
  activeCell: ActiveCell | null,
  rows: Row<TData>[],
  virtualStartIndex: number,
) {
  const [editingValue, setEditingValue] = useState<string>(
    activeCell?.initialValue ?? "",
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (activeCell?.mode === "editing") {
      const cell =
        rows[activeCell.rowIndex - virtualStartIndex]?.getVisibleCells()[
          activeCell.colIndex
        ];
      if (cell) {
        const columnType = (cell.column.columnDef.meta as { type: ColumnType })
          ?.type;
        const currentVal = String(cell.getValue() ?? "");

        if (activeCell.initialValue !== undefined) {
          if (
            columnType === ColumnType.NUMBER &&
            !isValidNumberInput(activeCell.initialValue)
          ) {
            setEditingValue(currentVal);
            setValidationError("please enter a number");
          } else {
            setEditingValue(activeCell.initialValue);
            setValidationError(null);
          }
        } else {
          setEditingValue(currentVal);
          setValidationError(null);
        }
      }
    } else {
      setEditingValue("");
      setValidationError(null);
    }
  }, [activeCell, rows]);

  return { editingValue, setEditingValue, validationError, setValidationError };
}
