"use server";

export async function getUsers(){
    const res = await fetch(
        "https://jsonplaceholder.typicode.com/users?_start=0&_limit=5/"
    );

    return await res.json();
}