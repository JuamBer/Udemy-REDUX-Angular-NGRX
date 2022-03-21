import { createStore, Store } from 'redux'
import { incrementadorAction } from './contador/contador.actions';
import { contadorReducer } from './contador/contador.reducer';

const store: Store = createStore(contadorReducer);

store.subscribe(()=>{
    console.log("Subs:", store.getState())
});

store.dispatch(incrementadorAction);
store.dispatch(incrementadorAction);

