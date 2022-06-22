import * as rtl from '@testing-library/react'
import rtlUserEvent from '@testing-library/user-event'
import { afterEach } from 'vitest'

afterEach(() => {
  rtl.cleanup()
})

const customRender = (ui: React.ReactElement, options = {}) =>
  rtl.render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  })

const render = customRender
const userEvent = rtlUserEvent

export * from '@testing-library/react'
export { userEvent, render }
