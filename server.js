const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
const session = require('express-session');
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key', // Change this to a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  }));
const port = 5000;
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sport',
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// ... (Previous code)


// ... (autres imports)

app.post('/register', (req, res) => {
  const { nom, prenom, email, password, confirmPassword, tel } = req.body;

  // Check if any field is missing or empty
  if (!nom || nom.trim() === '' || !prenom || prenom.trim() === '' ||
      !email || email.trim() === '' || !password || password.trim() === '' ||
      !confirmPassword || confirmPassword.trim() === '' || !tel || tel.trim() === '') {
      res.status(400).send('All fields are required.');
      return;
  }

  // Check if password and confirm password match
  if (password !== confirmPassword) {
      res.status(400).send('Password and Confirm Password do not match.');
      return;
  }

  const sql = 'INSERT INTO sport (nom, prenom, email, password, tel) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [nom, prenom, email, password, tel], (err, result) => {
      if (err) {
          console.error('Registration error:', err);
          res.status(500).send(`Registration failed. Error: ${err.message}`);
          return;
      }
      res.send('regist successful.');
      // Redirect to another page (replace '/dashboard' with your desired route)
    
  });
});


  // Route to get user ID
  app.get('/getUserId', (req, res) => {
    const userId = req.session.userId;
  
    if (userId !== undefined) {
      res.json(userId);
    } else {
      res.status(401).send('User not authenticated.');
    }
  });
  
// Route pour récupérer tous les utilisateurs
app.get('/users', (req, res) => {
    // Sélectionnez tous les utilisateurs depuis la base de données
    const sql = 'SELECT * FROM sport';
  
    // Exécutez la requête SQL
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      // Envoyez la liste des utilisateurs en tant que réponse JSON
      res.json(results);
    });
  });



// Add this endpoint to your existing server code


app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Your authentication logic here...
    // Assuming successful authentication, set userId in the session
    const user = authenticateUser(email, password); // Implement this function
    if (user) {
      req.session.userId = user.id;
      res.send('Login successful.');
    } else {
      res.status(401).send('Invalid credentials.');
    }
  });
  
  // Route to get user ID
  app.get('/getUserId', (req, res) => {
    const userId = req.session.userId;
  
    if (userId !== undefined) {
      res.json(userId);
    } else {
      res.status(401).send('User not authenticated.');
    }
  });
  

  app.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      // Utilisez une requête SQL DELETE pour supprimer l'utilisateur de la base
      await db.query('DELETE FROM sport WHERE id = ?', [userId]);
      
      // Envoyez une réponse indiquant que la suppression a réussi (pas de contenu)
      res.status(204).send();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      res.status(500).send('Erreur lors de la suppression de l\'utilisateur');
    }
  });

  app.put('/users/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      // Utilisez une requête SQL UPDATE pour mettre à jour les informations de l'utilisateur
      await db.query(
        'UPDATE sport SET nom=?, prenom=?, email=?,  tel=? WHERE id=?',
        [req.body.nom, req.body.prenom, req.body.email,  req.body.tel, userId]
      );
  
      // Envoyez une réponse indiquant que la mise à jour a réussi (pas de contenu)
      res.status(204).send();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      res.status(500).send('Erreur lors de la mise à jour de l\'utilisateur');
    }
  });
  
  // Route pour récupérer un utilisateur par ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;

  // Utilisez l'ID pour récupérer les détails de l'utilisateur depuis la base de données
  const sql = 'SELECT * FROM sport WHERE id = ?';

  // Exécutez la requête SQL avec l'ID en tant que paramètre
  db.query(sql, [userId], (err, results) => {
      if (err) {
          console.error('Erreur lors de la récupération de l\'utilisateur par ID:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
      }

      if (results.length > 0) {
          // Envoyez les détails de l'utilisateur en tant que réponse JSON
          res.json(results[0]);
      } else {
          // Si l'utilisateur n'est pas trouvé, renvoyez une réponse 404 (Non trouvé)
          res.status(404).json({ error: 'User not found' });
      }
  });
});

  
// server.js
// server.js
app.post('/users', (req, res) => {
    const newUser = req.body;
  
    // Assurez-vous que les champs nécessaires sont présents dans la requête
    if (!newUser.nom || !newUser.prenom || !newUser.email || !newUser.tel || !newUser.password) {
      return res.status(400).json({ message: 'Veuillez fournir tous les champs nécessaires.' });
    }
  
    // Exécutez la requête d'insertion dans votre base de données (adaptée à votre base de données)
    db.query(
      'INSERT INTO sport (nom, prenom, email, password, tel) VALUES (?, ?, ?, ?, ?)',
      [newUser.nom, newUser.prenom, newUser.email, newUser.tel, newUser.password],
      (err, result) => {
        if (err) {
          console.error('Erreur lors de l\'ajout de l\'utilisateur dans la base de données:', err);
          res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur dans la base de données.');
        } else {
          // Envoyez la réponse avec l'utilisateur ajouté (ou l'ID généré, selon votre configuration)
          const insertedUser = {
            id: result.insertId, // Assurez-vous que ceci correspond à la colonne ID de votre table
            nom: newUser.nom,
            prenom: newUser.prenom,
            email: newUser.email,
            tel: newUser.tel,
            password: newUser.password,
          };
          res.status(201).json(insertedUser);
        }
      }
    );
  });
  

  
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

});