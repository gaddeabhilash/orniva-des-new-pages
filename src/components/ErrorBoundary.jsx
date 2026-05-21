import React, { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an uncaught component crash:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF7F2] text-primary flex items-center justify-center px-4 relative overflow-hidden">
          {/* Background glowing blurs */}
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#C84E55]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-md w-full bg-white border border-primary/5 rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] text-center space-y-6 z-10 relative">
            <div className="w-16 h-16 bg-[#C84E55]/10 text-[#C84E55] rounded-full flex items-center justify-center mx-auto border border-[#C84E55]/20 animate-pulse">
              <AlertTriangle size={32} />
            </div>
            
            <div className="space-y-2">
              <span className="text-[#C84E55] text-xs font-bold tracking-[0.25em] uppercase block">
                System Error
              </span>
              <h1 className="text-3xl font-heading font-normal text-primary">Unexpected Crash</h1>
              <p className="text-neutral-500 text-sm font-light leading-relaxed">
                Something went wrong rendering this room. Don't worry, our design tools are resetting the workspace.
              </p>
            </div>

            {this.state.error && (
              <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl text-left max-h-28 overflow-y-auto">
                <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider block mb-1">Diagnostics</span>
                <code className="text-[11px] text-[#C84E55] font-mono whitespace-pre-wrap break-all leading-normal">
                  {this.state.error.toString()}
                </code>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="w-full py-3.5 bg-accent hover:bg-neutral-900 text-white rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 text-xs tracking-wider uppercase shadow-md hover:shadow-lg shadow-accent/10"
              >
                <RefreshCw size={14} className="animate-spin-slow" />
                <span>Reload Page</span>
              </button>
              <a
                href="/"
                className="w-full py-3.5 border border-primary hover:bg-primary hover:text-white text-primary rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 text-xs tracking-wider uppercase text-center"
              >
                <Home size={14} />
                <span>Back to Home</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
