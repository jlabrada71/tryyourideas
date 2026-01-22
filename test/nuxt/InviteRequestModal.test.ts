import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import InviteRequestModal from '../../app/components/InviteRequestModal.vue'

// Mock $fetch globally
const mockFetch = vi.fn()
vi.stubGlobal('$fetch', mockFetch)

// Mock useToast composable
const mockToastSuccess = vi.fn()
vi.mock('../../app/composables/useToast', () => ({
  useToast: () => ({
    success: mockToastSuccess,
    error: vi.fn(),
    info: vi.fn(),
    show: vi.fn(),
    remove: vi.fn(),
    toasts: { value: [] }
  })
}))

describe('InviteRequestModal', () => {
  beforeEach(() => {
    mockFetch.mockReset()
    mockToastSuccess.mockReset()
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('does not render modal content when closed', () => {
    render(InviteRequestModal, {
      props: { open: false }
    })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('renders form with accessible labels when open', () => {
    render(InviteRequestModal, {
      props: { open: true }
    })

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/i am a/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/tell us about yourself/i)).toBeInTheDocument()
  })

  it('displays correct heading and description', () => {
    render(InviteRequestModal, {
      props: { open: true }
    })

    expect(screen.getByRole('heading', { name: /request an invite/i })).toBeInTheDocument()
    expect(screen.getByText(/invite-only/i)).toBeInTheDocument()
  })

  it('has all role options in the select', () => {
    render(InviteRequestModal, {
      props: { open: true }
    })

    const roleSelect = screen.getByLabelText(/i am a/i)
    expect(roleSelect).toBeInTheDocument()

    expect(screen.getByRole('option', { name: /idea creator/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /developer/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /investor/i })).toBeInTheDocument()
  })

  it('has an accessible close button', () => {
    render(InviteRequestModal, {
      props: { open: true }
    })

    // Close button should be accessible (even without visible text, it has a purpose)
    const closeButtons = screen.getAllByRole('button')
    expect(closeButtons.length).toBeGreaterThan(0)
  })

  it('emits close event when close button clicked', async () => {
    const { emitted } = render(InviteRequestModal, {
      props: { open: true }
    })

    // The close button is the first button (type="button" vs type="submit")
    const closeButton = screen.getAllByRole('button')[0]!
    await fireEvent.click(closeButton)

    expect(emitted().close).toBeTruthy()
  })

  it('has accessible form inputs with proper attributes', () => {
    render(InviteRequestModal, {
      props: { open: true }
    })

    const nameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email address/i)
    const roleSelect = screen.getByLabelText(/i am a/i)
    const descriptionTextarea = screen.getByLabelText(/tell us about yourself/i)

    expect(nameInput).toHaveAttribute('type', 'text')
    expect(nameInput).toBeRequired()

    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toBeRequired()

    expect(roleSelect).toBeRequired()
    expect(descriptionTextarea).toBeRequired()
  })

  it('submits form data to API when filled and submitted', async () => {
    mockFetch.mockResolvedValueOnce({ success: true })
    const user = userEvent.setup()

    render(InviteRequestModal, {
      props: { open: true }
    })

    // Fill in the form using accessible queries
    await user.type(screen.getByLabelText(/full name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com')
    await user.selectOptions(screen.getByLabelText(/i am a/i), 'developer')
    await user.type(screen.getByLabelText(/tell us about yourself/i), 'I want to build great projects')

    // Submit form
    await user.click(screen.getByRole('button', { name: /submit request/i }))

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/invite-requests', {
        method: 'POST',
        body: {
          name: 'John Doe',
          email: 'john@example.com',
          role: 'developer',
          description: 'I want to build great projects'
        }
      })
    })
  })

  it('shows success toast and closes modal after successful submission', async () => {
    mockFetch.mockResolvedValueOnce({ success: true })
    const user = userEvent.setup()

    const { emitted } = render(InviteRequestModal, {
      props: { open: true }
    })

    await user.type(screen.getByLabelText(/full name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com')
    await user.selectOptions(screen.getByLabelText(/i am a/i), 'creator')
    await user.type(screen.getByLabelText(/tell us about yourself/i), 'I have a great idea')

    await user.click(screen.getByRole('button', { name: /submit request/i }))

    await waitFor(() => {
      expect(mockToastSuccess).toHaveBeenCalledWith(
        expect.stringContaining('submitted successfully'),
        3000
      )
    })
    expect(emitted().close).toBeTruthy()
  })

  it('shows error message on API failure', async () => {
    mockFetch.mockRejectedValueOnce({
      data: { statusMessage: 'Invalid email format' }
    })

    render(InviteRequestModal, {
      props: { open: true }
    })

    // Use fireEvent for more direct control
    const nameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email address/i)
    const roleSelect = screen.getByLabelText(/i am a/i)
    const descriptionInput = screen.getByLabelText(/tell us about yourself/i)

    await fireEvent.update(nameInput, 'John Doe')
    await fireEvent.update(emailInput, 'invalid-email')
    await fireEvent.update(roleSelect, 'investor')
    await fireEvent.update(descriptionInput, 'Looking for opportunities')

    // Submit using the form element
    const form = nameInput.closest('form')!
    await fireEvent.submit(form)

    await waitFor(() => {
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument()
    })
  })

  it('shows generic error message when no statusMessage provided', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))
    const user = userEvent.setup()

    render(InviteRequestModal, {
      props: { open: true }
    })

    await user.type(screen.getByLabelText(/full name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com')
    await user.selectOptions(screen.getByLabelText(/i am a/i), 'developer')
    await user.type(screen.getByLabelText(/tell us about yourself/i), 'Test')

    await user.click(screen.getByRole('button', { name: /submit request/i }))

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    })
  })

  it('disables form inputs while loading', async () => {
    mockFetch.mockImplementationOnce(() => new Promise(() => {}))
    const user = userEvent.setup()

    render(InviteRequestModal, {
      props: { open: true }
    })

    await user.type(screen.getByLabelText(/full name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com')
    await user.selectOptions(screen.getByLabelText(/i am a/i), 'developer')
    await user.type(screen.getByLabelText(/tell us about yourself/i), 'Test')

    await user.click(screen.getByRole('button', { name: /submit request/i }))

    await waitFor(() => {
      expect(screen.getByLabelText(/full name/i)).toBeDisabled()
      expect(screen.getByLabelText(/email address/i)).toBeDisabled()
      expect(screen.getByLabelText(/i am a/i)).toBeDisabled()
      expect(screen.getByLabelText(/tell us about yourself/i)).toBeDisabled()
      expect(screen.getByRole('button', { name: /submitting/i })).toBeDisabled()
    })
  })

  it('shows loading indicator on submit button while submitting', async () => {
    mockFetch.mockImplementationOnce(() => new Promise(() => {}))
    const user = userEvent.setup()

    render(InviteRequestModal, {
      props: { open: true }
    })

    await user.type(screen.getByLabelText(/full name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com')
    await user.selectOptions(screen.getByLabelText(/i am a/i), 'developer')
    await user.type(screen.getByLabelText(/tell us about yourself/i), 'Test')

    await user.click(screen.getByRole('button', { name: /submit request/i }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /submitting/i })).toBeInTheDocument()
    })
  })

  it('has proper placeholder text for guidance', () => {
    render(InviteRequestModal, {
      props: { open: true }
    })

    expect(screen.getByPlaceholderText(/john doe/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/john@example.com/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/what brings you/i)).toBeInTheDocument()
  })
})
