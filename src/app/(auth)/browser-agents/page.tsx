import BrowserAgentList from '@/components/browser-agent/BrowserAgentList';
import BrowserAgentModal from '@/components/browser-agent/BrowserAgentModal';
import { auth, validateSession } from '@/server/auth';
import { api } from '@/trpc/server';

const BrowserAgentsPage = async () => {
  const browserAgents = await api.browserAgent.list();

  return (
    <>
      <div className="space-y-1">
        <p>Your Browser agents</p>
        <p className="text-sm text-muted-foreground">
          Only 1 browser is allowed at the moment
        </p>
      </div>
      <div>
        <div className="mt-8 space-y-4">
          <BrowserAgentModal />
          <BrowserAgentList browserAgents={browserAgents} />
        </div>
      </div>
    </>
  );
};

export default BrowserAgentsPage;
