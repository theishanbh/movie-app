export async function registerUser(
  username: string,
  email: string,
  password: string
) {
  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const result = await res.json();
    console.log("ran", result);
    return result;
  } catch (error) {
    return error;
  }
}

export async function signInUser(email: string, password: string) {
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function signOutUser() {
  try {
    const res = await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function refreshToken() {
  try {
    const res = await fetch("http://localhost:5000/api/auth/refreshtoken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}
