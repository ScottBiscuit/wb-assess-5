-- Problem 1
SELECT email
FROM customers
ORDER BY email;

-- Problem 2
SELECT id
FROM orders
WHERE customer_id = 
(
SELECT id
FROM customers
WHERE fname = 'Elizabeth'
AND lname = 'Crocker'
);

-- Problem 3
SELECT SUM(num_cupcakes)
FROM orders
WHERE processed IS false;

-- Problem 4
SELECT 
	name,
	SUM(num_cupcakes)
FROM cupcakes
LEFT JOIN orders
	ON cupcakes.id = orders.cupcake_id
GROUP BY name
ORDER BY name;

-- Problem 5
SELECT 
	email,
	SUM(num_cupcakes)
FROM customers
JOIN orders
	ON customers.id = orders.customer_id
GROUP BY email
ORDER BY SUM(num_cupcakes) DESC;

-- Problem 6
SELECT DISTINCT
	fname,
	lname,
	email
FROM customers
JOIN orders
	ON customers.id = orders.customer_id
WHERE processed = true
	AND cupcake_id = 
	(
	SELECT id
	FROM cupcakes
	WHERE name LIKE 'funfetti'
	);