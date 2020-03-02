/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './block/edit';
import save from './block/save';
import meta from './block/meta';
import attributes from './block/attributes';
import deprecated from './block/deprecated';
import migration from './block/migration';

const { audio_block_meta } = wp;

Object.assign(audio_block_meta, meta);

audio_block_meta.edit = edit;
audio_block_meta.save = save;
audio_block_meta.attributes = attributes;
audio_block_meta.deprecated = deprecated;
audio_block_meta.migration = migration;

registerBlockType( audio_block_meta.namespace, audio_block_meta);
