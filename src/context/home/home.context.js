import React, { createContext } from 'react'
import { CoreStateContext, useCoreStateProvider } from '../core'
import { homeReducer } from './'

/*
    We are using createContext() to initialize Context
    and assign it to 'HomeStateContext' object containing 'Provider' and 'Consumer'
*/
const HomeStateContext = createContext()

/*
    We are creating new React component called 'HomeStateProvider'.
    This component wraps it’s children components with 'Provider' that accepts 'value' prop.
*/

class HomeStateProvider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dispatchHomeAction: action => {
        this.setState(prevState => this.props.reducer(prevState, action))
      }
    }
  }

  render () {
    const { props: { children } } = this
    return (
      <HomeStateContext.Provider value={this.state}>
        {children}
      </HomeStateContext.Provider>
    )
  }
}

const useHomeStateProvider = (WrappedComponent, store) => {
  return (
    <HomeStateProvider reducer={homeReducer}>
      <WrappedComponent store={store} />
    </HomeStateProvider>
  )
}

const useHomeStateProviderWithCore = (WrappedComponent, store) => {
  return useHomeStateProvider(() => {
    return useCoreStateProvider(WrappedComponent, store)
  })
}

const CombinedCoreHomeContextConsumer = ({ children }) => (
  <CoreStateContext.Consumer>
    {(coreContext) => (
      <HomeStateContext.Consumer>{(homeContext) => children({ coreContext, homeContext })}</HomeStateContext.Consumer>
    )}
  </CoreStateContext.Consumer>
)

export {
  HomeStateProvider,
  useHomeStateProvider,
  HomeStateContext,
  useHomeStateProviderWithCore,
  CombinedCoreHomeContextConsumer
}
