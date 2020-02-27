<?php
namespace wppgb;
/**
 * Plugin Name: Wordpress Podcast Player Gutenberg Block
 * Plugin URI: https://github.com/web-dev-media/wordpress-podcast-player-gutenberg-block
 * Description: This is a plugin provides a Podcast PLayer as Gutenber block
 * Version: 1.1.0-53f40ef3065b
 * Author: web dev media UG (haftungsbeschränkt) <info@web-dev-media.de>
 *
 * @package wordpress-podcast-player-gutenberg-block
 */

defined( 'ABSPATH' ) || exit;
define( 'BLOCK_HANDLE', __NAMESPACE__ );
define( 'BLOCK_NAME_SPACE', BLOCK_HANDLE . '/movies' );


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
add_action( 'init', 'register_block' );


function enqueue_assets() {
	$assetsPath = '/assets/dist/';

	foreach (glob(get_stylesheet_directory() . $assetsPath . '*/*.bundle.*.js') as $i => $assetFile) {

		$assetPathInfo   = pathinfo($assetFile);
		$assetFile       = basename($assetFile);
		$version         = basename($assetPathInfo['dirname']);
		$assetFileHandle = explode('.', $assetFile)[0];

		if ($i === 0) {
			$assetsHandles = 'js-webpack-' . $assetFileHandle;
		}

		$file = $assetsPath . $version . '/' . $assetFile;
		wp_enqueue_script(BLOCK_HANDLE . '-editor', get_stylesheet_directory_uri() . $file, ($i > 0 ? $assetsHandles : NULL), NULL, FALSE);


		wp_add_inline_script(
			BLOCK_HANDLE,
			'wp.' . BLOCK_HANDLE . ' = '  . json_encode([
				                                            'blockName' => BLOCK_NAME_SPACE,
				                                            'rest_base' => 'BF_TAXONOMIE_REST_BASE',
				                                            'title' => BLOCK_NAME_SPACE,
				                                            'category' => 'common',
				                                            'icon' => 'tickets',
				                                            'namespace' => BLOCK_HANDLE . '_js',
				                                            'pathInfo' => plugin_dir_url(__FILE__)
			                                            ]),
			'before'
		);
	}
}

add_action('wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_assets');
add_action('enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_assets');
