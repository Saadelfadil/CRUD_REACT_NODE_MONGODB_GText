import { useState } from "react";
import axios from "axios"

const AddContact = () => {
    const [contactName, setContactName] = useState("");
    const [contactNumber, setContactNumber] = useState(0);
    const [contactAddress, setContactAddress] = useState("");

    const handleAddContact = async (e) => {
        e.preventDefault();
        const data = {contactName: contactName, contactNumber: contactNumber, contactAddress: contactAddress}
        try {
            const res = await axios.post("http://localhost:4000/api/users", data).then()
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
    };

    return (
    <div>
        <div className="flex flex-col items-center pt-6 sm:justify-center sm:pt-0">
            <div>
                <a href="/">
                    <h3 className="text-4xl font-bold text-gray-600">
                        Gtext Homes
                    </h3>
                </a>
            </div>
            <div className="w-screen px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                <form>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 undefined"
                        >
                            Contact Name
                        </label>
                        <div className="flex flex-col items-start">
                            <input
                                type="text"
                                name="name"
                                onChange={(prev) => setContactName(prev.target.value)}
                                className="block w-full h-10 p-2 mt-1 mb-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 undefined"
                        >
                            Contact Number
                        </label>
                        <div className="flex flex-col items-start">
                            <input
                                type="number"
                                name="number"
                                onChange={(prev) => setContactNumber(prev.target.value)}
                                className="block w-full mt-1 p-2 mb-4 h-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 undefined"
                        >
                            Contact Address
                        </label>
                        <div className="flex flex-col items-start">
                            <input
                                type="text"
                                name="name"
                                onChange={(prev) => setContactAddress(prev.target.value)}
                                className="block w-full mt-1 p-2 mb-4 h-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center mt-4">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                            onClick={handleAddContact}
                        >
                            Add Contact
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
};

export default AddContact;
