import React from "react";
import { AlertTriangle } from "lucide-react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("Render error caught by ErrorBoundary:", error);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 px-4 text-center">
          <AlertTriangle className="text-amber-500" size={36} />
          <p className="font-semibold text-slate-700">This part of the page couldn't load.</p>
          <p className="text-sm text-slate-600 max-w-sm">
            This is sometimes caused by a browser extension (ad blocker / privacy blocker) blocking a request.
            Try disabling extensions for this site, or refresh the page.
          </p>
          <button onClick={() => window.location.reload()} className="btn-outline mt-2">
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
