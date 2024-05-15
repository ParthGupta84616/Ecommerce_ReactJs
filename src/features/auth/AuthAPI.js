export function createUser(userData) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/users",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        resolve({ data });
    });
}
export function checkUser(loginInfo) {
    // console.log(loginInfo);
    return new Promise(async (resolve) => {
        const email = loginInfo.email;
        const password = loginInfo.password;
        const response = await fetch("http://localhost:8080/users?email="+email);
        const data = await response.json();
        // console.log(data)
        if(data.length){
            if(data[0].password ===  password){
                resolve({ data : data[0] });
            }
            else{
                resolve({ message : "Invalid credentials" });
            }
        }else{
            resolve({ message : "User Not Found" });
        }
        resolve({ data });
    });
}

export function LogOutUser(userId) {
    return new Promise(async (resolve) => {
        resolve({ data: " Success " });
    });
}