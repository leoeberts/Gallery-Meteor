import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Images = new Mongo.Collection('images');

if (Meteor.isServer) {
    Meteor.publish('images', function imagesPublication() {
        return Images.find({
            $or: [
                {privateImage: {$ne: true}},
                {owner: this.userId},
            ],
        });
    });
}

Meteor.methods({
    'images.insert'(url, title, description, privateImage) {
        checkUserLoggedIn(this.userId);
        check(isUrlAnImage(url), true);
        check(title, String);
        check(title.length > 0, true);
        check(description, String);
        check(privateImage, Boolean);

        Images.insert({
            url: url,
            title: title,
            description: description,
            privateImage: privateImage,
            createAt: new Date(),
            owner: this.userId,
            username: this.userId.username,
        });
    },
    'images.remove'(imageId) {
        check(imageId, String);
        checkAuthorization(imageId, this.userId);
        Images.remove(imageId);
    },
});

function checkUserLoggedIn(userId) {
    if (!userId) {
        throw new Meteor.Error('not-authorized')
    }
}

function isUrlAnImage(url) {
    let regexp = /(?:jpg|gif|png|jpeg)/g;
    return regexp.test(url);
}

function checkAuthorization(imageId, userId) {
    const image = Images.findOne(imageId);
    if (image.owner !== userId) {
        throw new Meteor.Error('not-authorized');
    }
}

