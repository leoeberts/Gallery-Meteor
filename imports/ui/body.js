import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';

import {Images} from "../api/images.js";

import './body.html';
import './image.js';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.body.helpers({
    images() {
        if (Template.instance().state.get('showPrivateImages')) {
            return Images.find({privateImage: true}, {sort: {createdAt: 1}});
        }

        if (Meteor.userId()) {
            return Images.find({}, {sort: {createdAt: 1}});
        } else {
            return Images.find({privateImage: false}, {sort: {createdAt: 1}});
        }
    },
});

Template.body.events({
    'submit .new-image'(event) {
        event.preventDefault();

        const target = event.target;
        Meteor.call('images.insert',
            target.url.value,
            target.title.value,
            target.description.value,
            target.privateImage.checked);

        target.url.value = '';
        target.title.value = '';
        target.description.value = '';
        target.privateImage.checked = false;
        target.addModal.checked = false;
    },
    'change .show-only-private-images input'(event, instance) {
        instance.state.set('showPrivateImages', event.target.checked);
    }
});
