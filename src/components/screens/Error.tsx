import React, {ReactNode} from 'react';
import classes from './error.module.css';

interface ErrorBoundaryProps {
  readonly children: ReactNode
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, {hasError: boolean}> {

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {hasError: false};
  }
  static getDerivedStateFromError(_: unknown) {
    return {hasError: true};
  }
  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (<h1 className={classes.error}>
        Error
      </h1>);
    }
    return this.props.children;
  }
}
