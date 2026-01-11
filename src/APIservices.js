export const getContacts = async (dispatch) => {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/yisus/contacts`)
    if (!response.ok) {
        createAgenda()
        return
    }
    const data = await response.json()
    dispatch({ type: 'set_contacts', payload: data.contacts })

}

export const createAgenda = async (dispatch) => {
    await fetch(`https://playground.4geeks.com/contact/agendas/yisus`, {
        method: "POST"
    })
}

export const createContact = async (contact, navigate, dispatch) => {
    await fetch(`https://playground.4geeks.com/contact/agendas/yisus/contacts`, {
        method: "POST",
        body: JSON.stringify(contact),
        headers: {
            "Content-Type": "application/json"
        }
    })
    
    await getContacts(dispatch)
    navigate("/")
   
}

export const editContact = async (contact, navigate, dispatch) => {
    await fetch(`https://playground.4geeks.com/contact/agendas/yisus/contacts/${contact.id}`, {
        method: "PUT",
        body: JSON.stringify(contact),
        headers: {
            "Content-Type": "application/json"
        }
    })
    
    await getContacts(dispatch)
    navigate("/")
}

export const deleteContact = async (contact, dispatch) => {
    await fetch(`https://playground.4geeks.com/contact/agendas/yisus/contacts/${contact.id}`, {
        method: "DELETE"
    })

   
    getContacts(dispatch)
    
}