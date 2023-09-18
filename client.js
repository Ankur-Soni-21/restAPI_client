import axios from "axios";

//! CODE FOR CONTINOUS INTEGRATION
let shouldCountinue = true;

const mainloop = async () => {

    // try catch block
    try {
        console.log("Select an Option: ");
        console.log("1. Get all users");
        console.log("2. Get a user by id");
        console.log("3. Create a user");
        console.log("4. Update a user");
        console.log("5. Delete a user");
        console.log("6. Delete all users");

        //User Input
        const userInput = await getUserInput();

        //! REQUEST LOGIC HERE
        switch (userInput) {

            // CASE 1: GET ALL USERS
            case "1":
                console.log("Getting all users...");
                const getAllUsersResponse = await axios.get("http://localhost:8080/users");
                console.log('GET Response : ', getAllUsersResponse.data);
                break;

            // CASE 2: GET A USER BY ID
            case "2":
                console.log("Getting a user by id...");
                console.log("\nEnter user id: ");
                const id = await getUserInput();
                const getUserByIdResponse = await axios.get(`http://localhost:8080/users/${id}`);
                console.log('GET Response : ', getUserByIdResponse.data);
                break;

            // CASE 3: CREATE A USER
            case "3":
                console.log("Creating a user...");
                console.log("\nEnter username: ");
                const username = await getUserInput();
                console.log("\nEnter password: ");
                const password = await getUserInput();
                const createUserResponse = await axios.post(`http://localhost:8080/users`, { username, password });
                console.log('POST Response : ', createUserResponse.data);
                break;

            // CASE 4: UPDATE A USER
            case "4":
                console.log("Updating a user...");
                console.log("\nEnter user id: ");
                const idToUpdate = await getUserInput();
                console.log("\nEnter username: ");
                const usernameToUpdate = await getUserInput();
                console.log("\nEnter password: ");
                const passwordToUpdate = await getUserInput();
                const updateUserResponse = await axios.put(`http://localhost:8080/users/${idToUpdate}`, { usernameToUpdate, passwordToUpdate });
                console.log('PUT Response : ', updateUserResponse.data);
                break;

            //CASE 5 : DELETE A USER
            case "5":
                console.log("Deleting a user...");
                console.log("\nEnter user id: ");
                const idToDelete = await getUserInput();
                const deleteUserResponse = await axios.delete(`http://localhost:8080/users/${idToDelete}`);
                console.log('DELETE Response : ', deleteUserResponse);
                break;

            //CASE 6 : DELETE ALL USERS
            case "6":
                console.log("Deleting all users...");
                const deleteAllUsersResponse = await axios.delete(`http://localhost:8080/users`);
                console.log('DELETE Response : ', deleteAllUsersResponse);
                break;
        }
    }
    catch (error) {
        console.error("Error: ", error.message);
    }

    // if shouldCountinue is true, call mainloop again
    if (shouldCountinue) {
        console.log("\nPress 'Enter' to continue...");
        await getUserInput();
        mainloop();
    }
    else {
        console.log("Exiting...");
        process.exit(0);
    }
}

// ! LOGIC FOR STOPPING THE SCRIPT
const getUserInput = () => {
    return new Promise((resolve) => {
        process.stdin.once("data", (data) => {
            resolve(data.toString().trim());
        });
    });
}

mainloop();