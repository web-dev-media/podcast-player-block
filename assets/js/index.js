/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { gallery as icon } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import localBlockMetadata from './block/blockMeta.json';
import save from './save';
import transforms from './transforms';

const blockNamespace = 'wppgb';
const blockName = blockNamespace + '/player';
const { globalBlockMetas } = wp;

if(globalBlockMetas['blockNamespace'] && localBlockMetadata){
	localBlockMetadata.name = blockName;
}

console.log({localBlockMetadata, globalBlockMetas});



/*

registerBlockType( wppgb.blockName, {
	title: wppgb.title,
	category: wppgb.category,
	icon: wppgb.icon,
	description: __( 'Display multiple images in a rich gallery.' ),
	example: {
		attributes: {
			content: __(
			  'In a village of La Mancha, the name of which I have no desire to call to mind, there lived not long since one of those gentlemen that keep a lance in the lance-rack, an old buckler, a lean hack, and a greyhound for coursing.'
			),
			customFontSize: 28,
			dropCap: true,
		},
	},
	edit: ( { className } ) => {
		return (
			<div className={ className }>
				<InnerBlocks />
			</div>
		);
	},
	save: ( { className } ) => {
		return (
			<div className={ className } >
				<InnerBlocks.Content />
			</div>
		);
	},
} );
*/
