/**
 * Uses IntersectionObserver to determine when a element is in view.
 *
 * @param {NodeList|Node} elements - can be one node or a NodeList to observer
 * @param {Function} cb - Callback function fired if an element visible
 * @param {Object} options - {loop, ratio = intersectionRatio}
 * @param {boolean} options.loop - Should the observer be detached after first visibility hit or run again. Default: false
 * @param {number} options.entryRatio - Determines how much of the element needs to be visible to be treated as visible.
 */

window.observeElements = function(elements, cb, options) {
  options = options || {};
  const _options = {
    loop: options.loop || false,
    ratio: options.ratio || 0,
  };

  if ( elements ) {
    const io = new IntersectionObserver( function( entries ) {
      for ( const i in entries ) {
        if ( entries ) {
          const entry = entries[i];
          const elem = entries[i].target;
          if ( typeof entry.isVisible === 'undefined' ) {
            entry.isVisible = true;
          }

          if ( ( entry.isIntersecting && entry.isVisible) || entry.intersectionRatio > _options.ratio ) {
            cb( elem, entry );

            if ( _options.loop === false ) {
              io.unobserve( elem );
            }
          }
        }
      }
    }, {
      ratio: _options.ratio,
    } );

    const loopNodeElements = ( NodeElements ) => {
      if ( NodeList.prototype.isPrototypeOf( elements ) ) {
        elements.forEach( function( elem ) {
          io.observe( elem );
        } );
      } else {
        io.observe( elements );
      }
    };

    if ( NodeList.prototype.isPrototypeOf( elements ) ) {
      loopNodeElements(elements);
    } else if (Array.prototype.isPrototypeOf( elements ) ) {
      elements.forEach( function( elem ) {
        io.observe( elem );
      } );
    } else {
      io.observe( elements );
    }
  } else {
    console.warn( 'Call of observeElements without any Node or NodeList will be ignored.' );
  }
};
