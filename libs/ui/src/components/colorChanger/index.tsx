import React, { useEffect, useState } from "react";
import ColorGenerator from "@/libs/ui/components/colorChanger/generator";

export default function ColorChanger() {

    return (
        <div className="space-y-8">
            <ColorGenerator color="primary" />
            <ColorGenerator color="secondary" defaultBase="#C8C7F2" defaultForeground="#0B0C1E" />
            <ColorGenerator color="accent" defaultBase="#C8C7F2" defaultForeground="#0B0C1E" />
        </div>
    );
}
