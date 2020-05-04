var posts = [
    {
    content:"Today is 30 degree"
    },
    {
    content:"Tomorrow is going to be hotter"
    },
    {
    content: "At weekend the temperature will reach its highest"
    }]

    exports.showPosts = (req, res) => {
        res.render("personal", {
        newPost: posts ,
        page: "personal"
        });
       };
       