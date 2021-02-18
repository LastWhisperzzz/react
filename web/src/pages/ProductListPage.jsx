import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts, deleteProduct, createProduct } from '../redux/actions/productActions'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { PRODUCT_CREATE_RESET } from '../redux/constants/productConstants'

// 后台管理:产品列表页
const ProductListPage = ({ history }) => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productDelete = useSelector(state => state.productDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

  const productCreate = useSelector(state => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct
  } = productCreate

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (!userInfo.isAdmin) {
      history.push('/login')
    }
    if (successCreate) {
      history.push(`/admin/product/edit/${createdProduct._id}`)
    } else {
      dispatch(listProducts())
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])

  //删除产品
  const deleteHandler = id => {
    if (window.confirm('是否确定删除')) {
      dispatch(deleteProduct(id))
    }
  }
  //创建产品
  const createProductHandler = () => {
    dispatch(createProduct())
  }
  return (
    <>
      <Row>
        <Col>
          {' '}
          <h1>产品列表</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            创建产品
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>产品名称</th>
              <th>价格</th>
              <th>类型</th>
              <th>品牌</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/edit/${product._id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ProductListPage
