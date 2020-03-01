/**
 * WordPress dependencies
 */
import { getBlobByURL, isBlobURL } from '@wordpress/blob';
import { compose } from '@wordpress/compose';
import {
	Disabled,
	PanelBody,
	SelectControl,
	ToggleControl,
	withNotices,
} from '@wordpress/components';
import {
	BlockControls,
	BlockIcon,
	InspectorControls,
	MediaPlaceholder,
	MediaReplaceFlow,
	RichText,
} from '@wordpress/block-editor';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';

const ALLOWED_MEDIA_TYPES = [ 'audio' ];

class AudioEdit extends Component {
	constructor() {
		super( ...arguments );
	}

	componentDidMount() {}

	toggleAttribute( attribute ) {
		return ( newValue ) => {
			this.props.setAttributes( { [ attribute ]: newValue } );
		};
	}

	render() {}
}
export default compose( [
	withSelect( ( select ) => {
		const { getSettings } = select( 'core/block-editor' );
	} ),
	withNotices,
] )( AudioEdit );
