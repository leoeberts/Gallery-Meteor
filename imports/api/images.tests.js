import {Meteor} from 'meteor/meteor';
import {Random} from 'meteor/random';
import {assert} from 'meteor/practicalmeteor:chai';

import {Images} from './images.js';

if (Meteor.isServer) {
    describe('Add images', () => {
        const userId = Random.id();
        const addImage = Meteor.server.method_handlers['images.insert'];

        let url = 'http://test.com/imageAdded.jpg';
        let title = 'Test image';
        let description = 'Some description';
        let privateImage = false;

        describe('Adding images', () => {
            beforeEach(() => {
                Images.remove({});
            });

            it('can add public image', () => {
                addImage.apply({userId}, [url, title, description, privateImage]);

                assert.equal(Images.find({
                    url: url,
                    title: title,
                    description: description,
                    privateImage: privateImage,
                    owner: userId
                }).count(), 1);
            });

            it('can add private image', () => {
                privateImage = true;

                addImage.apply({userId}, [url, title, description, privateImage]);

                assert.equal(Images.find({
                    url: url,
                    title: title,
                    description: description,
                    privateImage: privateImage,
                    owner: userId
                }).count(), 1);
            });
        });

        describe('Validation', () => {
            beforeEach(() => {
                Images.remove({});
            });

            it('can add an image with an empty description', () => {
                description = '';

                addImage.apply({userId}, [url, title, description, privateImage]);

                assert.equal(Images.find({
                    url: url,
                    title: title,
                    description: description,
                    privateImage: privateImage,
                    owner: userId
                }).count(), 1);
            });

            it('can\'t add an image with an undefined description', () => {
                description = undefined;

                try {
                    addImage.apply({userId}, [url, title, description, privateImage]);
                    assert.fail('No exception threw when user tried to add an image with an undefined description.');
                } catch (e) {
                    assert.equal(Images.find().count(), 0);
                }
            });

            it('can\'t add an image URL that not contains jpg, gif, png, jpeg', () => {
                url = 'http://test.com/imageAdded.test';

                try {
                    addImage.apply({userId}, [url, title, description, privateImage]);
                    assert.fail('No exception threw when user tried to add an image with an invalid URL.');
                } catch (e) {
                    assert.equal(Images.find().count(), 0);
                }
            });

            it('can\'t add an image without title', () => {
                title = '';

                try {
                    addImage.apply({userId}, [url, title, description, privateImage]);
                    assert.fail('No exception threw when user tried to add an image without title.');
                } catch (e) {
                    assert.equal(Images.find().count(), 0);
                }
            });

            it('can\'t add an image without informing it\'s privacy', () => {
                privateImage = undefined;

                try {
                    addImage.apply({userId}, [url, title, description, privateImage]);
                    assert.fail('No exception threw when user tried to add an image without informing it\'s privacy.');
                } catch (e) {
                    assert.equal(Images.find().count(), 0);
                }
            });
        });
    });

    describe('Remove images', () => {
        const userId = Random.id();
        const deleteImage = Meteor.server.method_handlers['images.remove'];
        let imageId;

        describe('Public images', () => {
            beforeEach(() => {
                Images.remove({});
                imageId = insertImageDirect(userId, false);
            });

            it('can delete owned public image', () => {
                deleteImage.apply({userId}, [imageId]);
                assert.equal(Images.find().count(), 0);
            });

            it('can\'t delete another user public image', () => {
                let anotherUserId = Random.id();

                try {
                    deleteImage.apply({anotherUserId}, [imageId]);
                    assert.fail('No exception threw when user tried to delete another user public image.');
                } catch (e) {
                    assert.equal(Images.find().count(), 1);
                }
            });
        });

        describe('Private images', () => {
            beforeEach(() => {
                Images.remove({});
                imageId = insertImageDirect(userId, true);
            });

            it('can delete owned private image', () => {
                deleteImage.apply({userId}, [imageId]);
                assert.equal(Images.find().count(), 0);
            });

            it('can\'t delete another user private image', () => {
                let anotherUserId = Random.id();

                try {
                    deleteImage.apply({anotherUserId}, [imageId]);
                    assert.fail('No exception threw when user tried to delete another user private image.');
                } catch (e) {
                    assert.equal(Images.find().count(), 1);
                }
            });
        });
    });
}

function insertImageDirect(userId, privateImage) {
    return Images.insert({
        url: 'http://test.com/image.jpg',
        title: 'test image',
        privateImage: privateImage,
        createdAt: new Date(),
        owner: userId,
        username: 'tmeasday',
    });
}