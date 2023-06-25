import React, {useEffect, useState} from "react";
import "./ModulePage.css";

export default function ModulePage() {


    return (
        <div className="timeline-title">
            <h3 class="timeline-header">Timeline</h3>
            <h6 class="text-subheader-left">TB1</h6>
            <div class="bottom-part-left">
                <div class="line"></div>
                <i class="arrow"></i>
            </div>
            <h6 class="text-subheader-right">TB2</h6>
            <div class="bottom-part-right">
                <div class="line"></div>
                <i class="arrow"></i>
            </div>
        </div>
    );
}