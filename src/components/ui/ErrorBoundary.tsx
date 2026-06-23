import { Component, type ReactNode, type ErrorInfo } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean; error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-cream-50 p-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">🍳</div>
            <h1 className="text-2xl font-display font-bold text-caramel-700 mb-2">
              Something went wrong
            </h1>
            <p className="text-sm text-caramel-400 mb-6">
              The app encountered an error. Please try refreshing the page.
            </p>
            <pre className="text-xs text-left bg-rose-50 border border-rose-200 rounded-2xl p-4 mb-6 max-h-32 overflow-auto text-rose-600">
              {this.state.error?.message || 'Unknown error'}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="btn-magic px-6 py-3 text-sm"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
