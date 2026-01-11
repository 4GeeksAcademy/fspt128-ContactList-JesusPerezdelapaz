import { Link, useNavigate } from "react-router-dom"
import { deleteContact } from "../APIservices";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "./ContactCard.css";

export const ContactCard = ({ contact }) => {

    const navigate = useNavigate()

     const { store, dispatch } = useGlobalReducer()

    const handleClickDelete = (e) => {
        e.preventDefault();

        deleteContact(contact, dispatch)
    }

return (
  <>
 <div className="container card col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">

  <div className="card-content">

    
    <div className="avatar">
      <img
        src="https://i.pinimg.com/736x/e0/48/a7/e048a77430473c34e9adce766db14902.jpg" 
        alt="Contact avatar"
      />
    </div>

   
    <div className="card-info">
      <h3 className="card-text">Name: {contact.name}</h3>
      <p className="card-text">Phone: {contact.phone}</p>
      <p className="card-text">Email: {contact.email}</p>
      <p className="card-text">Address: {contact.address}</p>
    </div>

  </div>

  
  <p
    className="delete"
    data-bs-toggle="modal"
    data-bs-target={`#modal-${contact.id}`}
    aria-label={`Delete ${contact.name}`}
  >
    <i className="fa-solid fa-trash-can"></i>
  </p>

  <Link to={`/edit/${contact.id}`}>
    <p className="edit">
      <i className="fa-solid fa-pen-to-square"></i>
    </p>
  </Link>
</div>

    <div
      className="modal fade"
      id={`modal-${contact.id}`}
      tabIndex="-1"
      aria-labelledby={`modalLabel-${contact.id}`}
      // aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title" id={`modalLabel-${contact.id}`}>
              Eliminar contacto
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            ¿Seguro que quieres eliminar a <strong>{contact.name}</strong>?
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleClickDelete}
              className="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Eliminar
            </button>
          </div>

        </div>
      </div>
    </div>
  </>
);
}