const axios = require("axios");
const express = require("express");

const router = express.Router();

router.route("/:username").get(async (req, res) => {
  try {
    let public_repos = 0;
    let fork_count = 0;
    let languages = {};

    let i = 1;
    while (true) {
      const response = await axios.get(
        `https://api.github.com/users/${req.params.username}/repos`,
        {
          params: {
            page: i,
          },
        }
      );

      public_repos += response.data.length;

      for (repo of response.data) {
        fork_count += repo.forks;
        if (repo.language) {
          if (!(repo.language in languages)) {
            languages[repo.language] = 0;
          }
          languages[repo.language] += 1;
        }
      }

      if (
        !("link" in response.headers) ||
        !response.headers.link.match(/<([^>]+)>;\s*rel="next"/) ||
        i >= 10
      ) {
        break;
      }

      i++;
    }

    res.json({
      public_repos: public_repos,
      fork_count: fork_count,
      languages: languages,
    });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
