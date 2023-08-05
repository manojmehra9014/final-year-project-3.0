const express = require("express");
const serverless = require('serverless-http');
const app = express();
const session = require('express-session');
const path = require("path");
const mongoose = require("mongoose");
require("./conn");
const static_path = path.join(__dirname, "../");
const static_path2 = path.join(__dirname, "../");
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const auth = require("../api/auth");



// //server connection code here 
// const uri = "mongodb+srv://manojmehra9014:fWrMYG2ooazTDFZ7@cluster0.hp03zdh.mongodb.net/?retryWrites=true&w=majority";
// // const mongoose = require('mongoose');

// mongoose.connect(uri, {
//   dbName: "backend",
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//     // Additional code for your Express.js app
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });



app.use(session({
  secret: 'shhhh',
  resave: false,
  saveUninitialized: true,
}));

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  token: String,
});
const Message = mongoose.model("Message", messageSchema);


const CodespaceSchema = new mongoose.Schema({
  user_id: String,
  filename: String,
  html_code: String,
  css_code: String,
  js_code: String,
});

// Create the Codespace model
const Codespace = mongoose.model('Codespace', CodespaceSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path2));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  const filePath = path.join(static_path, './index.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});
app.get("/color-paletters", (req, res) => {
  const filePath = path.join(static_path, './components/color-paletters/index.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});
app.get("/css-gradient", (req, res) => {
  const filePath = path.join(static_path, './components/css-gradient/index.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});
app.get("/ui-fonts", (req, res) => {
  const filePath = path.join(static_path, './components/ui-fonts/index.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});



app.get("/ui-icons", (req, res) => {
  const filePath = path.join(static_path, './components/ui-icons/index.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get("/about", (req, res) => {
  const filePath = path.join(static_path, './components/nav_links/about.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});


app.get("/tools", (req, res) => {
  const filePath = path.join(static_path, './components/nav_links/tools.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get("/contact", (req, res) => {
  const filePath = path.join(static_path, './components/nav_links/contact.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get("/labfiledata", async (req, res) => {
  const filename = req.cookies.getfilecodes;
  const user_id = req.cookies.user_id;

  // Find the document with the matching filename and user_id
  const doc = await Codespace.findOne({ filename, user_id });
  // Access the HTML, CSS, JS fields from the fetched document
  const htmlCode = doc.html_code;
  const cssCode = doc.css_code;
  const jsCode = doc.js_code;

  res.cookie('html', htmlCode);
  res.cookie('css', cssCode);
  res.cookie('js', jsCode);
  res.redirect('/lab');

});

app.get('/lab', async (req, res) => {
  const filePath = path.join(static_path, './components/code_editor/lab.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});


app.get("/html_course", (req, res) => {
  const filePath = path.join(static_path, './components/courses/html/html_course.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get("/css_course", (req, res) => {
  const filePath = path.join(static_path, './components/courses/css/css_course.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get("/js_course", (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/js_course.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get("/react_course", (req, res) => {
  const filePath = path.join(static_path, './components/courses/react/react_course.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});


app.get("/login", auth, async (req, res) => {
  const filePath = path.join(static_path, './components/login_register/login_reg.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});



app.get("/gettingstart", async (req, res) => {
  const user_id = req.cookies.user_id; // Assuming the user_id is stored in the cookie

  // Find all documents with the matching user_id
  const files = await Codespace.find({ user_id });
  // Get an array of filenames
  const filenames = files.map(file => file.filename);
  // Render the files.ejs template and pass the filenamesHTML data
  res.render(path.join(static_path, './components/getting_start/index.ejs'), { filenames });

});


app.post("/add", async (req, res) => {
  const { username, useremail, password } = req.body;
  if (!(username && useremail && password)) {
    res.status(400).send("All fields are require !");
  }
  const existinguser = await Message.findOne({ useremail });
  if (existinguser) {
    res.status(400).json({ message: 'User already exist' });
  }
  const myencpassword = await bcrypt.hash(password, 10);

  const user = await Message.create({
    name: req.body.username,
    email: req.body.useremail,
    password: myencpassword,
  })
  const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, 'shhhh');
  user.token = token;
  await user.save();
  res.redirect('/login');
})


app.post('/check', async (req, res) => {
  const { useremail, password } = req.body;
  try {
    if (useremail === null || password === null) {
      res.status(400).json({ message: "Unwanted access | enter deatls please !" })
    }
    const existinguser = await Message.findOne({ email: useremail });
    if (!existinguser) {
      return res.status(404).json({ message: "User not found !" });

    }
    const matchpass = await bcrypt.compare(password, existinguser.password);
    if (!matchpass) {
      return res.status(400).json({ message: "Invailded user !" });
    }

    const token = jwt.sign({ name: existinguser.username, email: existinguser.useremail, id: existinguser._id }, 'shhhh');
    res.cookie("jwt", token, {
      express: new Date(Date.now() + 1 * 24 * 60 * 60 * 60 * 1000)
    });
    res.cookie("user_id", existinguser._id, {
      express: new Date(Date.now() + 1 * 24 * 60 * 60 * 60 * 1000)
    });

    res.cookie("username", existinguser.name, {
      express: new Date(Date.now() + 1 * 24 * 60 * 60 * 60 * 1000)
    });
    res.cookie("email", existinguser.email, {
      express: new Date(Date.now() + 1 * 24 * 60 * 60 * 60 * 1000)
    });
    res.cookie('password', existinguser.password, {
      express: new Date(Date.now() + 1 * 24 * 60 * 60 * 60 * 1000)
    });

    res.redirect("/gettingstart");

  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong !" });
  }
})


app.post('/savecodes', async (req, res) => {
  try {
    const user_id = req.cookies.user_id; // Assuming the user_id is stored in the cookie
    const filename = req.cookies.filename; // Assuming the filename is stored in the cookie

    // Check if the document with the given user_id and filename already exists
    const existingCodespace = await Codespace.findOne({ user_id, filename });

    if (existingCodespace) {
      // Update the existing document
      existingCodespace.html_code = req.cookies.html;
      existingCodespace.css_code = req.cookies.css;
      existingCodespace.js_code = req.cookies.js;
      await existingCodespace.save();
    } else {
      // Create a new document
      const codespace = new Codespace({
        user_id,
        filename,
        html_code: req.cookies.html,
        css_code: req.cookies.css,
        js_code: req.cookies.js,
      });
      await codespace.save();
    }
    console.log("code file is saved in geeksforce database. :)")
    res.redirect('/gettingstart');
  }
  catch (error) {
    console.log(error);
    // res.status(500).json({ message: error });
    res.status(500).json({ message: "Something went wrong bro!" });
  }
});


//=============================================================================
//=============================================================================
//html-course-rendeing 



app.get('/blog.html-introduction', (req, res) => {
  const filePath = path.join(static_path, './components/courses/html/topic1.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.html-basic', (req, res) => {
  const filePath = path.join(static_path, './components/courses/html/topic2.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.html-element', (req, res) => {
  const filePath = path.join(static_path, './components/courses/html/topic3.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.html-attributes', (req, res) => {
  const filePath = path.join(static_path, './components/courses/html/topic4.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.html-headings', (req, res) => {
  const filePath = path.join(static_path, './components/courses/html/topic5.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.html-paragraphs', (req, res) => {
  const filePath = path.join(static_path, './components/courses/html/topic6.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.html-formating', (req, res) => {
  const filePath = path.join(static_path, './components/courses/html/topic8.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.html-styles', (req, res) => {
  const filePath = path.join(static_path, './components/courses/html/topic7.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.html-comment', (req, res) => {
  const filePath = path.join(static_path, './components/courses/html/topic9.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.html-color', (req, res) => {
  const filePath = path.join(static_path, './components/courses/html/topic10.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.html-links', (req, res) => {
  const filePath = path.join(static_path, './components/courses/html/topic11.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.html-images', (req, res) => {
  const filePath = path.join(static_path, './components/courses/html/topic12.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.html-favicon', (req, res) => {
  const filePath = path.join(static_path, './components/courses/html/topic13.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.html-blocks-inline', (req, res) => {
  const filePath = path.join(static_path, './components/courses/html/topic14.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.html-classes', (req, res) => {
  const filePath = path.join(static_path, './components/courses/html/topic15.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.html-id', (req, res) => {
  const filePath = path.join(static_path, './components/courses/html/topic16.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

//================================================================
//================================================================//
//css-links-responder

app.get('/blog.introduction-to-css', (req, res) => {
  const filePath = path.join(static_path, './components/courses/css/topic1.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.selectors-and-specticificity', (req, res) => {
  const filePath = path.join(static_path, './components/courses/css/topic2.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.box-model', (req, res) => {
  const filePath = path.join(static_path, './components/courses/css/topic3.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.display-and-positioning', (req, res) => {
  const filePath = path.join(static_path, './components/courses/css/topic4.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.css-typrography', (req, res) => {
  const filePath = path.join(static_path, './components/courses/css/topic5.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.colors-and-backgrounds', (req, res) => {
  const filePath = path.join(static_path, './components/courses/css/topic6.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.css-layout-techniques', (req, res) => {
  const filePath = path.join(static_path, './components/courses/css/topic7.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.media-queries', (req, res) => {
  const filePath = path.join(static_path, './components/courses/css/topic8.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.css-frameworks', (req, res) => {
  const filePath = path.join(static_path, './components/courses/css/topic9.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.css-preprocessors', (req, res) => {
  const filePath = path.join(static_path, './components/courses/css/topic10.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.css-animations', (req, res) => {
  const filePath = path.join(static_path, './components/courses/css/topic11.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});


app.get('/blog.css=naming-convention', (req, res) => {
  const filePath = path.join(static_path, './components/courses/css/topic12.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.debugging-troubleshooting', (req, res) => {
  const filePath = path.join(static_path, './components/courses/css/topic13.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.browser-compatibility', (req, res) => {
  const filePath = path.join(static_path, './components/courses/css/topic14.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.performance-optimization', (req, res) => {
  const filePath = path.join(static_path, './components/courses/css/topic15.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.css-flexbox', (req, res) => {
  const filePath = path.join(static_path, './components/courses/css/topic16.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.css-grid', (req, res) => {
  const filePath = path.join(static_path, './components/courses/css/topic17.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.css-advance', (req, res) => {
  const filePath = path.join(static_path, './components/courses/css/topic18.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});



//=================================================================
//=================================================================
//js-course-playlist 



app.get('/blog.introduction-to-javascript', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic1.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.javascript-basics-and-syntax', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic2.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.working-with-variables-and-data-types', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic3.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.operators-and-expressions-in-javascript', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic4.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});
app.get('/blog.control-flow-and-conditional-statements', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic5.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.looping-and-iteration', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic6.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.functions-in-javascript', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic7.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.scope-and-closures', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic8.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.arrays-and-array-manipulation', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic9.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.objects-and-object-oriented-programming-in-javascript', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic10.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.manipulating-the-document-object-model', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic11.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.event-handling-and-interaction', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic12.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.asynchronous-javascript-and-callbacks', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic13.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.promises-and-async-await', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic14.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.error-handling-and-debugging', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic15.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.modules-and-modular-javascript', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic16.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.es6+-features-and-updates', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic17.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.regular-expressions-in-javascript', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic18.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.working-with-json-data', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic19.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err); 0
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.making-http-requests-with-fetch-api', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic20.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.client-side-storage', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic21.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.introduction-to-javascript-testing', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic22.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.security-best-practices-in-javascript', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic23.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.introduction-to-javascript-frameworks', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic24.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.building-single-page-applications-with-javascript', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic25.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.working-with-apis-and-restful-services', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic26.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.introduction-to-node.js-and-server-side-javascript', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic27.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.working-with-databases-in-javascript', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic28.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.performance-optimization-techniques', (req, res) => {
  const filePath = path.join(static_path, './components/courses/js/topic29.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});


//=================================================================
//=================================================================
//mongodb links 


app.get('/blog.introduction-to-mongodb', (req, res) => {
  const filePath = path.join(static_path, './components/courses/mongodb/topic1.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});
app.get('/blog.installing-and-configuring-mongodb', (req, res) => {
  const filePath = path.join(static_path, './components/courses/mongodb/topic2.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.crud-operations-in-mongodb', (req, res) => {
  const filePath = path.join(static_path, './components/courses/mongodb/topic3.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.querying-data-with-mongodb', (req, res) => {
  const filePath = path.join(static_path, './components/courses/mongodb/topic4.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.aggregation-framework-in-mongodb', (req, res) => {
  const filePath = path.join(static_path, './components/courses/mongodb/topic5.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.indexing-and-performance-optimization-in-mongodb', (req, res) => {
  const filePath = path.join(static_path, './components/courses/mongodb/topic6.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.working-with-data-models-and-schema-design', (req, res) => {
  const filePath = path.join(static_path, './components/courses/mongodb/topic7.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.data-validation-and-error-handling-in-mongodb', (req, res) => {
  const filePath = path.join(static_path, './components/courses/mongodb/topic8.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.transactions-and-atomicity-in-mongodb', (req, res) => {
  const filePath = path.join(static_path, './components/courses/mongodb/topic9.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.working-with-geospatial-data-in-mongodb', (req, res) => {
  const filePath = path.join(static_path, './components/courses/mongodb/topic10.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.replica-sets-and-high-availability-in-mongodb', (req, res) => {
  const filePath = path.join(static_path, './components/courses/mongodb/topic11.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.sharding-and-scalability-in-mongodb', (req, res) => {
  const filePath = path.join(static_path, './components/courses/mongodb/topic12.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.backup-and-restore-strategies-in-mongodb', (req, res) => {
  const filePath = path.join(static_path, './components/courses/mongodb/topic13.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.security-and-authentication-in-mongodb', (req, res) => {
  const filePath = path.join(static_path, './components/courses/mongodb/topic14.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.monitoring-and-performance-tuning-in-mongodb', (req, res) => {
  const filePath = path.join(static_path, './components/courses/mongodb/topic15.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.deployment-and-operations-of-mongodb', (req, res) => {
  const filePath = path.join(static_path, './components/courses/mongodb/topic16.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.integrating-mongodb-with-applications', (req, res) => {
  const filePath = path.join(static_path, './components/courses/mongodb/topic7.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.best-practices-for-mongodb-development', (req, res) => {
  const filePath = path.join(static_path, './components/courses/mongodb/topic18.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.real-world-use-cases-and-examples', (req, res) => {
  const filePath = path.join(static_path, './components/courses/mongodb/topic19.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});

app.get('/blog.introduction-to-mongodb-atlas-managed-mongodb-service', (req, res) => {
  const filePath = path.join(static_path, './components/courses/mongodb/topic20.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});



//=======================================================
//=======================================================
//nodejs pages 


app.get('/blog.', (req, res) => {
  const filePath = path.join(static_path, './components/courses/mongodb/topic3.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error while loading HTML file');
    }
  });
});






app.listen(port, () => {
  console.log("Server is Connected");
  console.log(`server is working on port number : ${port}`);

});

