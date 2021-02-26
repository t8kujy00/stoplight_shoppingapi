const Validator = require('fastest-validator');
const models = require('../models');

/** function to create a post */
function save(req, res){
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
        location: req.body.location,
        price: req.body.price,
        delivery: req.body.delivery,
        contact: req.body.contact,
        userId: req.userData.userId

    }
/** user must enter valid information */
    const schema = {
        title: {type:"string", optional: false, max: "100"},
        content: {type:"string", optional: false, max: "500"},
        categoryId: {type:"number", optional: false},
        location: {type:"string", optional: false, max: "100"},
        price: {type:"string", optional: false, max: "50"},
        delivery: {type:"string", optional: false, max: "50"},
        contact: {type:"string", optional: false, max: "200"},
    }

    const v = new Validator();
    const validationResponse = v.validate(post, schema);

    if(validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed!",
            errors: validationResponse
        })
    }

    models.Post.create(post).then(result => {
        res.status(201).json({
            message: "Post created successfully",
            post: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });

    });
}
/** shows post by id*/
function show(req, res){
    const id = req.params.id;

    models.Post.findByPk(id).then(result => {
        if(result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: "Post not found!"
        })
    }

        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
             message: "Something went wrong!"
        })
    });
}
/** shows all posts created */
function index(req, res){
    models.Post.findAll().then(result =>{
        res.status(200).json(result);
    }).catch(error =>{
        res.status(500).json({
            message: "Something went wrong!"
       });
    })
}
/** function to modify post made */
function update(req, res){
    const id = req.params.id;
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
        location: req.body.location,
        price: req.body.price,
        delivery: req.body.delivery,
        contact: req.body.contact,
    }
    /** userid needs to match to be able to modify */
    const userId = req.userData.userId;
/** user must enter valid information to be able to modify */
    const schema = {
        title: {type:"string", optional: false, max: "100"},
        content: {type:"string", optional: false, max: "500"},
        categoryId: {type:"number", optional: false},
        location: {type:"string", optional: false, max: "100"},
        price: {type:"string", optional: false, max: "50"},
        delivery: {type:"string", optional: false, max: "50"},
        contact: {type:"string", optional: false, max: "200"},
    }

    const v = new Validator();
    const validationResponse = v.validate(updatedPost, schema);

    if(validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed!",
            errors: validationResponse
        })
    }

    models.Post.update(updatedPost, {where: {id:id, userId}}).then(result =>{
        res.status(200).json({
            message: "Post updated successfully",
            post: updatedPost
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
    });
})

}
/** function to delete messages */
function destroy(req, res){
    const id = req.params.id;
    /** only user who made the post can delete */
    const userId = req.userData.userId;

    models.Post.destroy({where:{id:id, userId:userId}}).then(result => {
        res.status(200).json({
            message: "Post deleted successfully",
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
    });
}
)
}

module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy
}