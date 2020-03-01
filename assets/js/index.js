/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './audio-player/edit';
import save from './audio-player/save';
import meta from './audio-player/meta';
import attributes from './audio-player/attributes';
import deprecated from './audio-player/deprecated';
import migration from './audio-player/migration';

const { audio_block_meta } = wp;

Object.assign(audio_block_meta, meta);

audio_block_meta.edit = edit;
audio_block_meta.save = save;
audio_block_meta.attributes = attributes;
audio_block_meta.deprecated = deprecated;
audio_block_meta.migration = migration;

registerBlockType( audio_block_meta.namespace, audio_block_meta);
