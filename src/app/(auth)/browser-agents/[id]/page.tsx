import BrowserStream from "@/components/sections/browser-stream";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";

export default async function BrowserAgentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const b = await api.browserAgent.get({ id: Number(id) });

    if (!b) {
        return <div>Browser agent not found</div>
    }

    return (
        <div>
            <BrowserStream browserAgent={b} />
        </div>
    )
}