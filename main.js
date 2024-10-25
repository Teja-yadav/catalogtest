const fs = require("fs");

function decodeBase(value, base) {
  // Decode the given value from the specified base to base 10
  return parseInt(value, base);
}

function lagrangeInterpolation(points) {
  /*
   * Perform Lagrange interpolation on the points to find the polynomial constant term (c).
   * points: Array of tuples [(x0, y0), (x1, y1), ..., (xn, yn)]
   */
  let constantTerm = 0;
  const n = points.length;

  for (let i = 0; i < n; i++) {
    const [xi, yi] = points[i];

    // Calculate the Lagrange basis polynomial L_i(0) for each term
    let Li_0 = 1;
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        const xj = points[j][0];
        Li_0 *= -xj / (xi - xj);
      }
    }

    // Add the contribution to the constant term
    constantTerm += yi * Li_0;
  }

  return constantTerm;
}

function main() {
  // Load JSON data from file
  const data = JSON.parse(fs.readFileSync("input.json", "utf8"));


  // Extract number of roots and minimum roots required
  const n = data.keys.n;
  const k = data.keys.k;

  // Ensure we have enough roots to determine the polynomial
  if (n < k) {
    console.log("Insufficient roots to determine the polynomial.");
    return;
  }

  // Extract and decode points
  const points = [];
  for (const key in data) {
    if (key !== "keys") {
      const x = parseInt(key); // x value
      const base = parseInt(data[key].base);
      const value = data[key].value;
      const y = decodeBase(value, base); // decode y value
      points.push([x, y]);
    }
  }

  // Compute the constant term using Lagrange interpolation
  const constantTerm = lagrangeInterpolation(points);

  // Print the result
  console.log("The constant term (c) of the polynomial is:", constantTerm);
}

// Run the main function
main();