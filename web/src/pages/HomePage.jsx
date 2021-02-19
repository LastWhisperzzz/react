import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../redux/actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

// 首页
const HomePage = ({ match }) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch()
  // 从Redux的store中提取数据(state)
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList
  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <>
      <h1>最新产品</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomePage
