import Video from "../models/Video"; 

/*

Video.find( {}, (error, videos) => {
return res.render("home", {pageTitle: "Home", videos: [] });
});

*/
export const home = async(req, res) => {
    const videos = await Video.find({});
    return res.render("home", {pageTitle: "Home", videos});
};

export const watch = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);

    return res.render("watch", {pageTitle: video.title, video});
}; 

export const getEdit = (req, res) => {
    const { id } = req.params;
    // const id = req.params.id; 
    res.render("edit", {pageTitle: `Editing:`});
};

export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
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
            hashtags: hashtags.split(",").map(word => `${word}`),
        });
        return res.redirect("/");
    } catch (error) {
        return res.render("upload", {
            pageTitle: "Upload Video",
            errorMessage: error._message,
        });
    }
};