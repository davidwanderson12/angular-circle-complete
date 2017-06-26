(function (angular) {
    'use strict';
    angular.module('circle-completion', [])
        .directive('circleComplete',
            [
                '$document', function(document) {
                    return {
                        restrict: 'EA',
                        scope: {
                            percentage: '=',
                            color: '=',
                            lineWidth: '=',
                            text: '='
                        },
                        link: function($scope, element, attrs) {

                            var canvas, ctx, radius, span;

                            var options = {
                                percent: $scope.percentage || 100,
                                color: $scope.color || 'rgba(155, 155, 155, 1)',
                                size: element.width(),
                                lineWidth: $scope.lineWidth || 23,
                                text: $scope.text || 'COMPLETE'
                            }

                            $scope.$watch('percentage',
                                function(newvalue, oldvalue) {
                                    if (newvalue !== oldvalue) {
                                        options.percent = newvalue;
                                        updatePercentageNumber();
                                        updateCompletionCircle();
                                    }
                                });

                            function createElement() {
                                element.css('position', 'relative')
                                    .css('width', options.size + 'px')
                                    .css('height', options.size + 'px')
                                    .css('margin-top', '3px')
                                    .css('margin-left', '3px')
                                    .css('display', 'inline-block');

                                canvas = angular.element('<canvas/>')
                                    .css('display', 'block')
                                    .css('position', 'absolute')
                                    .css('top', '0')
                                    .css('left', '0');
                                canvas[0].width = (options.size);
                                canvas[0].height = (options.size);

                                var textHolder = angular.element('<div/>')
                                    .css('position', 'absolute')
                                    .css('padding-top', options.size * .32 + 'px')
                                    .css('font-family', 'Roboto')
                                    .css('font-weight', '100');

                                span = angular.element('<span/>')
                                    .html(options.percent + '%')
                                    .css('color', '#f0f0f0')
                                    .css('display', 'block')
                                    .css('line-height', options.size * .25 + 'px')
                                    .css('text-align', 'center')
                                    .css('width', options.size + 'px')
                                    .css('font-size', options.size * .25 + 'px')
                                    .css('font-weight', '100')
                                    .css('margin-left', '5px');

                                var subtext = angular.element('<span/>')
                                    .html(options.text)
                                    .css('color', '#9b9b9b')
                                    .css('display', 'block')
                                    .css('line-height', options.size * .1 + 'px')
                                    .css('text-align', 'center')
                                    .css('width', options.size + 'px')
                                    .css('font-size', options.size * .1 + 'px');


                                if (typeof (G_vmlCanvasManager) !== 'undefined') {
                                    G_vmlCanvasManager.initElement(canvas);
                                }

                                textHolder.append(span);
                                textHolder.append(subtext);
                                element.append(canvas);
                                element.append(textHolder);

                                ctx = canvas[0].getContext('2d');

                                ctx.translate(options.size / 2, options.size / 2); // change center
                                ctx.rotate((-1 / 2) * Math.PI); // rotate -90 deg
                                radius = (options.size - options.lineWidth) / 2;
                            }

                            function updatePercentageNumber() {
                                span.html(options.percent + '%')
                            }

                            function updateCompletionCircle() {

                                // clear the canvas for redrawing
                                ctx.save();
                                ctx.setTransform(1, 0, 0, 1, 0, 0);
                                ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
                                ctx.restore();

                                drawCircle(options.color, options.lineWidth, 100 / 100, .3);
                                drawCircle(options.color, options.lineWidth, options.percent / 100, 1);
                            }

                            var drawCircle = function(color, lineWidth, percent, opacity) {
                                percent = Math.min(Math.max(0, percent || 1), 1);
                                ctx.beginPath();
                                ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
                                ctx.strokeStyle = color;
                                ctx.fillStyle = '#4a4a4a';
                                ctx.fill();
                                ctx.lineCap = 'butt'; // butt, round or square
                                ctx.lineWidth = lineWidth;
                                ctx.globalAlpha = opacity;
                                ctx.stroke();
                            };

                            createElement();
                            updateCompletionCircle();
                        }
                    }
                }
            ]);
})(window.angular);