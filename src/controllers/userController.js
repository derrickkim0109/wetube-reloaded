import User from "../models/User";

export const getJoin = (req, res) => {
    return res.render("join", { pageTitle: "Create Account" });
}
export const postJoin = async(req, res) => {
    const { username, email, password, password2, name, location } = req.body;
    const exists = await User.exists({ $or: [ { username }, { email } ] });

    if (exists) {
        return res.render("join", { 
            pageTitle,
            errorMessage: "This username/email is already taken.",
            })
    }

    await User.create({
        name,
        email,
        username,
        password,
        location,
    });
    return res.redirect("/login"); 
}

export const edit = (req, res) => res.send("Edit User");

export const remove = (req, res) => res.send("Remove User");

export const login = (req, res) => res.send("Login");

export const logout = (req, res) => res.send("Log Out");

export const see = (req, res) => res.send("See User");

// export default join;