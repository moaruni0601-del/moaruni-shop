import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowUpRight, Check, Code2, Copy } from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('npm run dev');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="starter-shell" data-testid="page-starter">
      <header
        className="starter-content flex items-center justify-between border-b py-6"
        data-testid="header-starter"
      >
        <div className="flex items-center gap-3">
          <div
            className="flex size-9 items-center justify-center rounded-lg bg-foreground text-background"
            data-testid="icon-starter"
          >
            <Code2 size={18} strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight" data-testid="text-project-name">
              Vite React TypeScript
            </p>
            <p className="starter-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              starter / ready
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-2 sm:flex" data-testid="status-ready">
          <span className="size-2 rounded-full bg-[#738b72]" />
          <span className="starter-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            local workspace
          </span>
        </div>
      </header>

      <section className="starter-content grid min-h-[calc(100dvh-145px)] items-center py-16 sm:py-24">
        <div className="max-w-3xl">
          <div className="starter-reveal mb-7 flex items-center gap-3">
            <span className="starter-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
              00 / blank canvas
            </span>
            <span className="h-px w-10 bg-primary/40" />
          </div>

          <h1
            className="starter-reveal starter-reveal-delay max-w-2xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-7xl"
            data-testid="heading-starter"
          >
            Start with less.
            <br />
            <span className="text-primary">Make it yours.</span>
          </h1>

          <p
            className="starter-reveal starter-reveal-delay-2 mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg"
            data-testid="text-starter-description"
          >
            A quiet, ready-to-extend Vite workspace with React and TypeScript already in place.
            No routes, no assumptions, no noise.
          </p>

          <div
            className="starter-reveal starter-reveal-delay-2 mt-11 max-w-xl overflow-hidden rounded-xl border bg-[hsl(var(--foreground)/0.035)] shadow-[0_18px_60px_hsl(var(--foreground)/0.06)]"
            data-testid="card-run-command"
          >
            <div className="flex items-center justify-between border-b px-4 py-3">
              <span className="starter-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Run locally
              </span>
              <span className="starter-mono text-[10px] text-muted-foreground">package.json</span>
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-5">
              <code className="starter-mono text-sm text-foreground" data-testid="text-dev-command">
                <span className="mr-2 text-primary">$</span>
                npm run dev
              </code>
              <button
                type="button"
                onClick={handleCopy}
                className="flex shrink-0 items-center gap-2 rounded-md border bg-[hsl(var(--background)/0.75)] px-3 py-2 text-xs font-semibold text-foreground transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 active:translate-y-0"
                data-testid="button-copy-command"
                aria-label={copied ? 'Command copied' : 'Copy development command'}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="starter-reveal starter-reveal-delay-2 mt-12 grid max-w-2xl gap-8 border-t pt-7 sm:grid-cols-[1fr_auto]">
            <div>
              <p className="starter-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Included
              </p>
              <div className="mt-3 flex flex-wrap gap-2" data-testid="list-stack">
                {['Vite', 'React', 'TypeScript', 'Tailwind CSS'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border bg-[hsl(var(--background)/0.55)] px-3 py-1.5 text-xs font-medium"
                    data-testid={`badge-stack-${item.toLowerCase().replace(' ', '-')}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground sm:max-w-[170px]">
              <ArrowUpRight className="mt-0.5 shrink-0 text-primary" size={16} />
              <p data-testid="text-next-step">Your next idea belongs here.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="starter-content flex items-center justify-between border-t py-5">
        <p className="starter-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Built to be extended
        </p>
        <p className="starter-mono text-[10px] text-muted-foreground" data-testid="text-version">
          v0.0.0
        </p>
      </footer>
    </main>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
