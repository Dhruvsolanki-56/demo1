import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { SkeletonTableRows } from "../Skeleton";
import Pagination from "../Pagination";

/**
 * Shared admin table: server-side pagination + sorting (the API does the
 * real work; this just renders whatever page/order it's given), optional
 * row-selection checkboxes for bulk actions, sortable column headers.
 *
 * `columns` follows TanStack's ColumnDef shape. Pass `enableSorting: false`
 * on a column to make it unsortable (e.g. an Actions column).
 */
export default function DataTable({
  columns,
  data,
  loading,
  total,
  page,
  pageSize,
  onPageChange,
  sortBy,
  sortDir = "asc",
  onSortChange,
  selectable = false,
  selectedIds = [],
  onSelectedIdsChange,
  getRowId = (row) => row.id,
  onRowClick,
  emptyIcon: EmptyIcon,
  emptyMessage = "No results found.",
}) {
  const selectedSet = React.useMemo(() => new Set(selectedIds), [selectedIds]);

  const allColumns = React.useMemo(() => {
    if (!selectable) return columns;
    return [
      {
        id: "__select",
        enableSorting: false,
        header: () => {
          const pageIds = data.map(getRowId);
          const allSelected = pageIds.length > 0 && pageIds.every((id) => selectedSet.has(id));
          return (
            <input
              type="checkbox"
              aria-label="Select all rows on this page"
              checked={allSelected}
              onChange={(e) => {
                if (e.target.checked) {
                  onSelectedIdsChange([...new Set([...selectedIds, ...pageIds])]);
                } else {
                  const pageIdSet = new Set(pageIds);
                  onSelectedIdsChange(selectedIds.filter((id) => !pageIdSet.has(id)));
                }
              }}
            />
          );
        },
        cell: ({ row }) => {
          const id = getRowId(row.original);
          return (
            <input
              type="checkbox"
              aria-label="Select row"
              checked={selectedSet.has(id)}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                if (e.target.checked) onSelectedIdsChange([...selectedIds, id]);
                else onSelectedIdsChange(selectedIds.filter((x) => x !== id));
              }}
            />
          );
        },
        size: 36,
      },
      ...columns,
    ];
  }, [selectable, columns, data, selectedIds, selectedSet, onSelectedIdsChange, getRowId]);

  const table = useReactTable({
    data,
    columns: allColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
  });

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sortable = header.column.columnDef.enableSorting !== false && !!onSortChange;
                  const colId = header.column.columnDef.sortId || header.column.id;
                  const isActive = sortBy === colId;
                  return (
                    <th
                      key={header.id}
                      className={`text-left p-3 font-medium select-none ${header.column.columnDef.align === "right" ? "text-right" : ""}`}
                    >
                      {header.isPlaceholder ? null : sortable ? (
                        <button
                          type="button"
                          onClick={() => onSortChange(colId, isActive && sortDir === "asc" ? "desc" : "asc")}
                          className="inline-flex items-center gap-1 hover:text-primary-700"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {isActive ? (
                            sortDir === "asc" ? <ChevronUp size={13} /> : <ChevronDown size={13} />
                          ) : (
                            <ChevronsUpDown size={13} className="text-slate-300" />
                          )}
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          {/* Only the FIRST load (nothing to show yet) gets the full skeleton
              swap. A refetch triggered by a filter/sort/page change keeps the
              existing rows on screen (subtly dimmed) instead of blanking the
              table to a skeleton and back -- that flash-then-swap on every
              click is what reads as a "blink" rather than a smooth update. */}
          <tbody className={`divide-y divide-slate-100 transition-opacity duration-150 ${loading && data.length > 0 ? "opacity-50 pointer-events-none" : ""}`}>
            {loading && data.length === 0 && <SkeletonTableRows rows={6} cols={allColumns.length} />}
            {!(loading && data.length === 0) &&
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={onRowClick ? "hover:bg-slate-50 cursor-pointer" : "hover:bg-slate-50"}
                  onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={`p-3 ${cell.column.columnDef.align === "right" ? "text-right" : ""}`}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            {!loading && data.length === 0 && (
              <tr>
                <td colSpan={allColumns.length} className="p-10 text-center text-slate-600">
                  {EmptyIcon && <EmptyIcon className="mx-auto text-slate-300 mb-2" size={28} />}
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && <Pagination page={page} pageSize={pageSize} total={total} onChange={onPageChange} />}
    </div>
  );
}
