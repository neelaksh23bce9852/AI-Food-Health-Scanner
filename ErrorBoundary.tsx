import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('[ErrorBoundary] Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 text-center">
                    <div className="glass-panel p-8 max-w-md border-red-500/20">
                        <h1 className="text-2xl font-bold font-space mb-4 text-red-500">Something went wrong.</h1>
                        <p className="text-white/60 mb-8">We encountered an unexpected error. Please try refreshing the page or clearing your cache.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-colors"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
