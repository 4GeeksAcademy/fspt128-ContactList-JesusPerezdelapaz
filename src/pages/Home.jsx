import "./Home.css";
import { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { createContact, getContacts } from "../APIservices.js";
import { ContactCard } from "../components/ContactCard.jsx";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const [contact, setContact] = useState({
		"name": "",
		"phone": "",
		"email": "",
		"address": ""
	})


	useEffect(() => {
		getContacts(dispatch)
	}, [])

	return (

		<div className="container mt-5">
			<div className="contacts">
				{store.contacts.length > 0 ? (
					store.contacts.map((contact) => (
						<div key={contact.id}>
							<ContactCard contact={contact} />
						</div>
					))
				) : (
					<div className="container card col-12 col-sm-10 col-md-8 col-lg-6 mx-auto text-center py-4">
						<h3 className="card-title mb-0">No tienes contactos todavía </h3>
					</div>
				)}
			</div>
		</div>



	);
}; 