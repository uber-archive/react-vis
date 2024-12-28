# Want to contribute?

Great! That's why this is an open source project. We use this project in our infrastructure at Uber, and we hope that it's useful to others as well.

Before you get started, here are some suggestions:

 - Check open issues for what you want.
 - If there is an open issue, comment on it. Otherwise open an issue describing your bug or feature with use cases.
 - Before undertaking a major change, please discuss this on the issue. We'd hate to see you spend a lot of time working on something that conflicts with other goals or requirements that might not be obvious.
 - Write code to fix the problem, then open a pull request with tests and documentation.
 - The pull requests gets reviewed and then merged assuming there are no problems.
 - A new release version gets cut.
 
## Hints

Want to make sure your PR gets a speedy review and a quick merge? Here are some tips:

- Add Tests
- Add documentation about the feature you added
- Make sure you have a clear description of what your PR is about
- Include screenshots

## Releases

Declaring formal releases requires peer review.

 - A reviewer of a pull request should recommend a new version number (patch, minor or major).
 - Once your change is merged feel free to bump the version as recommended by the reviewer.
 - A new version number should not be cut without peer review unless done by the project maintainer.

### Cutting a new version

 - Get your branch merged on master
 - Run `npm version major` or `npm version minor` or `npm version patch`
 - `git push origin master --tags`
 - If you are a project owner, then `npm publish`
