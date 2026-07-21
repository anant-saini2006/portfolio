"use client";

import { useState } from "react";
import { PolicySimulator } from "./PolicySimulator";
import { motion } from "framer-motion";
import { CountUp } from "./CountUp";

interface HeroProps {
  tagline: string;
}

export function Hero({ tagline }: HeroProps) {
  const [isOn, setIsOn] = useState(true);
  const [hasToggled, setHasToggled] = useState(false);
  const [flash, setFlash] = useState(false);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (!hasToggled) setHasToggled(true);
    
    if (!newState) {
      setFlash(true);
      setTimeout(() => setFlash(false), 800);
    }
  };

  // Sparkline paths
  const baselinePath = "M0,90 Q50,95 100,85 T200,80 T300,85 T400,75";
  const policyAPath = "M0,90 Q50,95 100,60 T200,40 T300,50 T400,10";

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-px lg:bg-hairline max-w-7xl mx-auto w-full mb-12">
      {/* Left Column: Intro */}
      <div className="lg:col-span-7 bg-background lg:pr-8 flex flex-col justify-center gap-6">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-primary mb-2">Anant Saini</h1>
          <div className="flex items-center gap-3 font-data-md text-data-md text-on-surface-variant uppercase tracking-widest flex-wrap">
            <span>Data Analyst</span>
            <span className="text-hairline">|</span>
            <span>Business Analyst</span>
          </div>
        </div>
        
        <div>
          <p className="font-body-lg text-body-lg text-on-surface max-w-2xl mb-4">
            {tagline}
          </p>
          
          {/* Reframed Headline Stat */}
          <div className="border hairline-border surface-card p-4 inline-flex flex-col gap-3 min-w-[280px]">
            <div className="flex justify-between gap-8 font-body-md text-sm text-on-surface-variant items-center">
              <span>Baseline profit:</span>
              <span className="font-data-md">--</span>
            </div>
            <div className="flex justify-between gap-8 font-body-md text-sm text-on-surface-variant items-center">
              <span>With Policy A:</span>
              <span className={`font-data-lg font-bold transition-colors ${!isOn ? 'text-forest-green' : 'text-primary'} ${flash ? 'flash-active px-1' : ''}`}>
                {!hasToggled ? (
                  "--"
                ) : !isOn ? (
                  <CountUp to={78.1} decimals={1} prefix="+$" suffix="M" duration={0.8} />
                ) : (
                  "--"
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Abstract Chart Graphic */}
        <div className="mt-4 h-24 w-full max-w-md relative border-l border-b hairline-border">
          <svg className="absolute bottom-0 left-0" height="100%" preserveAspectRatio="none" viewBox="0 0 400 100" width="100%">
            {/* Grid lines */}
            <line stroke="#CFCFC2" strokeDasharray="2 2" strokeWidth="0.5" x1="0" x2="400" y1="25" y2="25"></line>
            <line stroke="#CFCFC2" strokeDasharray="2 2" strokeWidth="0.5" x1="0" x2="400" y1="50" y2="50"></line>
            <line stroke="#CFCFC2" strokeDasharray="2 2" strokeWidth="0.5" x1="0" x2="400" y1="75" y2="75"></line>
            {/* Animated Line */}
            <motion.path 
              d={!hasToggled ? baselinePath : (!isOn ? policyAPath : baselinePath)}
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: 1, 
                d: !hasToggled ? baselinePath : (!isOn ? policyAPath : baselinePath)
              }}
              transition={{ 
                pathLength: { duration: 1.5, ease: "easeOut", delay: 0.2 },
                d: { duration: 0.8, ease: "easeOut" }
              }}
              fill="none" 
              stroke="#1F5C3E" 
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {/* Right Column: Policy Simulator */}
      <div className="lg:col-span-5 bg-background lg:pl-8 flex flex-col justify-center">
        <PolicySimulator 
          isOn={isOn} 
          hasToggled={hasToggled} 
          onToggle={handleToggle} 
          flash={flash} 
        />
      </div>
    </section>
  );
}
