import { screen, fireEvent, getByText } from '@testing-library/dom'
import { MultipleValuesInput } from './MultipleValuesInput'

describe('MultipleValuesInput', function () {
  beforeEach(() => {
    document.body.innerHTML = '<div id="mount"></div>'
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('component', function () {
    it('mounts correctly for initialization', function () {
      const component = new MultipleValuesInput(document.querySelector('#mount') as HTMLElement)
      expect(screen.getByPlaceholderText('Enter item')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Enter item')).toBeVisible()
      expect(screen.getByTestId('container')).toBeInTheDocument()
      expect(screen.getByTestId('root')).toBeInTheDocument()
      component.destroy()
    })

    it('unmounts correctly on destroy', function () {
      const component = new MultipleValuesInput(document.querySelector('#mount') as HTMLElement)
      component.destroy()
      expect(screen.queryByPlaceholderText('Enter item')).not.toBeInTheDocument()
      expect(screen.queryByTestId('container')).not.toBeInTheDocument()
      expect(screen.getByTestId('root')).toBeInTheDocument()
    })

    it('set event listeners when mounting', function () {
      const addEventListener = jest.spyOn(HTMLElement.prototype, 'addEventListener')
      const component = new MultipleValuesInput(document.querySelector('#mount') as HTMLElement)
      expect(addEventListener).toHaveBeenCalledWith('click', expect.any(Function))
      expect(addEventListener).toHaveBeenCalledWith('keyup', expect.any(Function))
      expect(addEventListener).toHaveBeenCalledWith('focusout', expect.any(Function))
      expect(addEventListener).toHaveBeenCalledWith('paste', expect.any(Function))
      expect(addEventListener).toHaveBeenCalledTimes(4)
      component.destroy()
    })

    it('clears event listeners when unmounting', function () {
      const removeEventListener = jest.spyOn(HTMLElement.prototype, 'removeEventListener')
      const component = new MultipleValuesInput(document.querySelector('#mount') as HTMLElement)
      component.destroy()
      expect(removeEventListener).toHaveBeenCalledWith('click', expect.any(Function))
      expect(removeEventListener).toHaveBeenCalledWith('keyup', expect.any(Function))
      expect(removeEventListener).toHaveBeenCalledWith('focusout', expect.any(Function))
      expect(removeEventListener).toHaveBeenCalledWith('paste', expect.any(Function))
      expect(removeEventListener).toHaveBeenCalledTimes(4)
    })

    it('mounts input with custom options', function () {
      const values = ['one', 'two', 'three']
      const options = {
        values,
        placeholder: 'Custom placeholder',
      }
      const component = new MultipleValuesInput(document.querySelector('#mount') as HTMLElement, options)
      expect(screen.getByPlaceholderText(options.placeholder)).toBeInTheDocument()
      options.values.forEach((value) => {
        expect(screen.getByText(value)).toBeInTheDocument()
      })
      component.destroy()
    })

    it('throws an error if no parent component for root', function () {
      const node = document.createElement('html')
      expect(() => {
        new MultipleValuesInput(node)
      }).toThrowErrorMatchingInlineSnapshot(
        `"No parent node defined! Make sure you have not selected document root as input root!"`
      )
    })
  })

  describe('interaction', function () {
    it('adds new blocks', function () {
      const component = new MultipleValuesInput(document.querySelector('#mount') as HTMLElement)
      const input = screen.getByPlaceholderText('Enter item') as HTMLInputElement
      fireEvent.change(input, { target: { value: 'one' } })
      fireEvent.keyUp(input, { code: 'Enter' })
      expect(screen.getByText('one')).toBeInTheDocument()
      expect(input.value).toEqual('')
      fireEvent.change(input, { target: { value: 'two' } })
      fireEvent.keyUp(input, { code: 'Comma' })
      expect(screen.getByText('two')).toBeInTheDocument()
      expect(input.value).toEqual('')
      fireEvent.change(input, { target: { value: 'three' } })
      fireEvent.focusOut(input, {})
      expect(screen.getByText('three')).toBeInTheDocument()
      expect(input.value).toEqual('')
      fireEvent.paste(input, { clipboardData: { getData: () => 'four, five' } })
      expect(screen.getByText('four')).toBeInTheDocument()
      expect(screen.getByText('five')).toBeInTheDocument()
      expect(input.value).toEqual('')

      component.destroy()
    })

    it('do not add blocks for not matching keys', function () {
      const component = new MultipleValuesInput(document.querySelector('#mount') as HTMLElement)
      const input = screen.getByPlaceholderText('Enter item') as HTMLInputElement
      fireEvent.change(input, { target: { value: 'one' } })
      fireEvent.keyUp(input, { code: 'Space' })
      expect(screen.queryByText('one')).not.toBeInTheDocument()
      expect(input.value).toEqual('one')
      component.destroy()
    })

    it("doesn't add duplicates ", function () {
      const component = new MultipleValuesInput(document.querySelector('#mount') as HTMLElement)
      const input = screen.getByPlaceholderText('Enter item') as HTMLInputElement
      fireEvent.change(input, { target: { value: 'one' } })
      fireEvent.keyUp(input, { code: 'Enter' })
      expect(screen.getByText('one')).toBeInTheDocument()
      expect(input.value).toEqual('')
      fireEvent.change(input, { target: { value: 'one' } })
      fireEvent.keyUp(input, { code: 'Enter' })
      expect(screen.getAllByText('one')).toHaveLength(1)
      expect(input.value).toEqual('')
      fireEvent.change(input, { target: { value: 'one' } })
      fireEvent.keyUp(input, { code: 'Comma' })
      expect(screen.getAllByText('one')).toHaveLength(1)
      expect(input.value).toEqual('')
      fireEvent.change(input, { target: { value: 'one' } })
      fireEvent.focusOut(input, {})
      expect(screen.getAllByText('one')).toHaveLength(1)
      expect(input.value).toEqual('')
      fireEvent.paste(input, { clipboardData: { getData: () => 'one, two' } })
      expect(screen.getByText('two')).toBeInTheDocument()
      expect(screen.getAllByText('one')).toHaveLength(1)
      expect(input.value).toEqual('')
      component.destroy()
    })

    it('deletes blocks', function () {
      const values = ['one', 'two', 'three']
      const removingValues = [values[0], values[1]]
      const component = new MultipleValuesInput(document.querySelector('#mount') as HTMLElement, { values })
      values.forEach((value) => {
        expect(screen.getByText(value)).toBeInTheDocument()
      })

      removingValues.forEach((value) => {
        const block = screen.getByText(value).parentElement as HTMLDivElement
        fireEvent.click(block.querySelector('button') as HTMLButtonElement)
        expect(screen.queryByText(value)).not.toBeInTheDocument()
      })
      expect(screen.getByText(values[2])).toBeInTheDocument()

      component.destroy()
    })

    it('delegates container to handle only buttons when deleting block', function () {
      const component = new MultipleValuesInput(document.querySelector('#mount') as HTMLElement, {
        values: ['one'],
      })
      const text = screen.getByText('one')
      fireEvent.click(text)
      expect(screen.getByText('one')).toBeInTheDocument()
      component.destroy()
    })

    it("doesn't paste if not clipboard data available", function () {
      const component = new MultipleValuesInput(document.querySelector('#mount') as HTMLElement)
      const input = screen.getByPlaceholderText('Enter item') as HTMLInputElement
      fireEvent.change(input, { target: { value: 'one' } })
      fireEvent.paste(input, {})
      expect(screen.queryByText('one')).not.toBeInTheDocument()
      expect(input.value).toEqual('one')
      component.destroy()
    })

    it('handles error throwing while pasting value', function () {
      const errorHandler = jest.spyOn(console, 'error').mockImplementationOnce(() => {})
      const component = new MultipleValuesInput(document.querySelector('#mount') as HTMLElement)
      const input = screen.getByPlaceholderText('Enter item') as HTMLInputElement
      const error = new Error('test')
      fireEvent.paste(input, {
        clipboardData: {
          getData() {
            throw error
          },
        },
      })
      expect(errorHandler).toHaveBeenCalled()
      component.destroy()
    })
  })

  describe('api', function () {
    it('getItems returns correct items collection', function () {
      const component = new MultipleValuesInput(document.querySelector('#mount') as HTMLElement)
      const input = screen.getByPlaceholderText('Enter item') as HTMLInputElement
      expect(component.getItems()).toEqual([])
      fireEvent.change(input, { target: { value: 'one' } })
      fireEvent.keyUp(input, { code: 'Enter' })
      expect(component.getItems()).toEqual([['one', { valid: true }]])
      fireEvent.change(input, { target: { value: 'two' } })
      fireEvent.keyUp(input, { code: 'Enter' })
      expect(component.getItems()).toEqual([
        ['one', { valid: true }],
        ['two', { valid: true }],
      ])
      component.destroy()
    })

    it('validator correctly checks whether item is valid', function () {
      const component = new MultipleValuesInput(document.querySelector('#mount') as HTMLElement, {
        values: ['two', 'three'],
        validator: (item) => item.length > 3,
      })
      const input = screen.getByPlaceholderText('Enter item') as HTMLInputElement
      expect(component.getItems()).toEqual([
        ['two', { valid: false }],
        ['three', { valid: true }],
      ])
      fireEvent.change(input, { target: { value: 'four' } })
      fireEvent.keyUp(input, { code: 'Enter' })
      expect(component.getItems()).toEqual([
        ['two', { valid: false }],
        ['three', { valid: true }],
        ['four', { valid: true }],
      ])
      fireEvent.change(input, { target: { value: 'one' } })
      fireEvent.keyUp(input, { code: 'Enter' })
      expect(component.getItems()).toEqual([
        ['two', { valid: false }],
        ['three', { valid: true }],
        ['four', { valid: true }],
        ['one', { valid: false }],
      ])
      component.destroy()
    })

    it('add provides ability to push new items', function () {
      const component = new MultipleValuesInput(document.querySelector('#mount') as HTMLElement, {
        validator: (item) => item.length > 3,
      })
      expect(component.getItems()).toEqual([])
      component.add('one')
      expect(component.getItems()).toEqual([['one', { valid: false }]])
      component.add(['two', 'three'])
      expect(component.getItems()).toEqual([
        ['one', { valid: false }],
        ['two', { valid: false }],
        ['three', { valid: true }],
      ])
      component.destroy()
    })

    describe('emails validator', function () {
      it('correctly validates each email block', function () {
        const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const correctEmails: string[] = [
          'john@miro.com',
          'mike@miro.com',
          'alexander@miro.com',
          'user.name+tag+sorting@example.com',
          '1234567890123456789012345678901234567890123456789012345678901234+x@example.com',
          'example-indeed@strange-example.inininini',
          'fully-qualified-domain@example.com',
          'disposable.style.email.with+symbol@example.com',
          'abc@example.co.uk',
        ]
        const incorrectEmails: string[] = [
          'invalid.email',
          'Abc.example.com',
          'A@b@c@example.com',
          'this is"not\\allowed@example.com',
        ]
        const validator = (email: string) => emailRegExp.test(email)
        const component = new MultipleValuesInput(document.querySelector('#mount') as HTMLElement, {
          validator,
        })
        component.add(correctEmails)
        component.add(incorrectEmails)
        ;[...correctEmails, ...incorrectEmails].forEach((email: string) => {
          expect(screen.getByText(email)).toBeInTheDocument()
        })
        const items = component.getItems()
        items.forEach(([item, properties]) => {
          if (correctEmails.includes(item)) {
            expect(properties.valid).toBeTruthy()
          } else {
            expect(properties.valid).toBeFalsy()
          }
        })
        component.destroy()
      })
    })
  })
})
