import Video from "../models/Video"; 

export const home = async(req, res) => {
    const videos = await Video.find({}).sort({ createdAt:"desc" });
    return res.render("home", {pageTitle: "Home", videos});
};

export const watch = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    return res.render("watch", { pageTitle: video.title, video } );
}; 

export const getEdit = async(req, res) => {
    const { id } = req.params;
    // const id = req.params.id; 
    const video = await Video.findById(id); // Because I send the video object to the base.pug for rendering video
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    } 
    return res.render("edit", {pageTitle: `Edit ${video.title}`, video});
};

export const postEdit = async(req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;

    const video = await Video.exists({ _id: id }); // search by ID
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    } 
    await Video.findByIdAndUpdate(id, {
        title: title,
        description: description,
        hashtags: Video.formatHashtags(hashtags),
    })

    return res.redirect(`/videos/${id}`);
};
// export default trending;

export const getUpload = (req, res) => {
    // here we will add a video to the videos array.
    return res.render("upload", {pageTitle: "Upload Video"});
};

export const postUpload = async(req, res) => {
    // here we will add a video to the videos array.
    const { title, description, hashtags } = req.body;
    try {
        await Video.create({
            title: title,
            description: description,
            hashtags: Video.formatHashtags(hashtags),
        });
        return res.redirect("/");
    } catch (error) {
        return res.status(400).render("upload", {
            pageTitle: "Upload Video",
            errorMessage: error._message,
        });
    }
};

export const deleteVideo = async(req, res) => {
    
    const { id } = req.params;
    try {
        await Video.findByIdAndDelete(id);
        return res.redirect("/");
    } catch (error) {
        return res.status(400).render("delete", {
            pageTitle: "Delete Video", 
            errorMessage: error._message,
        })
    }
    return 
}

export const search = async(req, res) => {
    const { keyword } = req.query;
    let videos = [];

    if (keyword) {
        // search
        videos = await Video.find({
            title: {
                $regex: new RegExp(`${keyword}$`, "i"),
            },
        });
    }
    return res.render("search", {pageTitle:"Search", videos});
}