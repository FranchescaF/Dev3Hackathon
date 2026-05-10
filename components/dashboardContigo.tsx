"use client"
import Script from "next/script";

export default function DashboardContigo() {
    return(
        <>
            <Script
                src="https://unpkg.com/@elevenlabs/convai-widget-embed"
                strategy="afterInteractive"
            />
            {/* @ts-ignore */}
            <elevenlabs-convai agent-id="agent_7801kr5reh6jevybhhjfny09c10z"></elevenlabs-convai>
        </>
    );
}
