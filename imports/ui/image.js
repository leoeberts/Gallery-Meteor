import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

import './image.html';

Template.imageThumb.events({
    'click .delete'() {
        Meteor.call('images.remove', this._id);
    },
});

