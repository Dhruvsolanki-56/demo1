import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Plus, Pencil, Trash2, Star, Search, Download, FileSpreadsheet, Package, CheckCircle2, XCircle } from "lucide-react";
import {
  listProductsAdmin, deleteProduct, bulkDeleteProducts, updateProduct, exportProducts,
  getProductFilterOptionsAdmin, getProductConstantsAdmin,
} from "../api/admin";
import { fileUrl } from "../api/client";
import ConfirmDialog from "../components/ConfirmDialog";
import StatusBadge from "../components/StatusBadge";
import AdminPageHeader from "../components/admin/AdminPageHeader";
import FilterBar from "../components/admin/FilterBar";
import DataTable from "../components/admin/DataTable";
import BulkActionBar from "../components/admin/BulkActionBar";
import { useToast } from "../context/ToastContext";

const EMPTY_ITEMS = [];

export default function Products() {
  const toast = useToast();
  const navigate = useNavigate();
  const [result, setResult] = useState({ items: EMPTY_ITEMS, total: 0, page: 1, page_size: 20 });
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState({ dosage_forms: [], therapeutic_segments: [] });
  const [constants, setConstants] = useState({ portfolio_categories: [], product_statuses: [] });
  const [searchParams] = useSearchParams();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [portfolioCategory, setPortfolioCategory] = useState("");
  const [therapeuticSegment, setTherapeuticSegment] = useState("");
  const [productStatus, setProductStatus] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [toDelete, setToDelete] = useState(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [exporting, setExporting] = useState(false);

  const filters = {
    q: q || undefined,
    status: status || undefined,
    portfolio_category: portfolioCategory || undefined,
    therapeutic_segment: therapeuticSegment || undefined,
    product_status: productStatus || undefined,
  };
  const activeFilterCount = [status, portfolioCategory, therapeuticSegment, productStatus].filter(Boolean).length;

  useEffect(() => {
    getProductFilterOptionsAdmin().then(setFilterOptions);
    getProductConstantsAdmin().then(setConstants);
  }, []);

  const load = () => {
    setLoading(true);
    return listProductsAdmin({ ...filters, sort_by: sortBy, sort_dir: sortDir, page, page_size: 20 })
      .then(setResult)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [page, status, portfolioCategory, therapeuticSegment, productStatus, sortBy, sortDir]);

  const clearFilters = () => {
    setStatus(""); setPortfolioCategory(""); setTherapeuticSegment(""); setProductStatus(""); setPage(1);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(toDelete.id);
      toast.success("Product deleted.");
    } catch {
      toast.error("Couldn't delete the product.");
    } finally {
      setToDelete(null);
      load();
    }
  };

  const confirmBulkDelete = async () => {
    try {
      const { deleted } = await bulkDeleteProducts(selectedIds);
      toast.success(`${deleted} product(s) deleted.`);
      setSelectedIds([]);
    } catch {
      toast.error("Couldn't delete the selected products.");
    } finally {
      setBulkDeleteConfirm(false);
      load();
    }
  };

  const handleBulkStatus = async (newStatus) => {
    try {
      await Promise.all(selectedIds.map((id) => updateProduct(id, { status: newStatus })));
      toast.success(`${selectedIds.length} product(s) set to ${newStatus}.`);
      setSelectedIds([]);
    } catch {
      toast.error("Couldn't update some products. Please review and retry.");
    } finally {
      load();
    }
  };

  const handleExport = async (format) => {
    setExporting(true);
    try {
      await exportProducts({ ...filters, format });
      toast.success("Export downloaded.");
    } catch {
      toast.error("Export failed. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        id: "name",
        sortId: "name",
        header: "Product",
        cell: ({ row }) => {
          const p = row.original;
          const img = p.images?.find((i) => i.is_primary) || p.images?.[0];
          return (
            <div className="flex items-center gap-3">
              <img src={img ? fileUrl(img.image_url) : "/product-placeholder.svg"} alt="" className="h-10 w-10 rounded object-cover shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-slate-700 truncate">{p.name}</p>
                <p className="text-xs text-slate-600 truncate">{p.composition}</p>
              </div>
            </div>
          );
        },
      },
      { id: "sku", sortId: "sku", header: "SKU", cell: ({ row }) => <span className="text-slate-600">{row.original.sku || "-"}</span> },
      {
        id: "portfolio",
        enableSorting: false,
        header: "Portfolio / Segment",
        cell: ({ row }) => <span className="text-slate-600">{row.original.portfolio_category || row.original.therapeutic_segment || "-"}</span>,
      },
      { id: "status", sortId: "status", header: "Status", cell: ({ row }) => <StatusBadge status={row.original.status} /> },
      {
        id: "featured",
        sortId: "is_featured",
        header: "Featured",
        cell: ({ row }) => (row.original.is_featured ? <Star size={16} className="text-amber-500 fill-amber-500" aria-label="Featured" /> : null),
      },
      {
        id: "actions",
        enableSorting: false,
        align: "right",
        header: "Actions",
        cell: ({ row }) => (
          <div className="space-x-1" onClick={(e) => e.stopPropagation()}>
            <Link to={`/admin/products/${row.original.id}/edit`} aria-label={`Edit ${row.original.name}`} className="icon-btn inline-flex"><Pencil size={16} /></Link>
            <button onClick={() => setToDelete(row.original)} aria-label={`Delete ${row.original.name}`} className="icon-btn hover:text-red-600"><Trash2 size={16} /></button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <AdminPageHeader
        title="Products"
        subtitle={!loading ? `${result.total} product${result.total === 1 ? "" : "s"} in the catalog` : undefined}
        actions={
          <>
            <button onClick={() => handleExport("csv")} disabled={exporting} className="btn-outline">
              <Download size={16} /> CSV
            </button>
            <button onClick={() => handleExport("xlsx")} disabled={exporting} className="btn-outline">
              <FileSpreadsheet size={16} /> {exporting ? "Exporting..." : "Excel"}
            </button>
            <Link to="/admin/products/new" className="btn-primary"><Plus size={16} /> Add Product</Link>
          </>
        }
      />

      <FilterBar activeCount={activeFilterCount} onClear={clearFilters}>
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
          <label htmlFor="product-search" className="sr-only">Search products</label>
          <input
            id="product-search"
            className="input pl-9"
            placeholder="Search by name, SKU, composition, generic name..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (setPage(1), load())}
          />
        </div>
        <label htmlFor="product-status" className="sr-only">Filter by status</label>
        <select id="product-status" className="input lg:w-40" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <label htmlFor="product-portfolio" className="sr-only">Filter by portfolio category</label>
        <select id="product-portfolio" className="input lg:w-52" value={portfolioCategory} onChange={(e) => { setPortfolioCategory(e.target.value); setPage(1); }}>
          <option value="">All Portfolios</option>
          {constants.portfolio_categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <label htmlFor="product-segment" className="sr-only">Filter by therapeutic segment</label>
        <select id="product-segment" className="input lg:w-52" value={therapeuticSegment} onChange={(e) => { setTherapeuticSegment(e.target.value); setPage(1); }}>
          <option value="">All Therapeutic Segments</option>
          {filterOptions.therapeutic_segments.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <label htmlFor="product-avail" className="sr-only">Filter by availability status</label>
        <select id="product-avail" className="input lg:w-48" value={productStatus} onChange={(e) => { setProductStatus(e.target.value); setPage(1); }}>
          <option value="">All Availability</option>
          {constants.product_statuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
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
        onRowClick={(p) => navigate(`/admin/products/${p.id}/edit`)}
        emptyIcon={Package}
        emptyMessage="No products found."
      />

      <BulkActionBar
        count={selectedIds.length}
        onClear={() => setSelectedIds([])}
        actions={[
          { label: "Activate", icon: CheckCircle2, onClick: () => handleBulkStatus("active") },
          { label: "Deactivate", icon: XCircle, onClick: () => handleBulkStatus("inactive") },
          { label: "Delete", icon: Trash2, variant: "danger", onClick: () => setBulkDeleteConfirm(true) },
        ]}
      />

      <ConfirmDialog
        open={!!toDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${toDelete?.name}"? This cannot be undone.`}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
      />

      <ConfirmDialog
        open={bulkDeleteConfirm}
        title="Delete Selected Products"
        message={`Are you sure you want to delete ${selectedIds.length} product(s)? This cannot be undone.`}
        onCancel={() => setBulkDeleteConfirm(false)}
        onConfirm={confirmBulkDelete}
      />
    </div>
  );
}
