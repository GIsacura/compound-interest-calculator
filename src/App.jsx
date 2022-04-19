import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import Input from './components/Input'
import Button from './components/Button'
import Container from './components/Container'
import Section from './components/Section'
import Balance from './components/Balance'

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit
  for(let i = 0; i < years; i++){
    total = (total + contribution) * (rate + 1)
  }

  return Math.round(total)
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency:'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})


function App() {
  const [balance, setBalance] = useState('')
  const handleSubmit = ({deposit, contribution, years, rate}) => {
    const val = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate))
    setBalance(formatter.format(val))
  }
  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            deposit: '',
            contribution: '',
            years: '',
            rate: ''
          }}
          onSubmit={handleSubmit}
          validationSchema = {yup.object({
            deposit: yup
              .number()
              .required('Required')
              .typeError('Must be a number'),
            contribution: yup
              .number()
              .required('Required')
              .typeError('Must be a number'),
            years: yup
              .number()
              .required('Required')
              .typeError('Must be a number'),
            rate: yup
              .number()
              .required('Required')
              .typeError('Must be a number')
              .min(0, 'Min value is 0')
              .max(1, 'Max value is 1'),
          })}
        >
          <Form>
            <Input name="deposit" label="Initial Deposit ($)"/>
            <Input name="contribution" label="Anual Contribution ($)"/>
            <Input name="years" label="Years"/>
            <Input name="rate" label="Estimated rate"/>
            <Button type='submit'>Calculate</Button>
          </Form>
        </Formik>
        {balance !== '' ? <Balance>Final balance: {balance}</Balance> : null}
      </Section>
    </Container>
  )
}

export default App
