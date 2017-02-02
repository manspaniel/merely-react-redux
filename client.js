const merely = require('merely');
import { createStore } from 'redux'
import { Provider } from 'react-redux'

merely.plugin('merely-react-redux', (options, isDev) => {
  
  let devStore

  merely.filter('wrapRootComponent', (root, ctx) => {

    let missingExports = [];
    if(!ctx.app.getReducers) {
      missingExports.push('getReducers');
    }
    if(!ctx.app.getDefaultState) {
      missingExports.push('getDefaultState');
    }

    if(missingExports.length) {
      throw new Error("You're using the 'merely-react-redux' plugin for Merely, however you must also export some extra functions from your main.js file! You're missing "+missingExports.join(', '));
    }

    // if(isDev) {

      const store = (isDev && devStore) || createStore(ctx.app.getReducers(), ctx.app.getDefaultState());
      
      if(isDev) devStore = store

      window.store = store;

      return <Provider store={store}>{root}</Provider>

    // }

  });

});
