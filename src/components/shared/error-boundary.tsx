import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: any) {
    console.error("Caught error:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 20, color: "red", whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
          <h2>Error caught:</h2>
          <p>{this.state.error.message}</p>
          <pre>{this.state.error.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
