/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';

if (!Array.prototype.includes) require('es7-array.prototype.includes');

var through2 = require('through2');

module.exports = function(_arr) {
	return through2.obj(function(file, enc, callback) {
		var arr = _arr.filter(el => !file.data.noncategories.includes(el))
		              .filter(el => !file.data.categories.includes(el));

		file.data.categories = file.data.categories.concat(arr);

		this.push(file);
		callback();
	});
};
