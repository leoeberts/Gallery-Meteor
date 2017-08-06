import { Template } from 'meteor/templating';

import {Images} from "../api/images.js";

import './body.html';
import './image.js';

Template.body.helpers( {
    images() {
        return Images.find({});
    }
});


Template.body.events({
    'submit .new-image'(event) {
        event.preventDefault();

        const target = event.target;
        const url = target.url.value;
        Meteor.call('images.insert', url);

        target.url.value = '';
        target.addModal.checked = false;
    },
});