import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'

// 汇总reducer
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer
})

const initialState = {}

// redux-thunk，用于支持异步action
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
