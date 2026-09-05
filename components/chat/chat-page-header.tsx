"use client";

import { ReactNode, useEffect, useState } from "react";

function BatteryIndicator() {
    const [level, setLevel] = useState<number | null>(null);

    useEffect(() => {
        let batteryManager: any = null;

        const updateBattery = () => {
            if (batteryManager) {
                setLevel(Math.round(batteryManager.level * 100));
            }
        };

        if ('getBattery' in navigator) {
            (navigator as any).getBattery().then((battery: any) => {
                batteryManager = battery;
                updateBattery();
                battery.addEventListener('levelchange', updateBattery);
            }).catch(() => {});
        }

        return () => {
            if (batteryManager) {
                batteryManager.removeEventListener('levelchange', updateBattery);
            }
        };
    }, []);

    if (level === null) return null;

    return (
        <div style={{
            position: 'absolute',
            top: '12px',
            right: '48px',
            fontSize: '11px',
            fontWeight: 600,
            color: 'inherit',
            opacity: 0.8,
            zIndex: 10
        }}>
            {level}%
        </div>
    );
}

type ChatPageHeaderProps = {
    title: string;
    left?: ReactNode;
    right?: ReactNode;
    className?: string;
};

export function ChatPageHeader({ title, left, right, className }: ChatPageHeaderProps) {
    const slotPlaceholder = <span aria-hidden style={{ width: 40, height: 40, display: "block" }} />;

    return (
        <header className={`page-header z-10 ${className ?? ""}`.trim()} data-ui="header">
            <div className="page-header-safe-area">
                <BatteryIndicator />
            </div>
            <div className="page-header-content">
                {left ?? slotPlaceholder}
                <span className="page-title">{title}</span>
                <span className="page-header-right">{right ?? slotPlaceholder}</span>
            </div>
        </header>
    );
}
