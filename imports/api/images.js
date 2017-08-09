import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Images = new Mongo.Collection('images');

Meteor.methods({
    'images.insert'(url, title, description, privateImage) {
        checkUserLoggedIn();
        check(url, isUrlAnImage());
        check(title, String);
        check(true, title.length > 0);
        check(description, String);

        Images.insert({
            url: url,
            title: title,
            description: description,
            privateImage: privateImage,
            createAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
    },
    'images.remove'(imageId) {
        check(imageId, String);
        Images.remove(imageId);
    },
});

function checkUserLoggedIn() {
    if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized')
    }
}

function isUrlAnImage() {
    return Match.Where(function (url) {
        check(url, String);
        let regexp = /(?:jpg|gif|png|jpeg)/g;
        return regexp.test(url);
    });
}

