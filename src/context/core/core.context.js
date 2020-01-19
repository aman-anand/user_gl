import React, { createContext, Component } from 'react'
import { coreReducer } from './core.reducer'

const CoreStateContext = createContext({ coreModal: {} })

class CoreStateProvider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dispatchCoreAction: action => {
        this.setState(prevState => this.props.reducer(prevState, action))
      }
    }
  }

  render () {
    const { props: { children } } = this
    return (
      <CoreStateContext.Provider value={this.state}>
        {children}
      </CoreStateContext.Provider>
    )
  }
}

const useCoreStateProvider = (WrappedComponent, store) => {
  return (
    <CoreStateProvider reducer={coreReducer}>
      <WrappedComponent store={store} />
    </CoreStateProvider>
  )
}

const withCoreStateContext = (Component) => {
  return function wrapperComponent (props) {
    return (
      <CoreStateContext.Consumer>
        {state => <Component {...props} context={state} />}
      </CoreStateContext.Consumer>
    )
  }
}

export {
  CoreStateProvider,
  useCoreStateProvider,
  CoreStateContext,
  withCoreStateContext
}
