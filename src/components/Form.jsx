import "./Form.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { createContact, editContact } from "../APIservices";

export const Form = () => {

  const { store, dispatch } = useGlobalReducer()

  const { id } = useParams()

  const navigate = useNavigate()

  const [isEditing, setisEditing] = useState(false)

  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  })

  const handlerChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    })
    console.log(contact);

  }

  const handlerSubmit = (e) => {
    e.preventDefault();

    if (!contact.name || !contact.phone || !contact.email || !contact.address) {
      alert("rellena todos los campos")
      return;
    }

    if (isEditing) {
      editContact(contact, navigate, dispatch)
    } else {
      createContact(contact, navigate, dispatch)

    }
  }

  const contactToEdit = () => {
    const contactFinded = store.contacts.find(contact => {
      console.log(contact.id, id);

      return contact.id === Number(id)
    })
    setContact(contactFinded);

  }

  useEffect(() => {
    if (id) {
      setisEditing(true)
      contactToEdit()
    } else {
      setisEditing(false)
    }

  }, [])

  return (
    <form className="container form-card col-11 col-md-6 mt-4" onSubmit={handlerSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nombre:
        </label>
        <input
          name="name"
          type="text"
          className="form-control"
          id="name"
          value={contact.name}
          onChange={handlerChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Teléfono:
        </label>
        <input
          name="phone"
          type="text"
          className="form-control"
          id="phone"
          value={contact.phone}
          onChange={handlerChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          name="email"
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          value={contact.email}
          onChange={handlerChange}
        />
        <div id="emailHelp" className="form-text">
          No compartiremos tu Email.
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          Dirección:
        </label>
        <input
          name="address"
          type="text"
          className="form-control"
          id="address"
          value={contact.address}
          onChange={handlerChange}
        />
      </div>

      <button type="submit" className="btn btn-primary form-save-btn">
        Guardar
      </button>
    </form>
  )
}