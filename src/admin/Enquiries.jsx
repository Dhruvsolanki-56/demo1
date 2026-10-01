import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Search, Download, FileSpreadsheet, MessageSquare } from "lucide-react";
import { listContacts, getContactStatuses, getInquiryTypes, exportContacts, updateContactStatus, bulkUpdateContactStatus } from "../api/admin";
import StatusSelect from "../components/StatusSelect";
import AdminPageHeader from "../components/admin/AdminPageHeader";
import FilterBar from "../components/admin/FilterBar";
import DataTable from "../components/admin/DataTable";
import DateRangeFilter from "../components/admin/DateRangeFilter";
import BulkActionBar from "../components/admin/BulkActionBar";
import { useToast } from "../context/ToastContext";
import { formatAdminDate } from "../lib/formatDate";

export default function Enquiries() {
  const navigate = useNavigate();
  const toast = useToast();
  const [result, setResult] = useState({ items: [], total: 0, page: 1, page_size: 20 });
  const [loading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState([]);
  const [inquiryTypes, setInquiryTypes] = useState([]);
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [inquiryType, setInquiryType] = useState(searchParams.get("inquiry_type") || "");
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

  const filters = { status: status || undefined, inquiry_type: inquiryType || undefined, q: q || undefined, date_from: dateFrom || undefined, date_to: dateTo || undefined };
  const activeFilterCount = [status, inquiryType, dateFrom, dateTo].filter(Boolean).length;

  const handleQuickStatusChange = async (contactId, newStatus) => {
    const previous = result.items.find((c) => c.id === contactId)?.status;
    setSavingStatusId(contactId);
    setResult((r) => ({ ...r, items: r.items.map((item) => (item.id === contactId ? { ...item, status: newStatus } : item)) }));
    try {
      await updateContactStatus(contactId, { status: newStatus });
      toast.success("Status updated.");
    } catch {
      setResult((r) => ({ ...r, items: r.items.map((item) => (item.id === contactId ? { ...item, status: previous } : item)) }));
      toast.error("Couldn't update status. Please try again.");
    } finally {
      setSavingStatusId(null);
    }
  };

  useEffect(() => { getContactStatuses().then(setStatuses); getInquiryTypes().then(setInquiryTypes); }, []);
  useEffect(() => {
    setLoading(true);
    listContacts({ ...filters, sort_by: sortBy, sort_dir: sortDir, page, page_size: 20 }).then(setResult).finally(() => setLoading(false));
  }, [status, inquiryType, dateFrom, dateTo, sortBy, sortDir, page]);

  const runSearch = () => {
    setPage(1);
    setLoading(true);
    listContacts({ ...filters, sort_by: sortBy, sort_dir: sortDir, page: 1, page_size: 20 }).then(setResult).finally(() => setLoading(false));
  };

  const clearFilters = () => { setStatus(""); setInquiryType(""); setDateFrom(""); setDateTo(""); setPage(1); };

  const typeLabel = (value) => inquiryTypes.find((t) => t.value === value)?.label || value;

  const handleExport = async (format) => {
    setExporting(true);
    try {
      await exportContacts({ ...filters, format });
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
      const { updated } = await bulkUpdateContactStatus({ ids: selectedIds, status: bulkStatus });
      toast.success(`${updated} inquiry(ies) updated to ${bulkStatus}.`);
      setSelectedIds([]);
      setBulkStatus("");
    } catch {
      toast.error("Couldn't update the selected inquiries.");
    } finally {
      listContacts({ ...filters, sort_by: sortBy, sort_dir: sortDir, page, page_size: 20 }).then(setResult);
    }
  };

  const columns = useMemo(
    () => [
      { id: "name", sortId: "name", header: "Name", cell: ({ row }) => <Link to={`/admin/enquiries/${row.original.id}`} className="font-medium text-primary-700" onClick={(e) => e.stopPropagation()}>{row.original.name}</Link> },
      { id: "email", enableSorting: false, header: "Email", cell: ({ row }) => <span className="text-slate-600">{row.original.email}</span> },
      { id: "type", enableSorting: false, header: "Type", cell: ({ row }) => <span className="text-slate-600">{typeLabel(row.original.inquiry_type)}</span> },
      { id: "product", enableSorting: false, header: "Product", cell: ({ row }) => <span className="text-slate-600">{row.original.product?.name || row.original.product_name_snapshot || "-"}</span> },
      { id: "subject", enableSorting: false, header: "Subject", cell: ({ row }) => <span className="text-slate-600">{row.original.subject || "-"}</span> },
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
    [statuses, savingStatusId, inquiryTypes]
  );

  return (
    <div>
      <AdminPageHeader
        title="Contact Inquiries"
        subtitle={!loading ? `${result.total} inquir${result.total === 1 ? "y" : "ies"}` : undefined}
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
          <label htmlFor="enq-search" className="sr-only">Search enquiries</label>
          <input
            id="enq-search"
            className="input pl-9"
            placeholder="Search by name or email..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSearch()}
          />
        </div>
        <label htmlFor="enq-type" className="sr-only">Filter by inquiry type</label>
        <select id="enq-type" className="input lg:w-56" value={inquiryType} onChange={(e) => { setInquiryType(e.target.value); setPage(1); }}>
          <option value="">All Inquiry Types</option>
          {inquiryTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <label htmlFor="enq-status" className="sr-only">Filter by status</label>
        <select id="enq-status" className="input lg:w-52" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
          <option value="">All Statuses</option>
          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <DateRangeFilter
          idPrefix="enq-date"
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
        onRowClick={(c) => navigate(`/admin/enquiries/${c.id}`)}
        emptyIcon={MessageSquare}
        emptyMessage="No enquiries found."
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
