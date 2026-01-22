import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import InviteRequestModal from '~/components/InviteRequestModal.vue'

// Mock $fetch globally
const mockFetch = vi.fn()
vi.stubGlobal('$fetch', mockFetch)

describe('InviteRequestModal', () => {
  let wrapper: any

  beforeEach(() => {
    mockFetch.mockReset()
  })

  afterEach(() => {
    wrapper?.unmount()
    // Clean up any teleported content
    document.body.innerHTML = ''
  })

  it('does not render modal content when closed', async () => {
    wrapper = await mountSuspended(InviteRequestModal, {
      props: { open: false },
      attachTo: document.body
    })

    expect(document.querySelector('form')).toBeNull()
  })

  it('renders form when open', async () => {
    wrapper = await mountSuspended(InviteRequestModal, {
      props: { open: true },
      attachTo: document.body
    })

    expect(document.querySelector('form')).not.toBeNull()
    expect(document.querySelector('input#name')).not.toBeNull()
    expect(document.querySelector('input#email')).not.toBeNull()
    expect(document.querySelector('select#role')).not.toBeNull()
    expect(document.querySelector('textarea#description')).not.toBeNull()
  })

  it('displays correct title and description', async () => {
    wrapper = await mountSuspended(InviteRequestModal, {
      props: { open: true },
      attachTo: document.body
    })

    const modalText = document.body.textContent || ''
    expect(modalText).toContain('Request an Invite')
    expect(modalText).toContain('invite-only')
  })

  it('has all role options', async () => {
    wrapper = await mountSuspended(InviteRequestModal, {
      props: { open: true },
      attachTo: document.body
    })

    const options = document.querySelectorAll('select#role option')
    const optionTexts = Array.from(options).map(o => o.textContent)

    expect(optionTexts).toContain('Idea Creator')
    expect(optionTexts).toContain('Developer')
    expect(optionTexts).toContain('Investor')
  })

  it('emits close event when close button clicked', async () => {
    wrapper = await mountSuspended(InviteRequestModal, {
      props: { open: true },
      attachTo: document.body
    })

    const closeButton = document.querySelector('button[type="button"]') as HTMLButtonElement
    closeButton?.click()
    await flushPromises()

    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('emits close event when clicking backdrop', async () => {
    wrapper = await mountSuspended(InviteRequestModal, {
      props: { open: true },
      attachTo: document.body
    })

    const backdrop = document.querySelector('.fixed.inset-0.z-50') as HTMLElement
    backdrop?.click()
    await flushPromises()

    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('submits form data to API', async () => {
    mockFetch.mockResolvedValueOnce({ success: true })

    wrapper = await mountSuspended(InviteRequestModal, {
      props: { open: true },
      attachTo: document.body
    })

    // Fill in the form
    const nameInput = document.querySelector('input#name') as HTMLInputElement
    const emailInput = document.querySelector('input#email') as HTMLInputElement
    const roleSelect = document.querySelector('select#role') as HTMLSelectElement
    const descriptionTextarea = document.querySelector('textarea#description') as HTMLTextAreaElement

    nameInput.value = 'John Doe'
    nameInput.dispatchEvent(new Event('input'))

    emailInput.value = 'john@example.com'
    emailInput.dispatchEvent(new Event('input'))

    roleSelect.value = 'developer'
    roleSelect.dispatchEvent(new Event('change'))

    descriptionTextarea.value = 'I want to build great projects'
    descriptionTextarea.dispatchEvent(new Event('input'))

    await flushPromises()

    // Submit form
    const form = document.querySelector('form') as HTMLFormElement
    form.dispatchEvent(new Event('submit'))

    await flushPromises()

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

  it('shows success message after submission', async () => {
    mockFetch.mockResolvedValueOnce({ success: true })

    wrapper = await mountSuspended(InviteRequestModal, {
      props: { open: true },
      attachTo: document.body
    })

    // Fill form
    const nameInput = document.querySelector('input#name') as HTMLInputElement
    const emailInput = document.querySelector('input#email') as HTMLInputElement
    const roleSelect = document.querySelector('select#role') as HTMLSelectElement
    const descriptionTextarea = document.querySelector('textarea#description') as HTMLTextAreaElement

    nameInput.value = 'John Doe'
    nameInput.dispatchEvent(new Event('input'))
    emailInput.value = 'john@example.com'
    emailInput.dispatchEvent(new Event('input'))
    roleSelect.value = 'creator'
    roleSelect.dispatchEvent(new Event('change'))
    descriptionTextarea.value = 'I have a great idea'
    descriptionTextarea.dispatchEvent(new Event('input'))

    await flushPromises()

    // Submit form
    const form = document.querySelector('form') as HTMLFormElement
    form.dispatchEvent(new Event('submit'))

    await flushPromises()

    const modalText = document.body.textContent || ''
    expect(modalText).toContain('Request Received!')
  })

  it('shows error message on API failure', async () => {
    mockFetch.mockRejectedValueOnce({
      data: { statusMessage: 'Invalid email format' }
    })

    wrapper = await mountSuspended(InviteRequestModal, {
      props: { open: true },
      attachTo: document.body
    })

    // Fill form
    const nameInput = document.querySelector('input#name') as HTMLInputElement
    const emailInput = document.querySelector('input#email') as HTMLInputElement
    const roleSelect = document.querySelector('select#role') as HTMLSelectElement
    const descriptionTextarea = document.querySelector('textarea#description') as HTMLTextAreaElement

    nameInput.value = 'John Doe'
    nameInput.dispatchEvent(new Event('input'))
    emailInput.value = 'invalid-email'
    emailInput.dispatchEvent(new Event('input'))
    roleSelect.value = 'investor'
    roleSelect.dispatchEvent(new Event('change'))
    descriptionTextarea.value = 'Looking for opportunities'
    descriptionTextarea.dispatchEvent(new Event('input'))

    await flushPromises()

    // Submit form
    const form = document.querySelector('form') as HTMLFormElement
    form.dispatchEvent(new Event('submit'))

    await flushPromises()

    const modalText = document.body.textContent || ''
    expect(modalText).toContain('Invalid email format')
  })

  it('shows generic error message when no statusMessage', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    wrapper = await mountSuspended(InviteRequestModal, {
      props: { open: true },
      attachTo: document.body
    })

    // Fill form
    const nameInput = document.querySelector('input#name') as HTMLInputElement
    const emailInput = document.querySelector('input#email') as HTMLInputElement
    const roleSelect = document.querySelector('select#role') as HTMLSelectElement
    const descriptionTextarea = document.querySelector('textarea#description') as HTMLTextAreaElement

    nameInput.value = 'John Doe'
    nameInput.dispatchEvent(new Event('input'))
    emailInput.value = 'john@example.com'
    emailInput.dispatchEvent(new Event('input'))
    roleSelect.value = 'developer'
    roleSelect.dispatchEvent(new Event('change'))
    descriptionTextarea.value = 'Test'
    descriptionTextarea.dispatchEvent(new Event('input'))

    await flushPromises()

    // Submit form
    const form = document.querySelector('form') as HTMLFormElement
    form.dispatchEvent(new Event('submit'))

    await flushPromises()

    const modalText = document.body.textContent || ''
    expect(modalText).toContain('Something went wrong')
  })

  it('disables form inputs while loading', async () => {
    // Make fetch hang to simulate loading
    mockFetch.mockImplementationOnce(() => new Promise(() => {}))

    wrapper = await mountSuspended(InviteRequestModal, {
      props: { open: true },
      attachTo: document.body
    })

    // Fill form
    const nameInput = document.querySelector('input#name') as HTMLInputElement
    const emailInput = document.querySelector('input#email') as HTMLInputElement
    const roleSelect = document.querySelector('select#role') as HTMLSelectElement
    const descriptionTextarea = document.querySelector('textarea#description') as HTMLTextAreaElement

    nameInput.value = 'John Doe'
    nameInput.dispatchEvent(new Event('input'))
    emailInput.value = 'john@example.com'
    emailInput.dispatchEvent(new Event('input'))
    roleSelect.value = 'developer'
    roleSelect.dispatchEvent(new Event('change'))
    descriptionTextarea.value = 'Test'
    descriptionTextarea.dispatchEvent(new Event('input'))

    await flushPromises()

    // Submit form
    const form = document.querySelector('form') as HTMLFormElement
    form.dispatchEvent(new Event('submit'))

    await flushPromises()

    // Check inputs are disabled
    expect(nameInput.disabled).toBe(true)
    expect(emailInput.disabled).toBe(true)
    expect(roleSelect.disabled).toBe(true)
    expect(descriptionTextarea.disabled).toBe(true)

    const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })

  it('shows loading text on submit button while submitting', async () => {
    mockFetch.mockImplementationOnce(() => new Promise(() => {}))

    wrapper = await mountSuspended(InviteRequestModal, {
      props: { open: true },
      attachTo: document.body
    })

    // Fill form
    const nameInput = document.querySelector('input#name') as HTMLInputElement
    const emailInput = document.querySelector('input#email') as HTMLInputElement
    const roleSelect = document.querySelector('select#role') as HTMLSelectElement
    const descriptionTextarea = document.querySelector('textarea#description') as HTMLTextAreaElement

    nameInput.value = 'John Doe'
    nameInput.dispatchEvent(new Event('input'))
    emailInput.value = 'john@example.com'
    emailInput.dispatchEvent(new Event('input'))
    roleSelect.value = 'developer'
    roleSelect.dispatchEvent(new Event('change'))
    descriptionTextarea.value = 'Test'
    descriptionTextarea.dispatchEvent(new Event('input'))

    await flushPromises()

    // Submit form
    const form = document.querySelector('form') as HTMLFormElement
    form.dispatchEvent(new Event('submit'))

    await flushPromises()

    const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement
    expect(submitButton.textContent).toContain('Submitting...')
  })
})
