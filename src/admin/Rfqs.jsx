import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Search, Download, FileSpreadsheet, FileText } from "lucide-react";
import { listRfqs, getRfqStatuses, exportRfqs, updateRfqStatus, bulkUpdateRfqStatus } from "../api/admin";
import StatusSelect from "../components/StatusSelect";
import AdminPageHeader from "../components/admin/AdminPageHeader";
import FilterBar from "../components/admin/FilterBar";
import DataTable from "../components/admin/DataTable";
import DateRangeFilter from "../components/admin/DateRangeFilter";
import BulkActionBar from "../components/admin/BulkActionBar";
import { useToast } from "../context/ToastContext";
import { formatAdminDate } from "../lib/formatDate";

export default function Rfqs() {
  const navigate = useNavigate();
  const toast = useToast();
  const [result, setResult] = useState({ items: [], total: 0, page: 1, page_size: 20 });
  const [loading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState([]);
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [q, setQ] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const [exporting, setExporting] = useState(false);
  const [savingStatusId, setSavingStatusId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkStatus, setBulkStatus] = useState("");

  const filters = { status: status || undefined, q: q || undefined, date_from: dateFrom || undefined, date_to: dateTo || undefined };
  const activeFilterCount = [status, dateFrom, dateTo].filter(Boolean).length;

  const handleQuickStatusChange = async (rfqId, newStatus) => {
    const previous = result.items.find((r) => r.id === rfqId)?.status;
    setSavingStatusId(rfqId);
    setResult((r) => ({ ...r, items: r.items.map((item) => (item.id === rfqId ? { ...item, status: newStatus } : item)) }));
    try {
      await updateRfqStatus(rfqId, { status: newStatus });
      toast.success("Status updated.");
    } catch {
      setResult((r) => ({ ...r, items: r.items.map((item) => (item.id === rfqId ? { ...item, status: previous } : item)) }));
      toast.error("Couldn't update status. Please try again.");
    } finally {
      setSavingStatusId(null);
    }
  };

  useEffect(() => { getRfqStatuses().then(setStatuses); }, []);
  useEffect(() => {
    setLoading(true);
    listRfqs({ ...filters, sort_by: sortBy, sort_dir: sortDir, page, page_size: 20 }).then(setResult).finally(() => setLoading(false));
  }, [status, dateFrom, dateTo, sortBy, sortDir, page]);

  const runSearch = () => {
    setPage(1);
    setLoading(true);
    listRfqs({ ...filters, sort_by: sortBy, sort_dir: sortDir, page: 1, page_size: 20 }).then(setResult).finally(() => setLoading(false));
  };

  const clearFilters = () => { setStatus(""); setDateFrom(""); setDateTo(""); setPage(1); };

  const handleExport = async (format) => {
    setExporting(true);
    try {
      await exportRfqs({ ...filters, format });
      toast.success("Export downloaded.");
    } catch {
      toast.error("Export failed. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const handleBulkStatus = async () => {
    if (!bulkStatus) return;
    try {
      const { updated } = await bulkUpdateRfqStatus({ ids: selectedIds, status: bulkStatus });
      toast.success(`${updated} RFQ(s) updated to ${bulkStatus}.`);
      setSelectedIds([]);
      setBulkStatus("");
    } catch {
      toast.error("Couldn't update the selected RFQs.");
    } finally {
      listRfqs({ ...filters, sort_by: sortBy, sort_dir: sortDir, page, page_size: 20 }).then(setResult);
    }
  };

  const columns = useMemo(
    () => [
      { id: "reference_number", sortId: "reference_number", header: "Reference", cell: ({ row }) => <Link to={`/admin/rfqs/${row.original.id}`} className="font-medium text-primary-700" onClick={(e) => e.stopPropagation()}>{row.original.reference_number}</Link> },
      { id: "name", sortId: "name", header: "Customer", cell: ({ row }) => <span className="text-slate-700">{row.original.name}{row.original.company ? ` (${row.original.company})` : ""}</span> },
      { id: "contact", enableSorting: false, header: "Email / Phone", cell: ({ row }) => <span className="text-slate-600">{row.original.email}<br />{row.original.phone}</span> },
      {
        id: "products",
        enableSorting: false,
        header: "Product(s)",
        cell: ({ row }) => (
          <span className="text-slate-600 max-w-xs truncate block" title={row.original.items.map((i) => i.product_name_snapshot).join(", ")}>
            {row.original.items.length === 1 ? row.original.items[0].product_name_snapshot : `${row.original.items.length} products`}
          </span>
        ),
      },
      {
        id: "status",
        sortId: "status",
        header: "Status",
        cell: ({ row }) => (
          <div onClick={(e) => e.stopPropagation()}>
            <StatusSelect
              value={row.original.status}
              options={statuses}
              disabled={savingStatusId === row.original.id}
              onChange={(newStatus) => handleQuickStatusChange(row.original.id, newStatus)}
            />
          </div>
        ),
      },
      { id: "created_at", sortId: "created_at", header: "Date", cell: ({ row }) => <span className="text-slate-600">{formatAdminDate(row.original.created_at)}</span> },
    ],
    [statuses, savingStatusId]
  );

  return (
    <div>
      <AdminPageHeader
        title="Quote Requests (RFQs)"
        subtitle={!loading ? `${result.total} request${result.total === 1 ? "" : "s"}` : undefined}
        actions={
          <>
            <button onClick={() => handleExport("csv")} disabled={exporting} className="btn-outline">
              <Download size={16} /> CSV
            </button>
            <button onClick={() => handleExport("xlsx")} disabled={exporting} className="btn-outline">
              <FileSpreadsheet size={16} /> {exporting ? "Exporting..." : "Excel"}
            </button>
          </>
        }
      />

      <FilterBar activeCount={activeFilterCount} onClear={clearFilters}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
          <label htmlFor="rfq-search" className="sr-only">Search RFQs</label>
          <input
            id="rfq-search"
            className="input pl-9"
            placeholder="Search by name, email or reference..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSearch()}
          />
        </div>
        <label htmlFor="rfq-status" className="sr-only">Filter by status</label>
        <select id="rfq-status" className="input lg:w-52" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
          <option value="">All Statuses</option>
          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <DateRangeFilter
          idPrefix="rfq-date"
          from={dateFrom}
          to={dateTo}
          onFromChange={(v) => { setDateFrom(v); setPage(1); }}
          onToChange={(v) => { setDateTo(v); setPage(1); }}
        />
      </FilterBar>

      <DataTable
        columns={columns}
        data={result.items}
        loading={loading}
        total={result.total}
        page={result.page}
        pageSize={result.page_size}
        onPageChange={setPage}
        sortBy={sortBy}
        sortDir={sortDir}
        onSortChange={(col, dir) => { setSortBy(col); setSortDir(dir); setPage(1); }}
        selectable
        selectedIds={selectedIds}
        onSelectedIdsChange={setSelectedIds}
        onRowClick={(rfq) => navigate(`/admin/rfqs/${rfq.id}`)}
        emptyIcon={FileText}
        emptyMessage="No RFQs found."
      />

      <BulkActionBar count={selectedIds.length} onClear={() => setSelectedIds([])}>
        <select className="input !w-auto" value={bulkStatus} onChange={(e) => setBulkStatus(e.target.value)}>
          <option value="">Set status to...</option>
          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={handleBulkStatus} disabled={!bulkStatus} className="btn-primary btn-sm">Apply</button>
      </BulkActionBar>
    </div>
  );
}
