const fakeUser = {
    userName: "Derrick",
    loggedIn: false,
}

let videos = [
    {
        title: "First Video",
        rating:5,
        comments:2,
        createAt: "2 minutes ago",
        views:59,
        id:1
    },
    {
        title: "Second Video",
        rating:5,
        comments:2,
        createAt: "2 minutes ago",
        views:59,
        id:2
    },
    {
        title: "Third Video",
        rating:5,
        comments:2,
        createAt: "2 minutes ago",
        views:1,
        id:3
    }
];

export const trending = (req, res) => {
    return res.render("home", {pageTitle: "Home", fakeUser : fakeUser, videos});
};

export const watch = (req, res) => {
    const { id } = req.params;
    // const id = req.params.id; 
    const video = videos[id - 1]
    return res.render("watch", {pageTitle: `Watching  ${video.title}`, video});
}; 

export const edit = (req, res) => res.render("edit", {pageTitle: "Edit"});

export const search = (req, res) => res.send("Search");

export const deleteVideo = (req, res) => res.send("Delete Video");

export const upload = (req, res) => res.send("Upload");
// export default trending;