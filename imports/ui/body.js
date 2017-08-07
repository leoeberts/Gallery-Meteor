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
        Meteor.call('images.insert', target.url.value, target.title.value, target.description.value);

        target.url.value = '';
        target.title.value = '';
        target.description.value = '';
        target.addModal.checked = false;
    },
});