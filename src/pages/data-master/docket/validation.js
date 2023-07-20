import * as yup from 'yup'
import { object, string, number, date, InferType, array } from 'yup'

export const schema = yup
  .object()
  .shape({
    name: string().required(),
  })
  .required()

export default schema
