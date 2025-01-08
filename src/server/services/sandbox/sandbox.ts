import { db } from "@/server/db";
import { browserAgent, BrowserAgent } from "@/server/db/schema";
import { Sandbox } from '@e2b/desktop';
import { eq } from "drizzle-orm";
import { promises as fs } from 'fs';

export async function startSandbox(b: BrowserAgent) {
    if (b.sandboxId) {
        // sandbox exists -> resume the sandbox
        const sandbox = await Sandbox.resume(b.sandboxId);

        // mark sandbox as active
        await db.update(browserAgent).set({ sandboxActivatedAt: new Date().toISOString() }).where(eq(browserAgent.id, b.id));

        return { streamUrl: await sandbox.getVideoStreamUrl()};
    } else {
        // load the browser use python script
        const browserUseScript = await fs.readFile(process.cwd() + '/sandbox-scripts/browser_use.py', { encoding: 'utf-8' });

        // sandbox doesn't exists -> create new sandbox
        const sandbox = await Sandbox.create({
            videoStream: true,
        });

        
        // store the sandboxId in the db and mark sandbox as active
        await db.update(browserAgent).set({ sandboxId: sandbox.sandboxId, sandboxActivatedAt: new Date().toISOString() }).where(eq(browserAgent.id, b.id));
        
        // Upload file to the sandbox to path '/'
        sandbox.files.write('/browser_use.py', browserUseScript);
        // install required packages
        await sandbox.commands.run('pip install browser-use', {background: true});
        await sandbox.commands.run('playwright install', {background: true});
        await sandbox.commands.run('pip install -U langchain-openai',{background: true});

        return { streamUrl: await sandbox.getVideoStreamUrl()};
    }
}

export async function stopSandbox(params: { sandboxId: string }) {
    const s = await Sandbox.connect(params.sandboxId);
    await s.pause();
    await db.update(browserAgent).set({sandboxActivatedAt: null}).where(eq(browserAgent.sandboxId, params.sandboxId));
    return true;
}

export async function streamSandbox(params: { sandboxId: string }) {
    const s = await Sandbox.connect(params.sandboxId);
    const streamUrl = await s.getVideoStreamUrl();
    return { streamUrl };
}

export async function sandboxActivity(s: Sandbox) {
    // The new timeout will be 5 minutes from now.
    await s.setTimeout(5 * 60_000)
}
