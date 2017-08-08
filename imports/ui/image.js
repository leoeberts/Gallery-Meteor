import {Template} from 'meteor/templating';

import {Images} from '../api/images.js';

import './image.html';

Template.imageThumb.events({
    'click .delete'() {
        Images.remove(this._id);
    },
});
