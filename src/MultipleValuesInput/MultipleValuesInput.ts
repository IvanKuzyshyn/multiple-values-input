type ItemProperties = { valid: boolean }

type Items = Map<string, ItemProperties>

type ItemsCollection = Array<[string, ItemProperties]>

type Validator = (item: string) => boolean

type Options = {
  values: string[]
  validator: Validator
  placeholder: string,
  onChange: (items: ItemsCollection) => any,
}

const PREFIX = 'MultipleValuesInput'
const classes = {
  HIDDEN_ROOT: `${PREFIX}__root--hidden`,
  CONTAINER: `${PREFIX}__container`,
  ITEM: `${PREFIX}__item`,
  BLOCK: `${PREFIX}__block`,
  INPUT: `${PREFIX}__input`,
  BLOCK_VALID: `${PREFIX}__block--valid`,
  BLOCK_INVALID: `${PREFIX}__block--invalid`,
}

const DEFAULT_OPTIONS: Options = {
  values: [],
  validator: (item) => item.trim().length > 0,
  placeholder: 'Enter item',
  onChange: () => {},
}

export class MultipleValuesInput {
  private readonly root: HTMLElement
  private readonly input: HTMLInputElement
  private readonly container: HTMLDivElement

  private items: Items = new Map([])
  private options: Options

  constructor(root: HTMLElement, options: Partial<Options> = {}) {
    this.root = root
    this.options = { ...DEFAULT_OPTIONS, ...options }
    this.container = this.createContainerElement()
    this.input = this.createInputElement()

    this.mount()
  }

  public getItems(): ItemsCollection {
    return Array.from(this.items.entries())
  }

  public add(value: string | string[]) {
    const items = this.setItemsByValue(value)
    this.appendBlockForItems(items)
    this.triggerOnChangeHandler()
  }

  public destroy() {
    this.unmount()
  }

  private mount() {
    if (!this.root.parentNode) {
      throw new Error('No parent node defined! Make sure you have not selected document root as input root!')
    }
    const items = this.setItemsByValue(this.options.values)
    this.root.classList.add(classes.HIDDEN_ROOT)
    this.root.dataset.testid = 'root'

    this.root.parentNode.insertBefore(this.container, this.root.nextSibling)
    this.container.appendChild(this.input)
    this.container.appendChild(this.root)
    this.appendBlockForItems(items)
  }

  private unmount() {
    this.container.removeEventListener('click', this.handleBlockRemove)
    this.input.removeEventListener('keyup', this.handleKeyup)
    this.input.removeEventListener('focusout', this.handleFocusout)
    this.input.removeEventListener('paste', this.handlePaste)
    const parent = this.container.parentNode
    this.root.classList.remove(classes.HIDDEN_ROOT)
    parent?.appendChild(this.root)
    parent?.removeChild(this.container)
  }

  private createContainerElement(): HTMLDivElement {
    const container = document.createElement('div')
    container.classList.add(classes.CONTAINER)
    container.dataset.testid = 'container'
    container.addEventListener('click', this.handleBlockRemove.bind(this))

    return container
  }

  private createInputElement(): HTMLInputElement {
    const input = document.createElement('input')
    input.classList.add(classes.INPUT)
    input.classList.add(classes.ITEM)
    input.type = 'text'
    input.placeholder = this.options.placeholder
    input.addEventListener('keyup', this.handleKeyup.bind(this))
    input.addEventListener('focusout', this.handleFocusout.bind(this))
    input.addEventListener('paste', this.handlePaste.bind(this))

    return input
  }

  private createBlockElement(value: string, properties: ItemProperties): HTMLDivElement {
    const block = document.createElement('div')
    const text = document.createElement('span')
    const removeBtn = document.createElement('button')

    block.classList.add(classes.ITEM)
    block.classList.add(classes.BLOCK)
    block.classList.add(properties.valid ? classes.BLOCK_VALID : classes.BLOCK_INVALID)
    block.dataset.value = value

    text.textContent = value

    removeBtn.innerHTML = '&times;'
    removeBtn.type = 'button'

    block.appendChild(text)
    block.appendChild(removeBtn)

    return block
  }

  private appendBlockForItems(items: ItemsCollection): void {
    items.forEach(([value, properties]) => {
      const block = this.createBlockElement(value, properties)
      this.input.parentNode?.insertBefore(block, this.input)
      this.container.scrollTop = this.container.scrollHeight
    })
  }

  private formatInputValue(item: string): string {
    return item.trim().replace(/,/g, '')
  }

  private getItemProperties(value: string): ItemProperties {
    return {
      valid: this.options.validator(value)
    }
  }

  private setItemsByValue(value: string | string[]): ItemsCollection {
    const values = Array.isArray(value) ? value : [value]
    const formattedValues = values.map((value) => this.formatInputValue(value)).filter(Boolean)

    if (formattedValues.length === 0) {
      return []
    }

    const items: ItemsCollection = []
    formattedValues.forEach((value) => {
      if (this.items.has(value)) {
        return
      }

      const properties = this.getItemProperties(value)
      this.items.set(value, properties);
      items.push([value, properties])
    })

    return items
  }

  private resetInputValue(): void {
    this.input.value = ''
  }

  private handleKeyup(event: KeyboardEvent): void {
    if (!['Enter', 'Comma'].includes(event.code)) {
      return
    }

    const items = this.setItemsByValue(this.input.value)
    this.appendBlockForItems(items)
    this.triggerOnChangeHandler()
    this.resetInputValue()
  }

  private handleFocusout(): void {
    if (this.input.value.length === 0) {
      return
    }

    const items = this.setItemsByValue(this.input.value)
    this.appendBlockForItems(items)
    this.triggerOnChangeHandler()
    this.resetInputValue()
  }

  private handlePaste(event: ClipboardEvent): void {
    event.preventDefault()

    if (!event.clipboardData) {
      return
    }

    try {
      const data = event.clipboardData.getData('text')
      const values = data.split(',')
      const items = this.setItemsByValue(values)
      this.appendBlockForItems(items)
      this.triggerOnChangeHandler()
      this.resetInputValue()
    } catch (e) {
      console.error(e)
    }
  }

  private handleBlockRemove(event: MouseEvent): void {
    const target = event.target as HTMLElement

    if (target.tagName.toLowerCase() !== 'button') {
      return
    }

    const block = target.parentNode as HTMLElement
    const value = block.dataset.value

    if (block && value) {
      this.items.delete(value)
      this.container.removeChild(block)
      this.triggerOnChangeHandler()
    }
  }

  private triggerOnChangeHandler() {
    this.options.onChange(this.getItems())
  }
}
