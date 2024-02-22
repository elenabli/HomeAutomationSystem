import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dummyUsers } from "../dummyData/dummyUsers";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Users.css";

const Users = () => {
  const [persons, setPersons] = useState(dummyUsers);
  const [editingId, setEditingId] = useState(null);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const { register, handleSubmit, formState: {errors, isSubmitted}, reset } = useForm();

  const deletePerson = (id) => {
    const newPersons = persons.filter((person) => person.id !== id);
    setPersons(newPersons);
  };

  const editPerson = (id) => {
    setEditingId(id);
  };

  const saveRole = (id, role) => {
    const newPersons = persons.map((person) =>
      person.id === id ? { ...person, role } : person
    );
    setPersons(newPersons);
    setEditingId(null);
  };

 const invitePerson = (user) => {
    console.log("Invitation sent to:", user.email);
    reset();
    setShowInvite(false);
    setInviteSent(true);
  }

  useEffect(() => {
    if (inviteSent) {
      setTimeout(() => {
        setInviteSent(false);
      }, 3000);
      return () => clearTimeout();
    }
  }, [inviteSent])
 
  return (
    <div className="users-container">
      <h2>Users</h2>
      <div className="users-box">
        {persons.map((user) => {
          const initials = user.name
            .split(" ")
            .slice(0, 2)
            .map((namePart) => namePart[0])
            .join("")
            .toUpperCase();
          return (
            <div key={user.id} className="user-info">
              <div className="circle-and-info">
                <div className="user-initials">{initials}</div>
                <div className="user-name">
                  <h4>
                    {user.name}
                    {editingId === user.id ? (
                      <select
                        value={user.role}
                        onChange={(e) => saveRole(user.id, e.target.value)}
                        className="role-choicebox"
                      >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    ) : (
                      <span className="user-role">{user.role}</span>
                    )}
                  </h4>
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="user-actions">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="user-icon, edit"
                  onClick={() => editPerson(user.id)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="user-icon, delete"
                  onClick={() => deletePerson(user.id)}
                />
              </div>
            </div>
          );
        })}
        {showInvite ? (
            <form onSubmit={handleSubmit(invitePerson)} className="invite-form">
               
                <input
                {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address"
                    }
                })}
                
                type="email"
                placeholder="Enter email"
                className="invite-input"
                />
                {isSubmitted && errors.email && <p className="error-message">{errors.email.message}</p>}
             
                <button type="submit" className="invite-button">Send</button>
                <button type="button" className="cancel-button" onClick={() => setShowInvite(false)}>Cancel</button>
            </form>
            ) : (
                inviteSent ? (
                    <p className="invite-sent">Invitation sent!</p>
                    
                ) : (
                    <div
                    className="invite"
                    onClick={() => setShowInvite(true)}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    Invite people
                </div>
                )

                  
                
           
        ) }
      </div>
    </div>
  );
};

export default Users;
