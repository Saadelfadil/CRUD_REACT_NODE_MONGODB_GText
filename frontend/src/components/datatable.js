import { useState } from "react"
import axios from "axios"

const Table = (props) => {

    const [updateState, setUpdateState] = useState();
    const [contactName, setContactName] = useState("");
    const [contactNumber, setContactNumber] = useState(0);
    const [contactAddress, setContactAddress] = useState("");
    const [search, setSearch] = useState("");

    const updateUser = async (user) => {
        const data = {contactName: contactName !== "" ? contactName : user.contactName,
        contactNumber: contactNumber !== 0 ? contactNumber : user.contactNumber,
        contactAddress: contactAddress !== "" ? contactAddress : user.contactAddress}

        try {
            const res = await axios.put(`http://localhost:4000/api/users/${user._id}`, data).then()
            .then((data) => {
                console.log('Success:', data);
                window.location.reload(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            console.log("RES: ", res)
        } catch (e) {
            console.log(e)
        }
    }

    const handleDeleteContact = async (id) => {

        try {
            const res = await axios.delete(`http://localhost:4000/api/users/${id}`).then()
            .then((data) => {
                console.log('Success:', data);
                window.location.reload(false);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            console.log("RES: ", res)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="py-3 pl-2 ">
                    <div className="relative w-80">
                        <label htmlFor="hs-table-search" className="sr-only">
                            Search
                        </label>
                        <input
                            type="text"
                            name="hs-table-search"
                            id="hs-table-search"
                            onChange={(e) => setSearch((prev) => prev = e.target.value)}
                            className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-200 focus:ring-blue-200 dark:bg-gray-100 dark:border-gray-200 dark:text-black"
                            placeholder="Search by name"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <svg
                                className="h-3.5 w-3.5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="p-1.5 w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-white">
                                <tr>
                                    <th
                                        scope="col"
                                        className="flex items-center px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        Contact Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        <span className="inline-flex items-center">
                                            Contact Number
                                        </span>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                        <span className="inline-flex items-center">
                                            Contact Address
                                        </span>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                    >
                                        Edit
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                    >
                                        Delete
                                    </th>
                                </tr>
                            </thead>

                            {
                                props.usersData
                                .filter((usr) =>
                                {
                                    return search.toLowerCase() === '' ? usr : usr.contactName.toLowerCase().includes(search);
                                })
                                .map((user) => 
                                {
                                    return (
                                    updateState === user._id ? 
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                            <input type="text" defaultValue={user.contactName} name="name" onChange={(e) => setContactName(() => e.target.value)} className="text-sm  p-2 rounded-md dark:bg-gray-100 dark:text-black"  ></input>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                <input type="number"  defaultValue={user.contactNumber} name="number" onChange={(e) => setContactNumber(() => e.target.value)} className="text-sm p-2 rounded-md dark:bg-gray-100 dark:text-black" ></input>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                <input type="text" defaultValue={user.contactAddress} name="address" onChange={(e) => setContactAddress(() => e.target.value)} className="text-sm p-2 rounded-md dark:bg-gray-100 dark:text-black" ></input>

                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                <button
                                                    className="text-green-500 hover:text-green-700"
                                                    onClick={() => updateUser(user)}
                                                    >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                </tbody> :
                                <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                            {user.contactName}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            {user.contactNumber}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                {user.contactAddress}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                <button
                                                    className="text-green-500 hover:text-green-700"
                                                    onClick={() => setUpdateState((prev) => prev = user._id)}
                                                    >
                                                    Edit
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                <button
                                                    onClick={() => handleDeleteContact(user._id)}
                                                    className="text-red-500 hover:text-red-700"
                                                    >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                </tbody>
                                )
                                })
                            }

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;