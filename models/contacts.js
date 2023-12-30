const fs = require('node:fs/promises')
const path = require('node:path')
const crypto = require("node:crypto")
const Joi = require("joi");

const filePath = path.join(__dirname, 'contacts.json')

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

async function readContacts() {
  const data = await fs.readFile(filePath, { encoding: "utf-8" })
  return JSON.parse(data)
}

async function writeContacts(contacts) {
  const data = await fs.writeFile(filePath, JSON.stringify(contacts, undefined, 2))
  return data
}

const listContacts = async () => {
  const contacts = await readContacts()
  return contacts
}

const getContactById = async (id) => {
  const contacts = await readContacts()
  const contact = contacts.find((contact) => contact.id === id)
  return contact || null
}

const removeContact = async (id) => {
  const contacts = await readContacts()
  const index = contacts.findIndex((contact) => contact.id === id)
  if (index === -1) return null
  const newContacts = [...contacts.slice(0, index), ...contacts.slice(index + 1)]
  await writeContacts(newContacts)
  return contacts[index]
}

const addContact = async (body) => {
  const contacts = await readContacts()
  const newContact = { id: crypto.randomUUID(), ...body }
  contacts.push(newContact)
  await writeContacts(contacts)
  return newContact
}

const updateContact = async (id, body) => {
  const contacts = await readContacts()
  const contactIndex = contacts.findIndex((contact) => contact.id === id)
  if (contactIndex === -1) return null
  contacts[contactIndex] = { id: id, ...body }
  await writeContacts(contacts)
  return contacts[contactIndex]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  contactSchema,
}
