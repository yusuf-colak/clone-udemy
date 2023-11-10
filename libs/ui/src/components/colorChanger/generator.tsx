'use client'

import React, { useEffect, useState } from "react";

interface ColorGeneratorProps {
    color: string;
    defaultBase?: string;
    defaultForeground?: string;
}

export default function ColorGenerator({color, defaultBase = "#0B0C1E", defaultForeground = "#D2CFFB"}: ColorGeneratorProps) {
    const [baseColor, setBaseColor] = useState(defaultBase);
    const [foregroundColor, setForegroundColor] = useState(defaultForeground);
    const classes = `bg-${color} text-${color}-foreground`

    useEffect(() => {
        const hsl = hexToHsl(baseColor);
        document.documentElement.style.setProperty('--' + color, hsl[0] + ', ' + hsl[1] + '%, ' + hsl[2] + '%' + ', 1');

        // Calculate YIQ luminance from RGB values
        const r = parseInt(baseColor.slice(1, 3), 16);
        const g = parseInt(baseColor.slice(3, 5), 16);
        const b = parseInt(baseColor.slice(5, 7), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

        // Determine the foreground color based on the YIQ luminance
        const foregroundColor = yiq >= 128 ? '#0B0C1E' : '#f8fafc'; // Set your light and dark foreground colors here
        setForegroundColor(foregroundColor);
    }, [baseColor]);

    useEffect(() => {
        const hsl = hexToHsl(foregroundColor);
        document.documentElement.style.setProperty('--' + color + '-foreground', hsl[0] + ', ' + hsl[1] + '%, ' + hsl[2] + '%' + ', 1');
    }, [foregroundColor]);

    const handleColorChange = (event: any) => {
        const newColor = event.target.value;
        setBaseColor(newColor);
    };

    function hexToHsl(hex: string) {
        // Remove the '#' symbol if it's present
        hex = hex.replace(/^#/, '');

        // Parse the hexadecimal color code into RGB values
        const r = parseInt(hex.slice(0, 2), 16) / 255;
        const g = parseInt(hex.slice(2, 4), 16) / 255;
        const b = parseInt(hex.slice(4, 6), 16) / 255;

        // Calculate HSL values
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }

            h! /= 6;
        }

        // Convert HSL values to degrees and percentages
        return [h! * 360, s * 100, l * 100];
    }

    return (
        <div>
            <label htmlFor="baseColor">Enter new {color} color:</label>
            <input
                type="color"
                id="baseColor"
                value={baseColor}
                onChange={handleColorChange}
            />

            <p className={classes}>
                This text color changes based on {color} color brightness.
            </p>
        </div>
    );
}
