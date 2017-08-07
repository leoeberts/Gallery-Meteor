import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Images = new Mongo.Collection('images');


Meteor.methods({
    'images.insert'(url, title, description) {
        var validURL = Match.Where(function(url) {
            check(url, String);
            var regexp = /(?:jpg|gif|png|jpeg)/g;
            return regexp.test(url);
        });
        check(url, validURL);

        check(title, String);
        check(true, title.length > 0);

        check(description, String);

        Images.insert({
            url: url,
            title: title,
            description: description,
            createAt: new Date(),
        });
    },
});