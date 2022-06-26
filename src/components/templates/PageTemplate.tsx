import { Outlet } from 'react-router-dom'

interface Props {
  title: string
}

export const PageTemplate = ({ title }: Props): JSX.Element => {
  return (
    <div>
      <h1> Page: {title}</h1>
      <Outlet />
    </div>
  )
}
