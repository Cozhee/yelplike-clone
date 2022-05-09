require("dotenv").config();
const jwt = require("jsonwebtoken")
const express = require("express");
const db = require("./db")
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json())
// Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {

    try {
        const results = await db.query("SELECT * FROM restaurants")
        res.status(200).json({
            stats: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows
            }
        })
    } catch (err) {
        console.log(err)
    }

})

// Get a single restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM restaurants WHERE id=$1", [req.params.id])

        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }


})

// Create a restaurant
app.post("/api/v1/restaurants/", async (req, res) => {
    try {
        const results = await db.query(
            "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *", [req.body.name, req.body.location, req.body.price_range]
        )
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// Update restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("UPDATE restaurants SET name=$1, location=$2, price_range=$3 WHERE id=$4 RETURNING *", [req.body.name, req.body.location, req.body.price_range, req.params.id])

        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }

})

// Delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id])
        const delete_all_reviews = await db.query("DELETE FROM reviews WHERE restaurant_id=$1", [req.params.id])
        res.status(204).json({
            status: "success"
        })
    } catch (err) {
        console.log(err)
    }
})

// User login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const results = await db.query("SELECT email, password FROM accounts WHERE email = $1 AND password = $2", [req.body.email, req.body.password])

        const EMAIL = results.rows[0].email
        const PASSWORD = results.rows[0].password

        if (EMAIL == email && PASSWORD == password) {

            const user = {
                email: req.body.email,
                password: req.body.password
            }

            const token = jwt.sign(user, process.env.ACCESS_JWT_TOKEN)

            res.status(200).json({
                status: 'success',
                data: {
                    token: token,
                    user: user,
                }
            })
        } else {
            res.status(204).json({
                status: 'Incorrect login information'
            })
        }
    } catch (err) {
        console.log(err)
    }
})

// User creation
app.post("/register", async (req, res) => {
    try {
        const results = await db.query("INSERT INTO accounts (email, password, password_check) VALUES ($1, $2, $3) RETURNING *", [req.body.email, req.body.password, req.body.password_check])

        res.status(201).json({
            status: 'success',
            data: {
                account: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// Get reviews

app.get('/review', async (req, res, next) => {
    try {
        const results = await db.query('SELECT accounts.email, reviews.review, reviews.date_created FROM accounts RIGHT JOIN reviews on accounts.user_id=reviews.user_id WHERE restaurant_id=$1 ORDER BY reviews.date_created DESC', [req.query.restaurant_id])
        res.status(200).json({
            status: 'success',
            review: results.rows
        })
    } catch (err) {
        console.log(err)
    }
})


// Post review
app.post('/review', async (req, res) => {
    try {
        const results = await db.query("INSERT INTO reviews (user_id, review, restaurant_id) VALUES ($1, $2, $3) RETURNING *", [req.body.user_id, req.body.review, req.body.restaurant_id])
        res.status(201).json({
            status: 'success',
            review: results.rows[0]
        })
    } catch (err) {
        console.log(err)
    }
})


// Get user
app.post('/user', async (req, res) => {
    try {
        const results = await db.query("SELECT email, user_id FROM accounts WHERE email = $1", [req.body.email])

        res.status(200).json({
            status: 'success',
            user: results.rows[0]
        })

    } catch (err) {
        console.log(err)
    }
})

// Get user review
app.post('/user_review', async (req, res) => {
    try {
        const results = await db.query("SELECT email, user_id FROM accounts WHERE user_id = $1", [req.body.user_id])

        res.status(200).json({
            status: 'success',
            user: results.rows
        })
    } catch (err) {
        console.log(err)
    }
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is up and listenting on port ${port}`)
});
