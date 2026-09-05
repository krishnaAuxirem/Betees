import { useState } from "react";
import { Download, FileText, Calendar, Filter, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/constants/data";

interface FinancialPeriodReport {
  period: string;
  grossSales: number;
  returnsRefunds: number;
  netSales: number;
  beteesCommission: number;
  gstTax: number;
  finalSettlement: number;
  status: "settled" | "pending";
}

const REPORT_PERIODS: FinancialPeriodReport[] = [
  { period: "August 2026", grossSales: 780000, returnsRefunds: 18500, netSales: 761500, beteesCommission: 76150, gstTax: 38075, finalSettlement: 647275, status: "settled" },
  { period: "July 2026", grossSales: 590000, returnsRefunds: 12000, netSales: 578000, beteesCommission: 57800, gstTax: 28900, finalSettlement: 491300, status: "settled" },
  { period: "June 2026", grossSales: 640000, returnsRefunds: 24500, netSales: 615500, beteesCommission: 61550, gstTax: 30775, finalSettlement: 523175, status: "settled" },
  { period: "May 2026", grossSales: 580000, returnsRefunds: 8900, netSales: 571100, beteesCommission: 57110, gstTax: 28555, finalSettlement: 485435, status: "settled" },
  { period: "April 2026", grossSales: 420000, returnsRefunds: 15000, netSales: 405000, beteesCommission: 40500, gstTax: 20250, finalSettlement: 344250, status: "settled" },
  { period: "September 2026 (MTD)", grossSales: 920000, returnsRefunds: 0, netSales: 920000, beteesCommission: 92000, gstTax: 46000, finalSettlement: 782000, status: "pending" },
];

export const BrandReports = () => {
  const [reports] = useState<FinancialPeriodReport[]>(REPORT_PERIODS);

  const handleDownload = (period: string) => {
    toast.success(`Exported official revenue statement for ${period} (PDF & CSV).`);
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Financial Statements & Tax Reports</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Reconcile monthly gross turnover, returns deductions, Betees commission (10%), GST invoices, and net settlements.
          </p>
        </div>
        <button
          onClick={() => toast.success("Compiling comprehensive annual financial statement...")}
          className="btn-primary self-start text-xs"
        >
          <Download size={14} /> Download Annual Statement
        </button>
      </div>

      {/* Reports Table */}
      <div className="bg-white shadow-editorial overflow-x-auto">
        <div className="p-4 border-b border-outline-variant flex items-center justify-between">
          <h3 className="font-display text-base font-semibold text-charcoal">Monthly Settlement History</h3>
          <span className="text-xs text-on-surface-variant">Tax Year 2026-27</span>
        </div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant">
              <th className="p-4">Settlement Period</th>
              <th className="p-4">Gross Turnover</th>
              <th className="p-4">Returns / Deductions</th>
              <th className="p-4">Betees Fee (10%)</th>
              <th className="p-4">GST Tax</th>
              <th className="p-4">Net Payout</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {reports.map((r) => (
              <tr key={r.period} className="hover:bg-surface-low/30 transition-colors">
                <td className="p-4 font-semibold text-charcoal text-xs">{r.period}</td>
                <td className="p-4 font-display text-charcoal">{formatINR(r.grossSales)}</td>
                <td className="p-4 font-display text-xs text-red-500">-{formatINR(r.returnsRefunds)}</td>
                <td className="p-4 font-display text-xs text-on-surface-variant">-{formatINR(r.beteesCommission)}</td>
                <td className="p-4 font-display text-xs text-on-surface-variant">{formatINR(r.gstTax)}</td>
                <td className="p-4 font-display font-bold text-emerald text-base">{formatINR(r.finalSettlement)}</td>
                <td className="p-4">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide ${
                      r.status === "settled" ? "bg-emerald/10 text-emerald" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDownload(r.period)}
                    className="p-1.5 border border-outline-color hover:border-charcoal text-charcoal inline-flex items-center gap-1 text-xs"
                    title="Download Report"
                  >
                    <Download size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
