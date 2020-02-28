<?php
namespace wppgb;
/**
 * Plugin Name: Wordpress Podcast Player Gutenberg Block
 * Plugin URI: https://github.com/web-dev-media/wordpress-podcast-player-gutenberg-block
 * Description: This is a plugin provides a Podcast PLayer as Gutenber block
 * Version: 1.1.0-800baef8286f
 * Author: web dev media UG (haftungsbeschränkt) <info@web-dev-media.de>
 *
 * @package wordpress-podcast-player-gutenberg-block
 */

defined( 'ABSPATH' ) || exit;
define( 'BLOCK_HANDLE', __NAMESPACE__ );
define( 'BLOCK_NAME_SPACE', BLOCK_HANDLE . '/player' );


/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 */
function register_block() {

	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}

	register_block_type(
		BLOCK_NAME_SPACE,
		[
			'editor_script' => BLOCK_HANDLE . '-editor',
		]
	);

}
add_action( 'init', __NAMESPACE__ . '\register_block' );


function enqueue_assets() {
	$assetsPath = '/assets/dist/';

	foreach (glob(untrailingslashit(plugin_dir_path(__FILE__) ) . $assetsPath . '*/*.bundle.*.js') as $i => $assetFile) {

		$assetPathInfo   = pathinfo($assetFile);
		$assetFile       = basename($assetFile);
		$version         = basename($assetPathInfo['dirname']);
		$assetFileHandle = explode('.', $assetFile)[0];

		if ($i === 0) {
			$assetsHandles = 'js-webpack-' . $assetFileHandle;
		}

		$file = $assetsPath . $version . '/' . $assetFile;
		wp_enqueue_script(BLOCK_HANDLE . '-editor', untrailingslashit(plugin_dir_url(__FILE__)) . $file, [
			'wp-block-editor',
			'wp-blocks',
			'wp-element',
			'wp-i18n',
			'wp-polyfill'
		], NULL, FALSE);


		wp_add_inline_script(
			BLOCK_HANDLE . '-editor',
			'wp.globalBlockMetas.' . BLOCK_HANDLE . ' = '  . json_encode([
			        'blockName' => BLOCK_NAME_SPACE,
			        'rest_base' => 'REST_BASE',
			        'title' => BLOCK_NAME_SPACE,
			        'namespace' => BLOCK_HANDLE . '_js',
			        'pathInfo' => plugin_dir_url(__FILE__)
			    ]),
			'before'
		);
	}
}

add_action('wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_assets');
add_action('enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_assets');
