(function(global) {

  'use strict';

  var fabric = global.fabric || (global.fabric = { }),
      extend = fabric.util.object.extend;

  if (fabric.Polygon) {
    fabric.warn('fabric.Polygon is already defined');
    return;
  }

  /**
   * Polygon class
   * @class fabric.Polygon
   * @extends fabric.Polyline
   * @see {@link fabric.Polygon#initialize} for constructor definition
   */
  fabric.Polygon = fabric.util.createClass(fabric.Polyline, /** @lends fabric.Polygon.prototype */ {

    /**
     * Type of an object
     * @type String
     * @default
     */
    type: 'polygon',

    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _render: function(ctx) {
      if (!this.commonRender(ctx)) {
        return;
      }
      ctx.closePath();
      this._renderPaintInOrder(ctx);
    },

    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _renderDashedStroke: function(ctx) {
      this.callSuper('_renderDashedStroke', ctx);
      ctx.closePath();
    },
  });

  /* _FROM_SVG_START_ */
  /**
   * List of attribute names to account for when parsing SVG element (used by `fabric.Polygon.fromElement`)
   * @static
   * @memberOf fabric.Polygon
   * @see: http://www.w3.org/TR/SVG/shapes.html#PolygonElement
   */
  fabric.Polygon.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat();

  /**
   * Returns {@link fabric.Polygon} instance from an SVG element
   * @static
   * @memberOf fabric.Polygon
   * @param {SVGElement} element Element to parse
   * @param {Function} callback callback function invoked after parsing
   * @param {Object} [options] Options object
   */
  fabric.Polygon.fromElement = function(element, callback, options) {
    if (!element) {
      return callback(null);
    }

    options || (options = { });

    var points = fabric.parsePointsAttribute(element.getAttribute('points')),
        parsedAttributes = fabric.parseAttributes(element, fabric.Polygon.ATTRIBUTE_NAMES),
        strokeWidth = parsedAttributes.strokeWidth;
    parsedAttributes.strokeWidth = 0;
    var polygon = new fabric.Polygon(points, extend(parsedAttributes, options));
    polygon.strokeWidth = strokeWidth;
    callback(polygon);
  };
  /* _FROM_SVG_END_ */

  /**
   * Returns fabric.Polygon instance from an object representation
   * @static
   * @memberOf fabric.Polygon
   * @param {Object} object Object to create an instance from
   * @param {Function} [callback] Callback to invoke when an fabric.Path instance is created
   */
  fabric.Polygon.fromObject = function(object, callback) {
    return fabric.Object._fromObject('Polygon', object, callback, 'points');
  };

})(typeof exports !== 'undefined' ? exports : this);
