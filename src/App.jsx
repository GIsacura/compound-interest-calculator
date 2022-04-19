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
              .required('Obligatorio')
              .typeError('Debe ser un numero'),
            contribution: yup
              .number()
              .required('Obligatorio')
              .typeError('Debe ser un numero'),
            years: yup
              .number()
              .required('Obligatorio')
              .typeError('Debe ser un numero'),
            rate: yup
              .number()
              .required('Obligatorio')
              .typeError('Debe ser un numero')
              .min(0, 'El valor minimo es 0')
              .max(1, 'El valor maximo es 1'),
          })}
        >
          <Form>
            <Input name="deposit" label="Deposito inicial"/>
            <Input name="contribution" label="Contribucion anual"/>
            <Input name="years" label="Años"/>
            <Input name="rate" label="Interes estimado"/>
            <Button type='submit'>Calcular</Button>
          </Form>
        </Formik>
        {balance !== '' ? <Balance>Balance final: {balance}</Balance> : null}
      </Section>
    </Container>
  )
}

export default App
