/*
Permuted multiples
Problem 52

It can be seen that the number, 125874, and its double, 251748, contain exactly the same digits, but in a different order.
Find the smallest positive integer, x, such that 2x, 3x, 4x, 5x, and 6x, contain the same digits.
*/

//Solution

/*

There are 2 parts to the problem
1. Telling if 2 numbers are permutation of each other
2. For a given i check if 2x, 3x, 4x, 5x, 6x are all permutations


For 1:
Brute force way is to generate all permutations of a # and compare, that means O(n!) - bad
Since we already have 2 numbers, we dont need to generate all permutations of it, rather compare the digits in it,
i.e. (# of each unique digit on number 1) should be equal to (# of each unique digit on number 2)
isPermutation function does that.

For 2:
For i starting from 10, keep checking : if 2x is true, then try 3x or increment i, etc...

*/

function isPermutation(n1, n2) {
	var map = {};
	while(n1 > 0) {
		var mod = n1 % 10;
		if (map[mod] === undefined) {
			map[mod] = 0;
		}
		map[mod] += 1;
		n1 = Math.floor(n1/10);
	}

	while(n2 > 0) {
		var mod = n2 % 10;
		if (map[mod] === undefined) {
			return false;
		}
		map[mod] -= 1;
		if (map[mod] < 0) {
			return false;
		}
		n2 = Math.floor(n2/10);
	}

	return true;
}


function findSmallestPermutedMultiples() {
	var num = 10;
	var x = 2;
	var found = true;
	while(true) {
		found = true;
		x = 2;
		while(found && x<=6) {
			found = found && isPermutation(num, num*x);
			x += 1;
		}
		if (found) {
			return num;
		} else {
			num += 1;
		}
	}
}

console.time('time');
console.log(findSmallestPermutedMultiples());
console.timeEnd('time');