module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "standard",
        "promise"
    ],
    // add your custom rules here
    'rules': {
        'comma-dangle': 0,
        'arrow-parens': 0,
        'no-console': 0,
        // allow optionalDependencies
        'import/no-extraneous-dependencies': ['error', {
            'optionalDependencies': ['test/unit/index.js']
        }],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'linebreak-style': ["error", "windows"],
        'max-len': 0,
        'no-underscore-dangle': 0,
        // allow function hoisting
        "no-use-before-define": ["error", { "functions": false }],
        "prefer-destructuring": 0,
    }
};