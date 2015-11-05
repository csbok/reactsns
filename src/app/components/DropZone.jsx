'use strict';

const React = require('react');
const DropzoneComponent = require('react-dropzone-component');

const componentConfig = {
    allowedFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: 'http://localhost:8080/upload', //'/uploadHandler'
};

/**
 * For a full list of possible configurations,
 * please consult
 * http://www.dropzonejs.com/#configuration
 */
const djsConfig = {
    addRemoveLinks: true,
};

/**
 * If you want to attach multiple callbacks, simply
 * create an array filled with all your callbacks.
 * @type {Array}
 */
const callbackArray = [
    function () {
        console.log('Look Ma, I\'m a callback in an array!');
    },
    function () {
        console.log('Wooooow!');
    },
];

/**
 * Simple callbacks work too, of course.
 */
const simpleCallBack = function () {
    console.log('I\'m a simple callback');
};

/**
 * Attach event handlers here to be notified
 * for pretty much any event.
 * Arrays are accepted.
 */
const eventHandlers = {
    // All of these receive the event as first parameter:
    drop: callbackArray,
    dragstart: null,
    dragend: null,
    dragenter: null,
    dragover: null,
    dragleave: null,
    // All of these receive the file as first parameter:
    addedfile: simpleCallBack,
    removedfile: null,
    thumbnail: null,
    error: null,
    processing: null,
    uploadprogress: null,
    sending: null,
    success: null,
    complete: null,
    canceled: null,
    maxfilesreached: null,
    maxfilesexceeded: null,
    // All of these receive a list of files as first parameter
    // and are only called if the uploadMultiple option
    // in djsConfig is true:
    processingmultiple: null,
    sendingmultiple: null,
    successmultiple: null,
    completemultiple: null,
    canceledmultiple: null,
    // Special Events
    totaluploadprogress: null,
    reset: null,
    queuecompleted: null,
}

const DropZone = React.createClass({
	render: function() {
		return (
            <DropzoneComponent config={componentConfig}
                       eventHandlers={eventHandlers}
                       djsConfig={djsConfig} />
                )
	},
});

module.exports = DropZone;
