import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Images = new Mongo.Collection('images');


Meteor.methods({
    'images.insert'(text) {
        check(text, String);

        Images.insert({
            url: text,
        });
    },
});