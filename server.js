import merely from 'merely'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

/*

  When rendering on the server in production, initialize the store with true defaults.
  - Render page (each time we render in async mode, we re-initialize the store with defaults)
  - Grab store contents
  - Add to HTML of page in a script tag

  When we load up on client, in production mode
  - Grab default state from script tag
  - Create store
  - Wrap application in store provider, using that store

  When we load up on client, n dev mode
  - Use true defaults to create store
  - Wrap application in store provider, using that store

*/

merely.plugin('merely-react-redux', (options, isDev) => {

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

      const store = createStore(ctx.app.getReducers(), ctx.app.getDefaultState());
      return <Provider store={store}>{root}</Provider>

    // }
    
    // return root

  });

  merely.on('beforeRender', (ctx) => {

  });

  merely.on('beforeRenderPass', (ctx) => {
    // ctx.reduxStore = ctx.
  });

});
