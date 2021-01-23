// Emails example:
const emailContainerNode = document.querySelector('#emails-input');
const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const emailsInput = new MultipleValuesInput(emailContainerNode, {
    values: ['john@miro.com', 'invalid.email', 'mike@miro.com', 'alexander@miro.com'],
    validator: item => emailRegExp.test(item),
    placeholder: 'add more people...',
})
const addEmailBtn = document.querySelector('#add-email')
const getEmailsCountBtn = document.querySelector('#get-emails-count')
addEmailBtn.addEventListener('click', () => {
    const hash = new Date().getTime().toString().slice(-5)
    const randomEmail = `ivan+${hash}@miro.com`

    emailsInput.add(randomEmail)
})
getEmailsCountBtn.addEventListener('click', () => {
    const items = emailsInput.getItems()
    const validItems = items.filter(([_, { valid }]) => valid)

    window.alert(`Valid emails count: ${validItems.length}`)
})

// Phone numbers example:
const ipAddressContainerNode = document.querySelector('#ip-addresses-input');
const ipAddressRegExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
const ipAddressInput = new MultipleValuesInput(ipAddressContainerNode, {
  values: ['192.168.1.1', '0.0.0.0', '115.42.150', '299.69.69.14'],
  validator: item => ipAddressRegExp.test(item),
  placeholder: 'enter IP address...',
})

// Dynamic example:
let input;
const dynamicNode = document.querySelector('#dynamic-input');
const toggleBtn = document.querySelector('#toggle-example')
toggleBtn.addEventListener('click', (event) => {

    if (input) {
    console.log('unmount!')
    event.target.textContent = 'Create'
      input.destroy()
      input = null
    } else {
      console.log('mount!')
      event.target.textContent = 'Destroy'
      input = new MultipleValuesInput(dynamicNode)
    }
})