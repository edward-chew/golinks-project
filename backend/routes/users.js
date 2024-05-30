const axios = require("axios");
const express = require("express");

const router = express.Router();

router.route("/:username").get(async (req, res) => {
  try {
    let fork_count = 0;
    let languages = {};
    const response = await axios.get(
      `https://api.github.com/users/${req.params.username}/repos`
    );
    console.log(i);
    console.log(response.headers.link);

    for (repo of response.data) {
      fork_count += repo.forks;
      if (repo.language) {
        if (!(repo.language in languages)) {
          languages[repo.language] = 0;
        }
        languages[repo.language] += 1;
      }
    }

    res.json({
      public_repos: response.data.length,
      fork_count: fork_count,
      languages: languages,
    });
  } catch (err) {
    res.json(err);
  }
});

// router.route("/:username").get(async (req, res) => {
//   try {
//     let fork_count = 0;
//     let languages = {};
//     let i = 1;
//     while (true) {
//       const response = await axios.get(
//         `https://api.github.com/users/${req.params.username}/repos`,
//         {
//           params: {
//             page: i,
//           },
//         }
//       );
//       console.log(i);
//       console.log(response.headers.link);

//       for (repo of response.data) {
//         fork_count += repo.forks;
//         if (repo.language) {
//           if (!(repo.language in languages)) {
//             languages[repo.language] = 0;
//           }
//           languages[repo.language] += 1;
//         }
//       }
//       break;
//       // if (!("link" in response.headers)) break;
//       // i++;
//     }

//     console.log(fork_count);

//     res.json({
//       public_repos: response.data.length,
//       fork_count: fork_count,
//       languages: languages,
//     });
//   } catch (err) {
//     res.json(err);
//   }
// });

module.exports = router;
