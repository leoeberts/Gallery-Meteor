import { Template } from 'meteor/templating';

import '../api/images.js';
import {Images} from "../api/images";

import './body.html';

Template.body.helpers( {
    images() {
        return Images.find({});
    }

        /*: [
        { url: 'https://iso.500px.com/wp-content/uploads/2014/08/2048-7.jpg', title: 'Milkway', description: 'Wid-angle milkway shot.'},
        { url: 'http://www.popphoto.com/sites/popphoto.com/files/styles/medium_1x_/public/import/2008/files/_images/How-To-Astrophotography-101.jpg?itok=6lrCLWxa', title: 'M31', description: 'Andromeda galaxy.'},
        { url: 'data:image/jpeg;base64,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', title: 'M104', description: 'Sombrero galaxy.'},
    ]*/
});


Template.body.events({
    'submit .new-image'(event) {
        event.preventDefault();

        const target = event.target;
        const url = target.url.value;
        Meteor.call('images.insert', url);

        target.url.value = '';
    },
});