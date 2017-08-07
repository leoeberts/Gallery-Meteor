import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import {Images} from "../api/images.js";

import './body.html';
import './image.js';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.body.helpers( {
    images() {
        if (Template.instance().state.get('hideBrokenImages')) {
            return Images.find({url: {$regex: "(?:jpg|gif|png|jpeg)"}});
        }
        return Images.find({});
    },
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
    'change .hide-broken-images input'(event, instance) {
        instance.state.set('hideBrokenImages', event.target.checked);
    }
});