/*
Path sum: two ways
Problem 81
In the 5 by 5 matrix below, the minimal path sum from the top left to the bottom right, by only moving to the right and down, is indicated in bold red and is equal to 2427.
Find the minimal path sum, in matrix.txt (right click and "Save Link/Target As..."), a 31K text file containing a 80 by 80 matrix, from the top left to the bottom right by only moving right and down.
*/

//Solution

/*
For every element, i can either go bottom or right, until i==n-1 && j==n-1. But there are soo many different vatriations of route.
Finding all combinations of route & then finding min among them is very expensive / time consuming.

At every element, i can either go bottom or right, based on the one that is smallest, but the problem is i can get stuck in local min,
i.e.

[
	[1,2,2],
	[1,10,1],
	[10,10,3]
]

For above eg, if i start from (0,0), the min is bottom (1,0) which is obviously expensive route though immediate next value is small.
So, at each element, if we know which is small route (rather than which is small immediate #), then it will be easier.

This means we have to go in reverse, from bottom right.
Only way i could reach 3 i.e. (2,2), is either come from 10 (left) or 1 (top), 
Only way i can reach 10 (2,1) is i either come from 10 (top) or 10 (left), etc...
So for each elem, i can find the min/cheaper route.

*/

var fs = require('fs');
var file = fs.readFileSync('./p081_matrix.txt').toString();
var lines = file.split('\n');
var matrix = [];
lines.forEach(function(line){
	var parts = line.split(',');
	var row = [];
	parts.forEach(function(part){
		row.push(parseInt(part));
	});
	matrix.push(row);
});
if (matrix.length < 2 || matrix.length != matrix[0].length) {
	return console.log('Invalid Input');
}

/*
Test input from question
var matrix = [
	[131,673,234,103,18],
	[201,96,342,965,150],
	[630,803,746,422,111],
	[537,699,497,121,956],
	[805,732,524,37,331]
];*/


function findMinPathSum(matrix) {
	var len = matrix.length;
	for (var i=len-1; i>0; i--) {
		matrix[len-1][i-1] += matrix[len-1][i];
		matrix[i-1][len-1] += matrix[i][len-1];
	}
	
	for (var i=len-1; i>0; i--) {
		for (var j=len-1; j>0; j--) {
			matrix[i-1][j-1] += Math.min(matrix[i][j-1], matrix[i-1][j]);
		}
	}
	return matrix[0][0];
}


console.log(findMinPathSum(matrix));