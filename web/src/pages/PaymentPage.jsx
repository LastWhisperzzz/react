import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../redux/actions/cartActions'
import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

// 选择支付方式页面
const PaymentPage = ({ history }) => {
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart
  // 如果未填写收货地址
  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('微信')
  const dispatch = useDispatch()

  // 表单提交函数(保存支付方式)
  const submitHandler = e => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>支付方式</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">选择支付方式</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="微信"
              id="微信"
              name="paymenMethod"
              value="微信"
              checked
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="支付宝"
              id="支付宝"
              name="paymenMethod"
              value="支付宝"
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          继续下一步
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentPage
