import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Images = new Mongo.Collection('images');


Meteor.methods({
    'images.insert'(url, title, description) {
        check(url, String);
        check(title, String);
        check(description, String);

        Images.insert({
            url: url,
            title: title,
            description: description,
            createAt: new Date(),
        });
    },
});