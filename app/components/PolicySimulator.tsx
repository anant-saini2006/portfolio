"use client";

import { Activity } from "lucide-react";
import Link from "next/link";
import { CountUp } from "./CountUp";

interface PolicySimulatorProps {
  isOn: boolean;
  hasToggled: boolean;
  onToggle: () => void;
  flash: boolean;
}

export function PolicySimulator({ isOn, hasToggled, onToggle, flash }: PolicySimulatorProps) {
  return (
    <div className="surface-card border hairline-border p-6 relative group">
      {/* High-trust header */}
      <div className="flex justify-between items-start mb-6 hairline-b pb-4">
        <div className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
          <Activity size={16} strokeWidth={1.5} />
          Policy Simulator
        </div>
        <div className="font-data-md text-data-md text-outline text-xs">ID: AS-SIM-01</div>
      </div>

      {/* Simulator Controls */}
      <div className="mb-6">
        <label className="font-label-sm text-label-sm block mb-3 text-primary">Lending Policy Parameter</label>
        <div className="flex items-center justify-between border hairline-border p-3 bg-white flex-wrap gap-2">
          <span className="font-body-md text-body-md text-on-surface">Include Grade F & G loan originations</span>
          
          {/* Custom Segmented Toggle */}
          <button 
            onClick={onToggle}
            className="flex border hairline-border bg-surface-card cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-95 transition-transform motion-reduce:transform-none"
            aria-pressed={isOn}
          >
            <div className={`px-3 py-1 font-data-md text-xs transition-colors ${isOn ? 'bg-primary text-surface-card' : 'text-on-surface-variant hover:bg-surface-dim'}`}>
              ON
            </div>
            <div className={`px-3 py-1 font-data-md text-xs transition-colors ${!isOn ? 'bg-primary text-surface-card' : 'text-on-surface-variant hover:bg-surface-dim'}`}>
              OFF
            </div>
          </button>
        </div>
      </div>

      {/* Ledger Output */}
      <div className="border hairline-border bg-white flex flex-col">
        {/* Header Row */}
        <div className="flex hairline-b bg-surface-card px-4 py-2 font-label-sm text-label-sm text-on-surface-variant uppercase">
          <div className="w-1/2">Metric</div>
          <div className="w-1/2 text-right">Delta</div>
        </div>
        
        {/* Data Row 1 */}
        <div className="flex hairline-b px-4 py-3 items-center hover:bg-surface-bright transition-colors">
          <div className="w-1/2 font-body-md text-sm text-on-surface">Projected Profit</div>
          <div className="w-1/2 text-right">
            <span className={`font-data-lg text-data-lg font-bold px-2 py-1 transition-colors ${!isOn ? 'text-forest-green' : 'text-on-surface'} ${flash ? 'flash-active' : ''}`}>
              {!hasToggled ? (
                "--"
              ) : !isOn ? (
                <CountUp to={78.1} decimals={1} prefix="+$" suffix="M" />
              ) : (
                "--"
              )}
            </span>
          </div>
        </div>
        
        {/* Data Row 2 */}
        <div className="flex px-4 py-3 items-center hover:bg-surface-bright transition-colors">
          <div className="w-1/2 font-body-md text-sm text-on-surface">Loan Volume</div>
          <div className="w-1/2 text-right font-data-md text-data-md text-on-surface-variant">
            {!hasToggled ? "--" : !isOn ? "−3%" : "--"}
          </div>
        </div>
      </div>

      <p className="mt-4 font-label-sm text-label-sm text-outline tracking-wide text-xs">
        Illustrative demo of my Policy A analysis — <Link href="/projects/bank-loan-portfolio-analytics" className="underline hover:text-primary transition-colors">full case study below</Link>.
      </p>
    </div>
  );
}
