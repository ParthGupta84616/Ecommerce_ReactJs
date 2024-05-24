export function createUser(userData) {
    return new Promise(async (resolve) => {
        // console.log(userData);
        const response = await fetch("http://127.0.0.1:8080/users",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        var data = await response.json();
        // console.log(data)
        data = data.user
        resolve({ data });
    });
}

export function checkUser(loginInfo) {
    // console.log(loginInfo);
    return new Promise(async (resolve) => {
        // console.log(loginInfo);
        const email = loginInfo.email;
        const password = loginInfo.password;
        const response = await fetch("http://127.0.0.1:8080/users?email="+email);
        var data = await response.json();
        // data=list(data)
        if(data.data){
            if(data.data.password ===  password){
                resolve({ data : data.data });
                console.log(data.data.password)
            }
            else{
                resolve({ message : "Invalid credentials" });
            }
        }else{
            resolve({ message : "User Not Found" });
        }
        // console.log(data)
        // resolve({ data });
    });
}
export function LogOutUser(userId) {
    return new Promise(async (resolve) => {
        resolve({ data: " Success " });
    });
}
export function forgetPassword(email) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://127.0.0.1:8080/users",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(email)
        });
        var data = await response.json();
        data = data.message
        resolve({ data });
    });
}