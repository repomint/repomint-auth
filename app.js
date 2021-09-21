const cors = require('cors');
const express = require('express');
const { isEmpty } = require('lodash');
const githubOAuth = require('./github_oauth');
const userController = require('./controllers/user');
const repositoryController = require('./controllers/repository');

const app = express();
app.use(cors());

app.get('/auth', async function (req, res) {
  const code = req.query.code;

  if (!isEmpty(code)) {
    try {
      const authRes = await githubOAuth({ code });
      res.json(authRes);
    } catch (err) {
      console.error(`Something went wrong on auth: ${err}`);
      res.json({
        success: false,
        message: 'Something went wrong',
        data: null
      })
    }
  } else {
    res.json({
      success: false,
      message: 'You should pass a code here.',
      data: null
    })
  }
})
app.get('/user', userController.info)
app.get('/repos/user', repositoryController.user)
app.get('/repos/langs', repositoryController.langs)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));